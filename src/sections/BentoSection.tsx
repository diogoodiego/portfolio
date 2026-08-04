import React from "react";

// Project Card Component (minimal with reduced border radius and no hover)
const ProjectCard = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) => (
  <div
    className={`relative overflow-hidden bg-stone-900/60 p-6 sm:p-8 flex flex-col justify-start h-full ${className}`}
  >
    <h3 className="font-bold text-white text-xl sm:text-2xl tracking-tight">
      {title}
    </h3>
  </div>
);

export const BentoSection = () => {
  return (
    <section id="projects" className="flex flex-col justify-between bg-stone-950 p-6 md:p-8 md:px-16 lg:px-24 py-4 lg:pt-24 min-h-screen snap-start">
      {/* Header: Headline top left, Subtitle top right per diagram */}
      <div className="flex md:flex-row flex-col flex-shrink-0 justify-between md:items-baseline gap-4 mb-8">
        <h2 className="font-bold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight">
          Featured Projects
        </h2>
        <p className="max-w-md text-stone-400 text-sm md:text-base md:text-right">
          A curated selection of product design, design systems, and usability research projects.
        </p>
      </div>

      {/* 3 Vertical Cards Grid */}
      <div className="flex-1 items-stretch gap-6 lg:gap-4 grid grid-cols-1 md:grid-cols-3 h-full min-h-0">
        <ProjectCard title="Croft — Design System" />
        <ProjectCard title="Ceni — UI Kit" />
        <ProjectCard title="Heuristic Evaluation — IFSolve" />
      </div>
    </section>
  );
};


