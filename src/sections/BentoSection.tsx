import React from "react";
import { ChevronRight } from "lucide-react"

// Premium Bento Item Wrapper
const BentoItem = ({
  title,
  children,
  description,
  className = "",
  icon,
  badge,
}: {
  title: string;
  children?: React.ReactNode;
  description: string;
  className?: string;
  icon?: React.ReactNode;
  badge?: {
    text: string;
    dotColor: string;
    bgClass: string;
  };
}) => (
  <div
    className={`group relative overflow-hidden rounded-3xl bg-stone-950 border border-white/5 p-8 flex flex-col justify-between transition-all duration-50 shadow-xl ${className}`}
  >
    {/* Icon Watermark */}
    <div className="top-0 right-0 absolute p-6 text-white/5 group-hover:text-white/10 group-hover:scale-110 transition-all duration-500 select-none">
      {icon}
    </div>

    {/* Bottom Area: Metadata & Text */}
    <div className="z-10 relative flex flex-col justify-end pt-24 h-full">
      {badge && (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold w-fit mb-3 border border-white/5 ${badge.bgClass}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${badge.dotColor} animate-pulse`}
          />
          {badge.text}
        </div>
      )}
      <h3 className="mb-2 font-bold text-white group-hover:text-white text-xl tracking-tight transition-colors duration-300">
        {title}
      </h3>
      <p className="max-w-[480px] text-zinc-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
    {children}
    {/* Subtle highlight gradient hover effect */}
    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-80 pointer-events-none" />
  </div>
);

export const BentoSection = () => {
  return (
    <section id="projects" className="bg-stone-950 p-6 py-16 md:p-12 md:px-16 lg:px-24 lg:pt-24 snap-start">
      <div className="mb-8">
        <h2 className="mb-4 font-bold text-white text-4xl md:text-5xl tracking-tight">
          Featured Projects
        </h2>
        <p className="text-zinc-400 text-lg">
          A curated selection of product design, design systems, and usability
          research projects.
        </p>
      </div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Item 1 - Croft Design System (Work) */}
        <BentoItem
          title="Croft - Design System"
          description="The Croft Design System was created to provide a cohesive and flexible system that could be used to build interfaces for various company solutions, ranging from complex dashboards for drilling monitoring to landing pages aimed at presenting new technologies."
          className="md:col-span-2 lg:col-span-3 lg:row-span-1"
          badge={{
            text: "Work",
            dotColor: "bg-[#db2777]",
            bgClass: "bg-[#451225] text-white",
          }}
        />
        {/* Item 2 - Ceni */}
        <BentoItem
          title="Ceni"
          description="Refined and consistent interfaces with high aesthetic rigor, focusing on typography, contrast, and fluid micro-interactions."
          className="md:col-span-2 lg:col-span-1 lg:row-span-2"
          badge={{
            text: "Figma Plugin",
            dotColor: "bg-[#ea580c]",
            bgClass: "bg-[#3f190a] text-white",
          }}
          icon={<div className="font-black text-7xl">#</div>}
        >
          <div className="top-6 right-6 left-6 z-20 absolute flex flex-col gap-2.5 bg-stone-900 shadow-2xl backdrop-blur-md p-3 border border-white/10 rounded-2xl">
            <div className="flex justify-between items-center pb-2 border-white/5 border-b">
              <div className="flex items-center gap-1.5">
                <span className="bg-theme-accent rounded-full w-1.5 h-1.5 animate-pulse" />
                <span className="font-mono font-bold text-[9px] text-white uppercase tracking-wide">Ceni UI Kit</span>
              </div>
              <span className="font-mono text-[8px] text-stone-50">v1.2.0</span>
            </div>

            <div className="gap-2 grid grid-cols-2">
              {/* Accordion Card */}
              <div className="group/card flex flex-col gap-1.5 bg-stone-950/40 hover:bg-stone-950/80 p-2 border border-white/5 hover:border-theme-accent/25 rounded-xl transition-all duration-300">
                <div className="relative flex flex-col justify-center items-center gap-1 bg-stone-900/50 p-1 border border-white/5 rounded-lg w-full h-11 overflow-hidden">
                  <div className="flex justify-between items-center bg-stone-800/80 px-1 py-0.5 border border-white/5 rounded w-full text-[5px] text-stone-400">
                    <span>Accordion Item</span>
                    <ChevronRight size={4} className="text-stone-500" />
                  </div>
                  <div className="flex flex-col bg-theme-accent/10 p-1 border border-theme-accent/15 rounded w-full text-[4px] text-theme-accent/85">
                    <div className="flex justify-between items-center font-medium text-theme-accent">
                      <span>Expanded Item</span>
                      <ChevronRight size={4} className="text-theme-accent/80 rotate-90" />
                    </div>
                    <span className="mt-0.5 text-[3.5px] text-stone-400/80 leading-tight">Tailwind collapse view.</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-bold text-[9px] text-stone-200">Accordion</h4>
                  <p className="text-[7px] text-stone-500 leading-normal">Collapsible tabs</p>
                </div>
              </div>

              {/* Avatars Card */}
              <div className="group/card flex flex-col gap-1.5 bg-stone-950/40 hover:bg-stone-950/80 p-2 border border-white/5 hover:border-theme-accent/25 rounded-xl transition-all duration-300">
                <div className="flex justify-center items-center bg-stone-900/50 border border-white/5 rounded-lg w-full h-11 overflow-hidden">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center bg-theme-accent shadow-sm border border-stone-850 rounded-full w-4 h-4 font-bold text-[5px] text-white">JD</div>
                    <div className="flex justify-center items-center bg-indigo-500 shadow-sm -ml-1.5 border border-stone-850 rounded-full w-4 h-4 font-bold text-[5px] text-white">AM</div>
                    <div className="flex justify-center items-center bg-amber-500 shadow-sm -ml-1.5 border border-stone-850 rounded-full w-4 h-4 font-bold text-[5px] text-white">SK</div>
                    <div className="flex justify-center items-center bg-stone-700 -ml-1.5 border border-stone-850 rounded-full w-4 h-4 font-semibold text-[5px] text-stone-300">+2</div>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-bold text-[9px] text-stone-200">Avatars</h4>
                  <p className="text-[7px] text-stone-500 leading-normal">Image stacking</p>
                </div>
              </div>

              {/* Buttons Card */}
              <div className="group/card flex flex-col gap-1.5 bg-stone-950/40 hover:bg-stone-950/80 p-2 border border-white/5 hover:border-theme-accent/25 rounded-xl transition-all duration-300">
                <div className="flex flex-col justify-center items-center gap-1 bg-stone-900/50 p-1 border border-white/5 rounded-lg w-full h-11">
                  <div className="bg-theme-accent hover:bg-theme-accent/90 shadow-theme-glow-sm py-0.5 rounded w-full font-bold text-[5px] text-white text-center transition-colors">
                    Primary
                  </div>
                  <div className="py-0.5 border border-white/10 rounded w-full text-[4px] text-stone-400 text-center">
                    Secondary
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-bold text-[9px] text-stone-200">Buttons</h4>
                  <p className="text-[7px] text-stone-500 leading-normal">Action statuses</p>
                </div>
              </div>

              {/* Drawer Card */}
              <div className="group/card flex flex-col gap-1.5 bg-stone-950/40 hover:bg-stone-950/80 p-2 border border-white/5 hover:border-theme-accent/25 rounded-xl transition-all duration-300">
                <div className="relative flex justify-end items-center bg-stone-900/50 border border-white/5 rounded-lg w-full h-11 overflow-hidden">
                  <div className="flex flex-col justify-between gap-0.5 bg-stone-850 shadow-2xl p-1 border-white/10 border-l w-[65%] h-full">
                    <div className="flex flex-col gap-0.5">
                      <span className="bg-stone-600 rounded w-3 h-0.5" />
                      <span className="bg-stone-600 rounded w-5 h-0.5" />
                      <span className="bg-stone-600 rounded w-4 h-0.5" />
                    </div>
                    <div className="bg-theme-accent/20 py-0.5 border border-theme-accent/20 rounded w-full font-bold text-[3.5px] text-theme-accent text-center">
                      Done
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-bold text-[9px] text-stone-200">Drawer</h4>
                  <p className="text-[7px] text-stone-500 leading-normal">Slide-out panels</p>
                </div>
              </div>
            </div>
          </div>
        </BentoItem>

        {/* Item 3- IFSolve Platform Case Study (Side Project) */}
        <BentoItem
          title="Heuristic Evaluation of the IFSolve Platform"
          description="This case study presents an in-depth analysis of the IFSolve platform's interface through a heuristic evaluation, a technique widely used to identify usability issues."
          className="md:col-span-1 lg:col-span-2 lg:row-span-1"
          badge={{
            text: "Case Study",
            dotColor: "bg-[#ea580c]",
            bgClass: "bg-[#3f190a] text-white",
          }}
        />

        {/* Item 4 - User Research */}
        <BentoItem
          title="Stream 5.0 - AI for Streaming"
          description="Strategic decisions driven by user research, usability testing, data analysis, and journey mapping."
          className="md:col-span-1 lg:col-span-1 lg:row-span-1"
          icon={<div className="font-black text-7xl">@</div>}
        />
      </div>
    </section>
  );
};
