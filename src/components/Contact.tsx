import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socials = [
    { icon: Mail, label: "Email", href: "mailto:deshmukhv.vishwajeet@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/vishwajeetd" },
    { icon: Github, label: "GitHub", href: "https://github.com/MrVishwajeetDeshmukh" },
  ];

  return (
    <section id="contact" className="py-32 md:py-44 px-6">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm tracking-widest uppercase text-primary mb-4"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient leading-tight mb-8"
        >
          Let's connect.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          I'm always interested in hearing about new projects and opportunities.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          href="mailto:deshmukhv.vishwajeet@gmail.com"
          className="inline-block text-lg sm:text-2xl md:text-4xl font-semibold text-gradient-blue hover:opacity-80 transition-smooth mb-16 break-all sm:break-normal px-2"
        >
          deshmukhv.vishwajeet@gmail.com
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center mb-8"
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-smooth"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground"
        >
          +91 8779619155
        </motion.p>
      </div>

      <footer className="mt-32 pt-8 text-center">
        <div className="section-divider mb-8" />
        <p className="text-xs text-muted-foreground">
          © 2026 Vishwajeet Deshmukh
        </p>
      </footer>
    </section>
  );
};

export default Contact;
