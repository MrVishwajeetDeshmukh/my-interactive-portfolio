import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      role: "Software Development Engineer (Back-end)",
      company: "Jio Platforms Limited",
      location: "Navi Mumbai",
      duration: "Oct 2023 – Present",
      achievements: [
        "Engineered REST APIs and microservices in Go for India's leading CPaaS platform, scaling the system to reliably process millions of messages daily.",
        "Spearheaded the migration of monolithic modules into scalable microservices, improving deployment speed and code maintainability across teams.",
        "Designed and provisioned a resilient Kubernetes cluster architecture, ensuring high availability and driving an increase to 99.9% system uptime.",
        "Integrated Kafka to decouple services and enable asynchronous communication, increasing system responsiveness by 30% during peak traffic spikes.",
        "Reduced API response latency by 35% through meticulous MySQL query tuning, Redis caching layers, and migrating critical data paths to ScyllaDB.",
      ],
    },
    {
      role: "Cyber Security Intern",
      company: "IBM SkillsBuild",
      location: "Remote",
      duration: "Dec 2022 – Feb 2023",
      achievements: [
        "Analyzed data security vulnerabilities using steganography, encoding, and digital forensics tools to identify potential attack vectors.",
        "Completed comprehensive hands-on labs focused on threat detection mechanisms, information security protocols, and strict confidentiality guidelines.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-44 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm tracking-widest uppercase text-primary mb-4 text-center"
        >
          Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center text-gradient leading-tight mb-12 sm:mb-20"
        >
          Where I've worked.
        </motion.h2>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground">{exp.role}</h3>
                  <p className="text-primary text-lg mt-1">{exp.company} <span className="text-muted-foreground">· {exp.location}</span></p>
                </div>
                <span className="text-sm text-muted-foreground mt-2 md:mt-0 shrink-0">{exp.duration}</span>
              </div>

              <ul className="space-y-4">
                {exp.achievements.map((a, i) => (
                  <li key={i} className="flex gap-4 text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1.5 text-xs">●</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>

              {index < experiences.length - 1 && (
                <div className="section-divider mt-16" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
