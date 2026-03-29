import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const LiquidEther = lazy(() => import("@/components/ui/LiquidEther"));

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 bg-background">
      {/* Liquid Ether Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Suspense fallback={<div className="w-full h-full bg-background" />}>
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={15}
            cursorSize={80}
            isViscous
            viscous={20}
            iterationsViscous={16}
            iterationsPoisson={16}
            resolution={0.25}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </Suspense>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-5xl"
      >
        <p className="text-sm md:text-base tracking-widest uppercase text-muted-foreground mb-6">
          Backend Software Engineer
        </p>

        <h1 className="text-gradient text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-8">
          Vishwajeet
          <br />
          Deshmukh
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12"
        >
          Designing scalable microservices with Go.
          <br className="hidden sm:block" />
          Building distributed systems at Jio Platforms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center w-full px-4 sm:px-0"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-full hover:opacity-80 transition-smooth"
          >
            View Projects
          </a>
          <a
            href="https://drive.google.com/file/d/168xav-lw28LG1WdIPQbNFM5wtejnDAd2/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 border border-border text-sm font-medium rounded-full text-foreground hover:bg-accent transition-smooth flex items-center justify-center gap-2"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
