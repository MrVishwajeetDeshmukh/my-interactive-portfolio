import { GraduationCap } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "B.E. in Electronics & Telecommunication Engineering",
      institution: "Savitribai Phule Pune University",
      college: "SCOE, Pune",
      grade: "CGPA: 8.22",
      year: "May 2023"
    },
    {
      degree: "Diploma in Electronics & Telecommunication Engineering",
      institution: "MSBTE",
      college: "SVIP, Latur",
      grade: "78.24%",
      year: "Nov 2020"
    }
  ];

  const certifications = [
    "Google Cloud Essentials – Qwiklabs (2023)",
    "Programming with Go Specialization – Coursera (2023)",
    "Linux Command Line Basics – Coursera (2022)"
  ];

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Education & Certifications</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic background and professional certifications
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Education */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-primary">Education</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg card-shadow hover:card-hover-shadow transition-smooth animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">{edu.degree}</h4>
                      <p className="text-primary font-medium mb-1">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground mb-2">{edu.college}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-secondary font-medium">{edu.grade}</span>
                        <span className="text-muted-foreground">{edu.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-primary">Certifications</h3>
            <div className="bg-card p-8 rounded-lg card-shadow">
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 group animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-secondary mt-1 text-xl group-hover:scale-125 transition-smooth">✓</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-smooth">
                      {cert}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
