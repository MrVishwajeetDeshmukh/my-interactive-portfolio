import { Code, Palette, Rocket } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Code,
      title: "System Design",
      description: "Architecting scalable backend systems with microservices and distributed architectures"
    },
    {
      icon: Palette,
      title: "API Development",
      description: "Building robust RESTful and GraphQL APIs with comprehensive documentation"
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing database queries, caching strategies, and service response times"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm a backend engineer passionate about building efficient, scalable systems. 
            With expertise in server-side technologies and databases, I design and develop 
            robust APIs and microservices that power modern applications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg card-shadow hover:card-hover-shadow transition-smooth hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
