import React from "react";

// Premium Bento Item Wrapper
const BentoItem = ({
  title,
  description,
  className = "",
  icon,
  badge,
}: {
  title: string;
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
    className={`group relative overflow-hidden rounded-3xl bg-[#0b0b0f] border border-white/5 p-8 flex flex-col justify-between transition-all duration-500 hover:border-white/15 hover:bg-[#111116] shadow-xl ${className}`}
  >
    {/* Icon Watermark */}
    <div className="absolute top-0 right-0 p-6 text-white/5 transition-all duration-500 group-hover:scale-110 group-hover:text-white/10 select-none">
      {icon}
    </div>

    {/* Bottom Area: Metadata & Text */}
    <div className="relative z-10 flex flex-col justify-end h-full pt-24">
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
      <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-zinc-400 text-sm leading-relaxed max-w-[480px]">
        {description}
      </p>
    </div>

    {/* Subtle highlight gradient hover effect */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-80" />
  </div>
);

export const BentoSection = () => {
  return (
    <section id="projetos" className="py-24 px-12 bg-black snap-start">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Projetos em Destaque
        </h2>
        <p className="text-zinc-400 text-lg">
          Uma seleção de projetos de design de produto, sistemas de design e
          pesquisa de usabilidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
        {/* Item 1 - Croft Design System (Work) */}
        <BentoItem
          title="Croft - Design System"
          description="The Croft Design System was created to provide a cohesive and flexible system that could be used to build interfaces for various company solutions, ranging from complex dashboards for drilling monitoring to landing pages aimed at presenting new technologies."
          className="md:col-span-2 md:row-span-2"
          badge={{
            text: "Work",
            dotColor: "bg-[#db2777]",
            bgClass: "bg-[#451225] text-white",
          }}
        />

        {/* Item 2 - IFSolve Platform Case Study (Side Project) */}
        <BentoItem
          title="Case Study: Heuristic Evaluation of the IFSolve Platform"
          description="This case study presents an in-depth analysis of the IFSolve platform's interface through a heuristic evaluation, a technique widely used to identify usability issues."
          className="md:col-span-1 md:row-span-1"
          badge={{
            text: "Side Project",
            dotColor: "bg-[#ea580c]",
            bgClass: "bg-[#3f190a] text-white",
          }}
        />

        {/* Item 3 - User Research */}
        <BentoItem
          title="User Research"
          description="Decisões estratégicas fundamentadas em pesquisas com usuários, testes de usabilidade, análises de dados e mapeamento de jornadas."
          className="md:col-span-1 md:row-span-1"
          icon={<div className="text-7xl font-black">@</div>}
        />

        {/* Item 4 - Visual Design */}
        <BentoItem
          title="Visual Design"
          description="Interfaces refinadas e consistentes com alto rigor estético, foco em tipografia, contraste e micro-interações fluidas."
          className="md:col-span-1 md:row-span-1"
          icon={<div className="text-7xl font-black">#</div>}
        />

        {/* Item 5 - Design Ops */}
        <BentoItem
          title="Design Ops"
          description="Otimização da colaboração entre design e engenharia através de documentação impecável, tokens de design e bibliotecas organizadas."
          className="md:col-span-1 md:row-span-1"
          icon={<div className="text-7xl font-black">{"{}"}</div>}
        />
      </div>
    </section>
  );
};
