"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar, FloatingTOC } from "@/components";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DigaDuvidoCaseStudy() {
  const t = useTranslations("DigaDuvido");
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/assets/diga-duvido/home.webp",
    "/assets/diga-duvido/login.webp",
    "/assets/diga-duvido/game.webp"
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="relative bg-stone-950 selection:bg-rose-500 min-h-screen font-sans text-stone-300 selection:text-white">
      <Navbar />

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
          </div>


        </header>

        {/* Section 1 */}
        <section className="space-y-6">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("contentTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("contentText")}
          </p>

          {/* Slider */}
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-md border border-stone-800 group bg-stone-900/40">
            {images.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out cursor-pointer ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                onClick={() => setExpandedImage(src)}
              >
                <Image
                  src={src}
                  alt={`Diga Duvido preview ${index + 1}`}
                  fill
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            ))}
            
            {/* Controls */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    index === currentIndex ? "bg-white w-4" : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
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
