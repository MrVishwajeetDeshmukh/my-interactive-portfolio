import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "JioCX RCS Platform",
      subtitle: "India's leading CPaaS platform",
      description:
        "Handling millions of messages daily. Built REST APIs and microservices in Go with Kubernetes deployment.",
      tags: ["Go", "Kubernetes", "Kafka", "Redis"],
    },
    {
      title: "Microservices Refactoring",
      subtitle: "Monolith to microservices",
      description:
        "Refactored monolithic modules into scalable microservices. Integrated Kafka for async communication and migrated to ScyllaDB.",
      tags: ["Go", "ScyllaDB", "MySQL", "Kafka"],
    },
    {
      title: "Face Mask Detector",
      subtitle: "Deep learning computer vision",
      description:
        "Real-time mask detection system using deep learning and computer vision. Achieved 95% accuracy with CNN and TensorFlow.",
      tags: ["Python", "TensorFlow", "OpenCV"],
    },
  ];

  return (
    <section id="projects" className="py-32 md:py-44 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm tracking-widest uppercase text-primary mb-4 text-center"
        >
          Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-gradient leading-tight mb-20"
        >
          Built to perform.
        </motion.h2>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
              className="group relative bg-card rounded-2xl p-8 md:p-12 border border-border hover:border-primary/30 transition-smooth overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(210_100%_50%_/_0.05)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-smooth" />

              <div className="relative z-10">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">{project.subtitle}</p>
                <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-4">{project.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl">{project.description}</p>

                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 text-xs font-medium tracking-wide uppercase bg-accent text-accent-foreground rounded-full border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
