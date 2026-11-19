import { useEffect, useRef, useState } from "react";

/*
  A small model of a Kafka consumer group.
  One producer writes to a topic with three partitions; three workers drain it.
  Each worker handles WORKER_RATE messages a second, split across the
  partitions it owns. Stopping a worker triggers a rebalance: consumption
  pauses briefly and the partitions are handed to whoever is left.
*/

const PARTITIONS = 3;
const WORKERS = 3;
const BASE_RATE = 9; // messages / second from the producer
const SPIKE_RATE = 34;
const SPIKE_MS = 3500;
const WORKER_RATE = 5;
const REBALANCE_MS = 900;
const MAX_LAG = 999;

type Flight = { p: number; w: number; t0: number; dur: number; out: boolean };

type Sim = {
  alive: boolean[];
  lag: number[];
  acc: number[];
  prodAcc: number;
  flights: Flight[];
  delivered: number;
  spikeUntil: number;
  rebalanceUntil: number;
  owner: number[];
};

function assign(alive: boolean[]): number[] {
  const up = alive.map((a, i) => (a ? i : -1)).filter((i) => i >= 0);
  return Array.from({ length: PARTITIONS }, (_, p) => (up.length ? up[p % up.length] : -1));
}

function freshSim(): Sim {
  const alive = Array(WORKERS).fill(true);
  return {
    alive,
    lag: Array(PARTITIONS).fill(0),
    acc: Array(PARTITIONS).fill(0),
    prodAcc: 0,
    flights: [],
    delivered: 0,
    spikeUntil: 0,
    rebalanceUntil: 0,
    owner: assign(alive),
  };
}

