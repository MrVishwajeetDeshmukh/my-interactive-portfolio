import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "Millions", label: "Messages/Day" },
    { value: "Go", label: "Primary Language" },
    { value: "K8s", label: "Infrastructure" },
  ];

  return (
    <section id="about" className="py-20 md:py-44 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-sm tracking-widest uppercase text-primary mb-4 text-center"
        >
          About
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center text-gradient leading-tight mb-8"
        >
          Engineering at scale.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed mb-20"
        >
          Backend Software Engineer experienced in designing scalable microservices using Golang.
          Strong background in distributed systems, RESTful APIs, Kubernetes, and real-time messaging platforms.
          Adept at performance optimization, system reliability, and production-grade deployment.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="bg-background p-6 sm:p-8 md:p-12 text-center"
            >
              <div className="text-3xl md:text-5xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground tracking-wide uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
