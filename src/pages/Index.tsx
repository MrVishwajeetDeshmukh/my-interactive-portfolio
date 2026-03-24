import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const About = React.lazy(() => import("@/components/About"));
const Experience = React.lazy(() => import("@/components/Experience"));
const Projects = React.lazy(() => import("@/components/Projects"));
const Skills = React.lazy(() => import("@/components/Skills"));
const Education = React.lazy(() => import("@/components/Education"));
const Contact = React.lazy(() => import("@/components/Contact"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading...</div>}>
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Contact />
      </Suspense>
    </div>
  );
};

export default Index;
