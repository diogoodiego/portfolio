"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar, FloatingTOC } from "@/components";
import { useTranslations } from "next-intl";

export default function DepthTrackCaseStudy() {
  const t = useTranslations("DepthTrack");
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const tocItems = [
    { id: "contexto", title: t("toc.context") },
    { id: "problema", title: t("toc.problem") },
    { id: "prototipo", title: t("toc.prototype") },
    { id: "estrutura", title: t("toc.structure") },
    { id: "momento", title: t("toc.missingMoment") },
    { id: "resultado", title: t("toc.result") },
    { id: "aprendizado", title: t("toc.learnings") }
  ];

  return (
    <main className="relative bg-stone-950 selection:bg-rose-500 min-h-screen font-sans text-stone-300 selection:text-white">
      <Navbar />
      <FloatingTOC items={tocItems} />

      {/* Main Article Content Container */}
      <article className="space-y-12 mx-auto px-6 pt-28 pb-20 max-w-6xl">
        {/* Article Header */}
        <header className="space-y-6">
          <div className="font-semibold text-rose-500 text-xs sm:text-sm tracking-wider">
            {t("meta")}
          </div>

          <h1 className="font-bold text-white text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
            {t("title")}
          </h1>

          <p className="font-medium text-stone-300 text-xl sm:text-2xl leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="space-y-2 bg-stone-900/40 p-6 border border-stone-800/50 rounded-xl text-stone-400 text-base sm:text-lg leading-relaxed">
            <div><strong className="text-stone-300">{t("role")}</strong> {t("roleVal")}</div>
            <div><strong className="text-stone-300">{t("product")}</strong> {t("productVal")}</div>
            <div><strong className="text-stone-300">{t("users")}</strong> {t("usersVal")}</div>
          </div>


        </header>

        {/* Section 1 */}
        <section id="contexto" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("contextTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("contextText")}
          </p>

          <div
            className="bg-stone-900/40 mt-6 border border-stone-800 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => setExpandedImage("/assets/depth/old_version.png")}
          >
            <Image src="/assets/depth/old_version.png" alt="Dashboard completo" width={1200} height={675} className="w-full h-auto" />
          </div>
        </section>

        {/* Section 2 */}
        <section id="problema" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("problemTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("problemText1")}
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("problemText2")}
          </p>

          <div
            className="bg-stone-900/40 mt-6 border border-stone-800 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => setExpandedImage("/assets/depth/old_track.png")}
          >
            <Image src="/assets/depth/old_track.png" alt="Componente antigo" width={1200} height={675} className="w-full h-auto object-contain aspect-video" />
          </div>

          <blockquote className="mt-6 py-1 pl-4 border-rose-500 border-l-4 text-stone-400 text-lg sm:text-xl italic">
            {t("quote")}
            <footer className="mt-2 text-stone-500 text-base">{t("quoteAuthor")}</footer>
          </blockquote>
        </section>

        {/* Section 3 */}
        <section id="prototipo" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("prototypeTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("prototypeText")}
          </p>

          <div
            className="bg-stone-900/40 mt-6 border border-stone-800 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => setExpandedImage("/assets/depth/prototipo1.png")}
          >
            <Image src="/assets/depth/prototipo1.png" alt="Protótipo inicial no Figma" width={1200} height={675} className="w-full h-auto object-contain aspect-video" />
          </div>
        </section>

        {/* Section 4 */}
        <section id="estrutura" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("structureTitle")}
          </h2>
          <div className="space-y-4 pt-2 text-stone-300 text-base sm:text-lg leading-relaxed">
            <p><strong className="text-white">{t("structureItem1")}</strong> {t("structureDesc1")}</p>
            <p><strong className="text-white">{t("structureItem2")}</strong> {t("structureDesc2")}</p>
            <p><strong className="text-white">{t("structureItem3")}</strong> {t("structureDesc3")}</p>
          </div>

          <div
            className="bg-stone-900/40 mt-6 border border-stone-800 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => setExpandedImage("/assets/depth/protipo2.png")}
          >
            <Image src="/assets/depth/protipo2.png" alt="As 3 colunas lado a lado" width={1200} height={675} className="w-full h-auto object-cover aspect-video" />
          </div>
        </section>

        {/* Section 5 */}
        <section id="momento" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("missingTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("missingText")}
          </p>

          <div
            className="bg-stone-900/40 mt-6 border border-stone-800 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => setExpandedImage("/assets/depth/legend.png")}
          >
            <Image src="/assets/depth/legend.png" alt="Legenda flutuante em ação" width={1200} height={675} className="w-full h-auto object-cover aspect-video" />
          </div>
        </section>

        {/* Section 6 */}
        <section id="resultado" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("resultTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("resultText")}
          </p>

          <div className="relative flex justify-center items-center bg-stone-900/40 mt-6 border border-stone-800 rounded-md aspect-video overflow-hidden">
            <video
              src="/assets/depth/final.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-fit"
            />
          </div>

          <div className="relative flex justify-center items-center bg-stone-900/40 mt-6 border border-stone-800 rounded-md aspect-video overflow-hidden">
            <video
              src="/assets/depth/stratvision.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-fit"
            />
          </div>
        </section>

        {/* Section 7 */}
        <section id="aprendizado" className="space-y-4 pt-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("learningsTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("learningsText")}
          </p>
        </section>

      </article>

      {/* Image Lightbox Overlay */}
      {expandedImage && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/90 backdrop-blur-sm p-4 sm:p-8 transition-all cursor-zoom-out"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative flex justify-center items-center w-full max-w-7xl max-h-[90vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={expandedImage}
              alt="Expanded view"
              className="shadow-2xl rounded-lg max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