export default function Pipeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sim = useRef<Sim>(freshSim());
  const [alive, setAlive] = useState<boolean[]>(sim.current.alive.slice());
  const [stats, setStats] = useState({ delivered: 0, waiting: 0, rebalancing: false, spiking: false });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let lastStats = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = w < 520 ? 230 : 270;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const geom = () => {
      const narrow = w < 520;
      const top = 44;
      const rowGap = (h - top - 22) / PARTITIONS;
      const rowY = (i: number) => top + rowGap * (i + 0.5);
      const prodX = narrow ? 6 : 12;
      const prodW = narrow ? 44 : 64;
      const laneX = prodX + prodW + (narrow ? 26 : 48);
      const workerW = narrow ? 50 : 76;
      const workerX = w - workerW - 2;
      const laneEnd = workerX - (narrow ? 30 : 56);
      return { narrow, top, rowY, prodX, prodW, laneX, laneEnd, workerX, workerW };
    };

    const step = (now: number) => {
      const s = sim.current;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const fly = reduced.matches ? 0 : 1;

      // produce
      const rate = now < s.spikeUntil ? SPIKE_RATE : BASE_RATE;
      s.prodAcc += dt * rate;
      while (s.prodAcc >= 1) {
        s.prodAcc -= 1;
        const p = Math.floor(Math.random() * PARTITIONS);
        s.flights.push({ p, w: -1, t0: now, dur: 1100 * fly, out: false });
      }

      // consume
      if (now >= s.rebalanceUntil) {
        const owned = Array(WORKERS).fill(0);
        s.owner.forEach((o) => o >= 0 && owned[o]++);
        for (let p = 0; p < PARTITIONS; p++) {
          const o = s.owner[p];
          if (o < 0) continue;
          s.acc[p] += dt * (WORKER_RATE / owned[o]);
          while (s.acc[p] >= 1 && s.lag[p] > 0) {
            s.acc[p] -= 1;
            s.lag[p]--;
            s.flights.push({ p, w: o, t0: now, dur: 380 * fly, out: true });
          }
          if (s.lag[p] === 0) s.acc[p] = Math.min(s.acc[p], 1);
        }
      }

      // land flights
      s.flights = s.flights.filter((f) => {
        if (now - f.t0 < f.dur) return true;
        if (f.out) s.delivered++;
        else s.lag[f.p] = Math.min(s.lag[f.p] + 1, MAX_LAG);
        return false;
      });

      draw(now);

      if (now - lastStats > 250) {
        lastStats = now;
        setStats({
          delivered: s.delivered,
          waiting: s.lag.reduce((a, b) => a + b, 0),
          rebalancing: now < s.rebalanceUntil,
          spiking: now < s.spikeUntil,
        });
      }
      if (visible) raf = requestAnimationFrame(step);
    };

    const draw = (now: number) => {
      const s = sim.current;
      const css = getComputedStyle(document.documentElement);
      const ink = css.getPropertyValue("--ink").trim();
      const muted = css.getPropertyValue("--ink-2").trim();
      const rule = css.getPropertyValue("--rule").trim();
      const paper = css.getPropertyValue("--paper").trim();
      const signal = css.getPropertyValue("--signal").trim();
      const g = geom();
      const mono = getComputedStyle(document.body).getPropertyValue("--mono").trim() || "monospace";

      ctx.clearRect(0, 0, w, h);
      ctx.font = `${g.narrow ? 10 : 11}px ${mono}`;
      ctx.textBaseline = "middle";

      // column headings
      ctx.fillStyle = muted;
      ctx.textAlign = "left";
      ctx.fillText("producer", g.prodX, 14);
      ctx.fillText(g.narrow ? "topic" : "topic: messages", g.laneX, 14);
      ctx.textAlign = "right";
      ctx.fillText(g.narrow ? "consumers" : "consumer group", w - 2, 14);
      ctx.strokeStyle = rule;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 28.5);
      ctx.lineTo(w, 28.5);
      ctx.stroke();

      // producer
      const py = g.rowY(1);
      ctx.fillStyle = ink;
      ctx.fillRect(g.prodX, py - 16, g.prodW, 32);
      ctx.fillStyle = paper;
      ctx.textAlign = "center";
      ctx.fillText("api", g.prodX + g.prodW / 2, py);

      const rebalancing = now < s.rebalanceUntil;
      const laneLen = g.laneEnd - g.laneX;
      const slots = Math.floor(laneLen / 7);

      for (let p = 0; p < PARTITIONS; p++) {
        const y = g.rowY(p);

        // fan-out line from producer
        ctx.strokeStyle = rule;
        ctx.beginPath();
        ctx.moveTo(g.prodX + g.prodW, py);
        ctx.lineTo(g.laneX, y);
        ctx.stroke();

        // lane
        ctx.strokeStyle = muted;
        ctx.strokeRect(g.laneX + 0.5, y - 9.5, laneLen, 19);
        const lag = s.lag[p];
        const shown = Math.min(lag, slots);
        ctx.fillStyle = lag > slots ? signal : ink;
        for (let i = 0; i < shown; i++) {
          ctx.fillRect(g.laneEnd - 5 - i * 7, y - 5, 5, 10);
        }
        ctx.fillStyle = muted;
        ctx.textAlign = "left";
        ctx.fillText(`p${p}`, g.laneX, y - 19);
        ctx.textAlign = "right";
        ctx.fillStyle = lag > slots ? signal : muted;
        ctx.fillText(lag ? `lag ${lag}` : "", g.laneEnd, y - 19);

        // ownership line
        const o = s.owner[p];
        if (o >= 0) {
          const wy = g.rowY(o);
          ctx.strokeStyle = rebalancing ? signal : muted;
          ctx.setLineDash(rebalancing ? [3, 3] : []);
          ctx.beginPath();
          ctx.moveTo(g.laneEnd + 1, y);
          ctx.lineTo(g.workerX, wy);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // workers
      for (let i = 0; i < WORKERS; i++) {
        const y = g.rowY(i);
        const up = s.alive[i];
        if (up) {
          ctx.fillStyle = ink;
          ctx.fillRect(g.workerX, y - 16, g.workerW, 32);
          ctx.fillStyle = paper;
        } else {
          ctx.strokeStyle = muted;
          ctx.setLineDash([3, 3]);
          ctx.strokeRect(g.workerX + 0.5, y - 15.5, g.workerW - 1, 31);
          ctx.setLineDash([]);
          ctx.fillStyle = muted;
        }
        ctx.textAlign = "center";
        ctx.fillText(up ? `w${i + 1}` : `w${i + 1} off`, g.workerX + g.workerW / 2, y);
      }

      // messages in flight
      ctx.fillStyle = signal;
      for (const f of s.flights) {
        const t = f.dur ? Math.min((now - f.t0) / f.dur, 1) : 1;
        let x: number, y: number;
        if (f.out) {
          const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          x = g.laneEnd + (g.workerX - g.laneEnd) * e;
          y = g.rowY(f.p) + (g.rowY(f.w) - g.rowY(f.p)) * e;
        } else {
          // first hop: producer to the lane mouth; then along the lane to the back of the queue
          const ly = g.rowY(f.p);
          const tail = Math.max(g.laneX + 4, g.laneEnd - 3 - Math.min(s.lag[f.p], slots) * 7);
          if (t < 0.3) {
            const e = t / 0.3;
            x = g.prodX + g.prodW + (g.laneX - g.prodX - g.prodW) * e;
            y = py + (ly - py) * e;
          } else {
            const e = (t - 0.3) / 0.7;
            x = g.laneX + (tail - g.laneX) * (1 - (1 - e) * (1 - e));
            y = ly;
          }
        }
        ctx.fillRect(x - 2, y - 2, 4, 4);
      }
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) {
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    });
    io.observe(canvas);

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const toggle = (i: number) => {
    const s = sim.current;
    s.alive[i] = !s.alive[i];
    s.owner = assign(s.alive);
    s.rebalanceUntil = performance.now() + REBALANCE_MS;
    setAlive(s.alive.slice());
  };

  const spike = () => {
    sim.current.spikeUntil = performance.now() + SPIKE_MS;
  };

  const reset = () => {
    sim.current = freshSim();
    setAlive(sim.current.alive.slice());
  };

  const up = alive.filter(Boolean).length;
  const capacity = up * WORKER_RATE;
  let status = `${up} workers, ${capacity} msg/s capacity against ${BASE_RATE} msg/s coming in.`;
  if (stats.rebalancing) status = "Rebalancing. Nobody consumes until partitions are reassigned.";
  else if (up === 0) status = "No consumers. Messages pile up in the topic and nothing is lost, just late.";
  else if (stats.spiking) status = `Traffic spike: ${SPIKE_RATE} msg/s. The topic absorbs the burst while workers catch up.`;
  else if (capacity < BASE_RATE) status = `${capacity} msg/s capacity is less than ${BASE_RATE} msg/s coming in. Lag will keep growing.`;

  return (
    <figure className="pipeline">
      <div ref={wrapRef} className="pipeline-canvas">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Animated diagram: a producer writes messages into three Kafka partitions, which a group of three workers consumes."
        />
      </div>

      <div className="pipeline-bar">
        <div className="pipeline-controls" role="group" aria-label="Simulation controls">
          {alive.map((a, i) => (
            <button key={i} type="button" className="chip" aria-pressed={!a} onClick={() => toggle(i)}>
              {a ? `Stop w${i + 1}` : `Start w${i + 1}`}
            </button>
          ))}
          <button type="button" className="chip" onClick={spike} disabled={stats.spiking}>
            Send a spike
          </button>
          <button type="button" className="chip chip-quiet" onClick={reset}>
            Reset
          </button>
        </div>
        <dl className="pipeline-stats">
          <div>
            <dt>delivered</dt>
            <dd>{stats.delivered.toLocaleString("en-IN")}</dd>
          </div>
          <div>
            <dt>waiting</dt>
            <dd className={stats.waiting > 40 ? "hot" : ""}>{stats.waiting}</dd>
          </div>
        </dl>
      </div>

      <figcaption aria-live="polite">{status}</figcaption>
    </figure>
  );
}
