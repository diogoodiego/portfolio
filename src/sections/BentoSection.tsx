"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ProjectHoverCard, type InfoItem } from "@/components";

// Decorative floating video cards scattered over the list (reference: event schedule layout)
const FLOATING = [
  { src: "/assets/croft-mockup.mp4", className: "top-[6%] right-[28%] w-40 md:w-56", delay: 0 },
  { src: "/assets/depth/preview.mp4", className: "top-[38%] right-[4%] w-36 md:w-48", delay: 1.2 },
  { src: "/assets/ifsolve/preview.mp4", className: "bottom-[2%] right-[20%] w-40 md:w-60", delay: 2.4 },
];

export const BentoSection = () => {
  const t = useTranslations("Bento");
  const tf = useTranslations("Footer");

  // Same items/previews as the footer list
  const PROJECTS: InfoItem[] = [
    { name: "Croft", meta: "24", href: "/croft", thumbnail: "/assets/croft-mockup.mp4", roles: [tf("projectRoles.productDesign"), tf("projectRoles.designSystem")], description: tf("projectDesc.croft") },
    { name: "Depth Track", meta: "24", href: "/depth-track", thumbnail: "/assets/depth/preview.mp4", roles: [tf("projectRoles.uxUiDesign"), tf("projectRoles.frontend")], description: tf("projectDesc.depth") },
    { name: "IFSolve", meta: "23", href: "/ifsolve", thumbnail: "/assets/ifsolve/preview.mp4", roles: [tf("projectRoles.uxResearch"), tf("projectRoles.usability")], description: tf("projectDesc.ifsolve") },
    { name: "Geowellex Education", meta: "22", href: "/geowellex", thumbnail: "/assets/geox-education/FireShot Capture 001 - Geowellex Education - [www.geowellex.com].png", roles: [tf("projectRoles.uiDesign"), tf("projectRoles.frontend")], description: tf("projectDesc.geowellex") },
    { name: "Diga Duvido", meta: "21", href: "/diga-duvido", thumbnail: "/assets/diga-duvido/home.webp", roles: [tf("projectRoles.productDesign")], description: tf("projectDesc.diga") },
  ];

  return (
    <section id="projects" className="flex flex-col bg-stone-950 p-6 md:p-8 md:px-16 lg:px-24 py-4 lg:pt-24 min-h-screen">
      <div className="flex md:flex-row flex-col flex-shrink-0 justify-between md:items-baseline gap-4 mb-8">
        <h2 className="font-bold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight">
          {t("title")}
        </h2>
        <p className="max-w-md text-stone-400 text-sm md:text-base md:text-right">
          {t("subtitle")}
        </p>
      </div>

      <div className="relative flex-1">
        <ul className="relative z-10 flex flex-col border-stone-800 border-t">
          {PROJECTS.map((item) => (
            <ProjectHoverCard key={item.href} item={item} size="lg" />
          ))}
        </ul>

        {FLOATING.map((card) => (
          <motion.div
            key={card.src}
            aria-hidden
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
            className={`hidden md:block absolute z-20 pointer-events-none shadow-2xl rounded-lg overflow-hidden aspect-[3/4] ${card.className}`}
          >
            <video src={card.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
