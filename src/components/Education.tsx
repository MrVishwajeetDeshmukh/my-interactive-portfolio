import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const education = [
    {
      degree: "B.E. in Electronics & Telecommunication",
      institution: "Savitribai Phule Pune University",
      college: "SCOE, Pune",
      grade: "CGPA: 8.22",
      year: "2023",
    },
    {
      degree: "Diploma in E&TC",
      institution: "MSBTE",
      college: "SVIP, Latur",
      grade: "78.24%",
      year: "2020",
    },
  ];

  const certifications = [
    "Google Cloud Essentials – Qwiklabs",
    "Programming with Go Specialization – Coursera",
    "Linux Command Line Basics – Coursera",
  ];

  return (
    <section id="education" className="py-32 md:py-44 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm tracking-widest uppercase text-primary mb-4 text-center"
        >
          Education
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-gradient leading-tight mb-20"
        >
          The foundation.
        </motion.h2>

        <div className="space-y-6 mb-20">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="flex flex-col md:flex-row md:items-baseline justify-between bg-card rounded-2xl p-8 border border-border"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">{edu.degree}</h3>
                <p className="text-muted-foreground mt-1">{edu.institution} · {edu.college}</p>
              </div>
              <div className="flex items-center gap-4 mt-3 md:mt-0 shrink-0">
                <span className="text-primary font-medium">{edu.grade}</span>
                <span className="text-muted-foreground text-sm">{edu.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Certifications</h3>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-5 py-2.5 text-sm bg-card border border-border rounded-full text-muted-foreground"
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
