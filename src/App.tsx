import { useEffect, useState, type ReactNode } from "react";
import Pipeline from "./Pipeline";
import { certifications, education, facts, jobs, profile, projects, stack } from "./content";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

function currentTheme(): "light" | "dark" {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeButton() {
  const [theme, setTheme] = useState<"light" | "dark">(() => currentTheme());
  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked; the choice just won't persist */
    }
    setTheme(next);
  };
  return (
    <button type="button" className="theme" onClick={flip} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      <span className="theme-dot" aria-hidden="true" />
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`top${scrolled ? " top-scrolled" : ""}`}>
      <div className="top-inner">
        <a href="#" className="top-name">
          Vishwajeet Deshmukh
        </a>
        <nav className={`top-nav${open ? " open" : ""}`} aria-label="Sections">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="top-resume">
            Résumé ↗
          </a>
        </nav>
        <div className="top-tools">
          <ThemeButton />
          <button
            type="button"
            className="menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Sections">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a href={profile.resume} target="_blank" rel="noopener noreferrer">
            Résumé ↗
          </a>
        </nav>
      )}
    </header>
  );
}

function Section({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section id={id} className="section">
      <h2 className="section-label">{label}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <button type="button" className="chip" onClick={copy}>
      {copied ? "Copied" : "Copy address"}
    </button>
  );
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Header />

      <main id="main">
        <section className="intro">
          <p className="kicker">
            {profile.role} · {profile.location}
          </p>
          <h1>
            Vishwajeet
            <br />
            Deshmukh
          </h1>
          <p className="lede">
            I've spent three years building backend systems in Go. At Jio Platforms I work on JioCX, an RCS
            messaging platform that handles millions of messages a day on GCP and Kubernetes. Lately I've been
            adding LLM-based automation to it.
          </p>
          <ul className="facts">
            {facts.map((f) => (
              <li key={f.label}>
                <span className="facts-value">{f.value}</span>
                <span className="facts-label">{f.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="demo" aria-labelledby="demo-title">
          <div className="demo-text">
            <h2 id="demo-title" className="section-label">
              Try it
            </h2>
            <p>
              A toy version of the setup I work with. A producer writes to a Kafka topic with three partitions and
              a consumer group reads from it.
            </p>
            <p>
              Stop a worker and watch the group rebalance, or send a burst of traffic and see the topic soak it up
              while the workers catch up.
            </p>
          </div>
          <Pipeline />
        </section>

        <Section id="work" label="Work">
          <ol className="jobs">
            {jobs.map((j) => (
              <li key={j.company} className="job">
                <div className="job-head">
                  <h3>
                    {j.company}
                    <span className="job-role">{j.role}</span>
                  </h3>
                  <p className="job-when">
                    {j.from} – {j.to}
                    <span>{j.place}</span>
                  </p>
                </div>
                <ul className="job-points">
                  {j.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" label="Projects">
          <ol className="projects">
            {projects.map((p, i) => (
              <li key={p.name} className="project">
                <span className="project-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="project-main">
                  <h3>{p.name}</h3>
                  <p className="project-context">{p.context}</p>
                  <p>{p.body}</p>
                </div>
                <div className="project-side">
                  <p className="project-result">{p.result}</p>
                  <p className="project-stack">{p.stack.join(" / ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="stack" label="Stack">
          <table className="stack">
            <tbody>
              {stack.map((s) => (
                <tr key={s.level}>
                  <th scope="row">{s.level}</th>
                  <td>{s.items.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section id="education" label="Education">
          <ul className="edu">
            {education.map((e) => (
              <li key={e.what}>
                <div>
                  <h3>{e.what}</h3>
                  <p>{e.where}</p>
                </div>
                <p className="edu-meta">
                  {e.grade}
                  <span>{e.year}</span>
                </p>
              </li>
            ))}
          </ul>
          <h3 className="sub">Certifications</h3>
          <ul className="certs">
            {certifications.map((c) => (
              <li key={c.name}>
                {c.name} <span>{c.by}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" label="Contact">
          <p className="contact-lead">Email is the quickest way to reach me.</p>
          <p className="contact-mail">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <div className="contact-row">
            <CopyEmail />
            <a className="chip" href={profile.resume} target="_blank" rel="noopener noreferrer">
              Résumé (PDF) ↗
            </a>
          </div>
          <ul className="links">
            <li>
              <span>LinkedIn</span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                linkedin.com/in/vishwajeetd
              </a>
            </li>
            <li>
              <span>GitHub</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                github.com/MrVishwajeetDeshmukh
              </a>
            </li>
            <li>
              <span>Phone</span>
              <a href={profile.phoneHref}>{profile.phone}</a>
            </li>
          </ul>
        </Section>
      </main>

      <footer className="foot">
        <p>© {new Date().getFullYear()} Vishwajeet Deshmukh</p>
        <p>
          <a href="#">Back to top ↑</a>
        </p>
      </footer>
    </>
  );
}
