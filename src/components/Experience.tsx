import { Briefcase, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      role: "Software Development Engineer (Back-end)",
      company: "Jio Platforms Limited",
      location: "Navi Mumbai, India",
      duration: "Oct 2023 – Present",
      achievements: [
        "Developed REST APIs and microservices in Go for India's leading CPaaS platform handling millions of messages per day",
        "Refactored existing monolithic modules into scalable microservices improving maintainability and code reuse",
        "Designed and deployed Kubernetes cluster ensuring high availability and increase in uptime",
        "Integrated Kafka for asynchronous communication, increasing system responsiveness during traffic spikes",
        "Reduced API response time by tuning MySQL queries, implementing Redis caching, and migrating to ScyllaDB",
        "Participated in architecture discussions and agile ceremonies with cross-functional teams"
      ]
    },
    {
      role: "Cyber Security Intern",
      company: "IBM SkillsBuild",
      location: "Remote",
      duration: "Dec 2022 – Feb 2023",
      achievements: [
        "Explored data security techniques including steganography, encoding, and digital forensics tools",
        "Completed hands-on labs focused on threat detection, information security, and confidentiality"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Work Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building scalable backend systems and solving complex challenges
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg card-shadow hover:card-hover-shadow transition-smooth animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Briefcase className="w-5 h-5" />
                    <span className="font-medium">{exp.company}</span>
                    <span className="text-muted-foreground">• {exp.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mt-2 md:mt-0">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{exp.duration}</span>
                </div>
              </div>
              
              <ul className="space-y-3">
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="flex gap-3">
                    <span className="text-secondary mt-1.5">▹</span>
                    <span className="text-muted-foreground flex-1">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
