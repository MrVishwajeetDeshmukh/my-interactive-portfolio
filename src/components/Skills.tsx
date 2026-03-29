import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    {
      title: "Core",
      skills: ["Go (Golang)", "PostgreSQL", "gRPC", "REST APIs", "Fiber/Gin"],
    },
    {
      title: "Working Knowledge",
      skills: ["Kubernetes", "Kafka", "Docker", "ScyllaDB", "Redis"],
    },
    {
      title: "Exposure",
      skills: ["Python", "MySQL", "CI/CD", "Linux", "GCP"],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-44 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm tracking-widest uppercase text-primary mb-4 text-center"
        >
          Skills
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center text-gradient leading-tight mb-12 sm:mb-20"
        >
          The toolkit.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-background p-6 sm:p-8 md:p-10"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm bg-accent text-muted-foreground rounded-full border border-border hover:text-foreground hover:border-primary/30 transition-smooth cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
