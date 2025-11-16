const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Docker", "AWS", "Figma", "Testing"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Constantly learning and adapting to new technologies
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg card-shadow animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-primary">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary group-hover:scale-150 transition-smooth" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-smooth">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
