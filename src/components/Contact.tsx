import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const Contact = () => {
  const socials = [
    { icon: Mail, label: "Email", href: "mailto:your.email@example.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-lg text-muted-foreground mb-12">
            I'm always interested in hearing about new projects and opportunities.
            Feel free to reach out!
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {socials.map((social, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="gap-2 hover:bg-accent hover:border-primary transition-smooth"
                asChild
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon className="w-5 h-5" />
                  {social.label}
                </a>
              </Button>
            ))}
          </div>
          
          <div className="p-8 bg-card rounded-lg card-shadow">
            <p className="text-muted-foreground mb-4">
              Prefer email? Drop me a line at:
            </p>
            <a 
              href="mailto:your.email@example.com"
              className="text-2xl font-semibold text-primary hover:text-secondary transition-smooth"
            >
              your.email@example.com
            </a>
          </div>
        </div>
      </div>
      
      <footer className="mt-20 pt-8 border-t border-border text-center text-muted-foreground">
        <p>&copy; 2024 Your Name. Built with React & Tailwind CSS</p>
      </footer>
    </section>
  );
};

export default Contact;
