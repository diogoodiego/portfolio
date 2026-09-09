"use client";

import React from "react";
import Image from "next/image";
import { Navbar, FloatingTOC } from "@/components";
import { useTranslations } from "next-intl";

export default function GeowellexCaseStudy() {
  const t = useTranslations("Geowellex");

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
        <section className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("contentTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("contentText")}
          </p>
        </section>
      </article>
    </main>
  );
}
