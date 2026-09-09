"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar, FloatingTOC } from "@/components";
import { useTranslations } from "next-intl";

export default function CroftCaseStudy() {
  const t = useTranslations("Croft");
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    { src: "/assets/croft/Colors.png", alt: t("sliderAlt.colors") },
    { src: "/assets/croft/Typography.png", alt: t("sliderAlt.typography") },
    { src: "/assets/croft/Spacing.png", alt: t("sliderAlt.spacing") },
    { src: "/assets/croft/Radius.png", alt: t("sliderAlt.radius") },
    { src: "/assets/croft/Elevation.png", alt: t("sliderAlt.elevation") },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const tocItems = [
    { id: "overview", title: t("toc.overview") },
    { id: "problema", title: t("toc.problem") },
    { id: "processo", title: t("toc.process") },
    { id: "decisoes", title: t("toc.decisions") },
    { id: "antes-depois", title: t("toc.beforeAfter") },
    { id: "impacto", title: t("toc.impact") }
  ];

  return (
    <main className="bg-stone-950 selection:bg-rose-500 min-h-screen font-sans text-stone-300 selection:text-white relative">
      <Navbar />
      <FloatingTOC items={tocItems} />

      {/* Main Article Content Container */}
      <article className="space-y-12 mx-auto px-6 pt-28 pb-20 max-w-6xl">

        {/* Article Header */}
        <header className="space-y-6">
          <div className="font-semibold text-rose-500 text-xs sm:text-sm tracking-wider">
            {t("meta")}
          </div>

          <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            {t("title")}
          </h1>

          <div className="text-stone-400 text-base sm:text-lg leading-relaxed space-y-2 bg-stone-900/40 p-6 rounded-xl border border-stone-800/50">
            <div><strong className="text-stone-300">{t("role")}</strong> {t("roleVal")}</div>
            <div><strong className="text-stone-300">{t("tools")}</strong> {t("toolsVal")}</div>
            <div><strong className="text-stone-300">{t("references")}</strong> {t("referencesVal")}</div>
            <div><strong className="text-stone-300">{t("collaboration")}</strong> {t("collaborationVal")}</div>
          </div>


        </header>

        {/* Hero Video */}
        <div className="bg-stone-900 rounded-2xl aspect-video overflow-hidden pointer-events-none flex items-center justify-center">
          <iframe 
            src="https://www.youtube.com/embed/1YIOsf6_l24?autoplay=1&loop=1&playlist=1YIOsf6_l24&controls=0&mute=1&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="w-full h-full scale-[1.4]"
          ></iframe>
        </div>

        {/* Section 1 */}
        <section id="overview" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("toc.overview")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("overviewText")}
          </p>
        </section>

        {/* Section 2 */}
        <section id="problema" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("toc.problem")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("problemText1")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div 
              className="bg-stone-900/40 rounded-md border border-stone-800 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setExpandedImage("/assets/croft/old_automud.png")}
            >
              <Image src="/assets/croft/old_automud.png" alt="Interface antiga Automud" width={800} height={450} className="w-full h-auto" />
            </div>
            <div 
              className="bg-stone-900/40 rounded-md border border-stone-800 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setExpandedImage("/assets/croft/old_gold.jpg")}
            >
              <Image src="/assets/croft/old_gold.jpg" alt="Interface antiga Gold" width={800} height={450} className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="processo" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("toc.process")}
          </h2>
          <div className="space-y-4 text-stone-300 text-base sm:text-lg leading-relaxed pt-2">
            <p>
              <strong className="text-white">{t("processText1")}</strong> {t("processDesc1")}
            </p>
            <p>
              <strong className="text-white">{t("processText2")}</strong> {t("processDesc2")}
            </p>
            <p>
              <strong className="text-white">{t("processText3")}</strong> {t("processDesc3")}
            </p>
            <p>
              <strong className="text-white">{t("processText4")}</strong> {t("processDesc4")}
            </p>
          </div>

          {/* Slider */}
          <div className="mt-8 relative group">
            <div 
              className="bg-stone-900/40 rounded-md border border-stone-800 overflow-hidden cursor-pointer aspect-video relative flex items-center justify-center"
              onClick={() => setExpandedImage(sliderImages[currentSlide].src)}
            >
              <Image 
                src={sliderImages[currentSlide].src} 
                alt={sliderImages[currentSlide].alt} 
                fill
                sizes="100vw"
                className="object-contain p-2 transition-transform hover:scale-[1.02]" 
              />
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-stone-950/80 hover:bg-stone-800 text-stone-300 p-2 rounded-full border border-stone-700/50 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-stone-950/80 hover:bg-stone-800 text-stone-300 p-2 rounded-full border border-stone-700/50 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {sliderImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? "w-6 bg-rose-500" : "w-2 bg-stone-700 hover:bg-stone-500"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <p className="text-center text-stone-500 text-sm mt-2">{sliderImages[currentSlide].alt}</p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="decisoes" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("toc.decisions")}
          </h2>
          <div className="space-y-4 text-stone-300 text-base sm:text-lg leading-relaxed pt-2">
            <div className="bg-stone-900/40 p-5 rounded-xl border border-stone-800/50">
              <h3 className="mb-2 font-semibold text-white text-lg">{t("decision1Title")}</h3>
              <p className="text-stone-400">{t("decision1Text")}</p>
            </div>
            <div className="bg-stone-900/40 p-5 rounded-xl border border-stone-800/50">
              <h3 className="mb-2 font-semibold text-white text-lg">{t("decision2Title")}</h3>
              <p className="text-stone-400">{t("decision2Text")}</p>
            </div>
            <div className="bg-stone-900/40 p-5 rounded-xl border border-stone-800/50">
              <h3 className="mb-2 font-semibold text-white text-lg">{t("decision3Title")}</h3>
              <p className="text-stone-400">{t("decision3Text")}</p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="antes-depois" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("toc.beforeAfter")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-stone-400 text-lg">{t("beforeTitle")}</h3>
              <div 
                className="bg-stone-900/40 rounded-md border border-stone-800 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setExpandedImage("/assets/croft/old_gold.jpg")}
              >
                <Image src="/assets/croft/old_gold.jpg" alt="Interface antiga" width={800} height={450} className="w-full h-auto" />
              </div>
              <p className="text-stone-500 text-sm">{t("beforeText")}</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-rose-500 text-lg">{t("afterTitle")}</h3>
              <div 
                className="bg-stone-900/40 rounded-md border border-stone-700 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setExpandedImage("/assets/croft/new_gold.jpg")}
              >
                <Image src="/assets/croft/new_gold.jpg" alt="Interface nova" width={800} height={450} className="w-full h-auto" />
              </div>
              <p className="text-stone-400 text-sm">{t("afterText")}</p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="impacto" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("toc.impact")}
          </h2>
          <ul className="space-y-3 text-stone-300 text-base sm:text-lg leading-relaxed list-disc list-inside pt-2">
            <li>{t("impact1")}</li>
            <li>{t("impact2")}</li>
            <li>{t("impact3")}</li>
            <li>{t("impact4")}</li>
          </ul>
        </section>

      </article>

      {/* Image Lightbox Overlay */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out backdrop-blur-sm transition-all"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative w-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={expandedImage} 
              alt="Expanded view" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </main>
  );
}
