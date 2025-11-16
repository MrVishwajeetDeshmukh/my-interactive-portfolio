import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Projects = () => {
  const projects = [
    {
      title: "JioCX RCS Platform",
      description: "India's leading CPaaS platform handling millions of messages daily. Built REST APIs and microservices in Go with Kubernetes deployment.",
      image: project1,
      tags: ["Go", "Kubernetes", "Kafka", "Redis"],
      github: "#",
      demo: "#"
    },
    {
      title: "Microservices Refactoring",
      description: "Refactored monolithic modules into scalable microservices. Integrated Kafka for async communication and migrated to ScyllaDB.",
      image: project2,
      tags: ["Go", "ScyllaDB", "MySQL", "Kafka"],
      github: "#",
      demo: "#"
    },
    {
      title: "Face Mask Detector",
      description: "Real-time mask detection system using deep learning and computer vision. Achieved 95% accuracy with CNN and TensorFlow.",
      image: project3,
      tags: ["Python", "TensorFlow", "OpenCV"],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of recent work showcasing my skills in web development and design
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card rounded-lg overflow-hidden card-shadow hover:card-hover-shadow transition-smooth hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center gap-4">
                  <Button size="sm" variant="secondary" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" variant="secondary" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
