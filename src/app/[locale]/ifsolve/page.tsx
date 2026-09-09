"use client";

import React from "react";
import Image from "next/image";
import { Navbar, FloatingTOC, ImageComparison } from "@/components";
import { useTranslations } from "next-intl";

export default function IFSolveCaseStudy() {
  const t = useTranslations("IfSolve");

  const tocItems = [
    { id: "ponto-de-partida", title: t("toc.start") },
    { id: "desafio", title: t("toc.challenge") },
    { id: "como-trabalhei", title: t("toc.process") },
    { id: "achados", title: t("toc.findings") },
    { id: "o-que-levo", title: t("toc.takeaways") }
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


        </header>

        {/* Hero Video */}
        <div className="bg-stone-900 shadow-2xl border border-white/5 rounded-2xl aspect-video overflow-hidden">
          <video
            src="/assets/ifsolve_home.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Section 1 */}
        <section id="ponto-de-partida" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("startTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("startText1")}
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("startText2")}
          </p>
        </section>

        {/* Section 2 */}
        <section id="desafio" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("challengeTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("challengeText1")}
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t("challengeText2") }} />
        </section>

        {/* Section 3 */}
        <section id="como-trabalhei" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("processTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("processDesc")}
          </p>
          <div className="space-y-4 pt-2 text-stone-300 text-base sm:text-lg leading-relaxed">
            <p><strong className="text-white">{t("processItem1")}</strong> {t("processDesc1")}</p>
            <p><strong className="text-white">{t("processItem2")}</strong> {t("processDesc2")}</p>
            <p><strong className="text-white">{t("processItem3")}</strong> {t("processDesc3")}</p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="achados" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("findingsTitle")}
          </h2>

          <div className="pt-4 pb-6">
            <ImageComparison
              leftImage="/assets/ifsolve/home_old.webp"
              rightImage="/assets/ifsolve/home.png"
              leftAlt={t("findingsAltNew")}
              rightAlt={t("findingsAltOld")}
            />
          </div>

          <ul className="space-y-4 pt-2 text-stone-300 marker:text-rose-500 text-base sm:text-lg leading-relaxed list-disc list-inside">
            <li><strong className="text-white">{t("findingsItem1Title")}</strong> {t("findingsItem1Desc")}</li>
            <li><strong className="text-white">{t("findingsItem2Title")}</strong> {t("findingsItem2Desc")}</li>
            <li><strong className="text-white">{t("findingsItem3Title")}</strong> {t("findingsItem3Desc")}</li>
            <li><strong className="text-white">{t("findingsItem4Title")}</strong> {t("findingsItem4Desc")}</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section id="o-que-levo" className="space-y-4">
          <h2 className="font-bold text-white text-2xl sm:text-3xl tracking-tight">
            {t("takeawaysTitle")}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("takeawaysText1")}
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("takeawaysText2")}
          </p>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t("takeawaysText3")}
          </p>

          <div className="pt-4 pb-6">
            <div className="bg-stone-900 shadow-2xl border border-white/5 rounded-2xl aspect-video overflow-hidden">
              <video
                src="/assets/ifsolve/final.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

      </article>
    </main>
  );
}
