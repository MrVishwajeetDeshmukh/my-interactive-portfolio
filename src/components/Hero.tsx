import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(210_100%_50%_/_0.08)_0%,_transparent_70%)]" />

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
            View My Work
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 border border-border text-sm font-medium rounded-full text-foreground hover:bg-accent transition-smooth"
          >
            Get in Touch
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
