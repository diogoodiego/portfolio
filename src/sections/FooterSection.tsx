"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import side from "../assets/side.png";
import { ChevronLeft, ChevronRight, ArrowUpRight, Copy } from "lucide-react";
import { toast } from "sonner";
import { StoryCard, BentoCard, ProjectHoverCard } from "@/components";
import dribbble from "@/assets/dribbble.png";
import linkedin from "@/assets/linkedin.svg";
import { useTranslations } from "next-intl";
// ==========================================
// Types & Data Contracts
// ==========================================

interface InfoItem {
  name: string;
  meta: string;
  href?: string;
  thumbnail?: string;
  description?: string;
  roles?: string[];
}

interface ContactInfo {
  label: string;
  action: string;
  value: string;
  href: string;
}

interface ResumeItem {
  institution: string;
  role: string;
  period: string;
  href?: string;
}

// ==========================================
// Static Dataset Configuration
// (Moved into FooterSection for translations)

// ==========================================
// Sub-Components
// ==========================================

const ContactItem = ({ label, action, value, href }: ContactInfo) => (
  <div>
    <h4 className="mb-2 font-bold text-[10px] text-stone-500 tracking-widest">
      {label}
    </h4>
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group block font-medium text-white hover:text-[#f85c37] text-xs transition-colors duration-200"
    >
      {action} &rarr;{" "}
      <span className="block mt-0.5 text-stone-400 group-hover:text-stone-300 transition-colors duration-200">
        {value}
      </span>
    </a>
  </div>
);

const SparkleIcon = () => (
  <svg
    className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e23c14" />
        <stop offset="100%" stopColor="#f85c37" />
      </linearGradient>
    </defs>
    <path
      d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z"
      fill="url(#sparkle-grad)"
    />
  </svg>
);

const ResumeItemComponent = ({ institution, role, period, href }: ResumeItem) => {
  const content = (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <h5 className="font-iceberg text-stone-200 group-hover:text-stone-50 text-xl tracking-wide transition-colors duration-200">
            {institution}
          </h5>
          <SparkleIcon />
        </div>
        <span className="text-stone-600 group-hover:text-stone-400 text-sm italic transition-colors duration-200 shrink-0">
          {period}
        </span>
      </div>
      <p className="text-stone-400 group-hover:text-stone-300 text-base leading-relaxed transition-colors duration-200">
        {role}
      </p>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-1 cursor-pointer">
        {content}
      </a>
    );
  }

  return (
    <div className="group flex items-center gap-4 py-1">
      {content}
    </div>
  );
};

const InfoList = ({ items }: { items: InfoItem[] }) => (
  <div className="flex flex-col gap-3">
    <ul className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <ProjectHoverCard key={idx} item={item} />
      ))}
    </ul>
  </div>
);

// ==========================================
// Main Section Component
// ==========================================

export const FooterSection = () => {
  const t = useTranslations("Footer");

  const EDUCATION: ResumeItem[] = [
    {
      institution: "IFRN",
      role: t("roles.techAnalysis"),
      period: t("periods.p21_25"),
      href: "https://portal.ifrn.edu.br/cursos/superiores/graduacao/tecnologia-em-analise-e-desenvolvimento-de-sistemas/",
    },
    {
      institution: "IFRN",
      role: t("roles.techWeb"),
      period: t("periods.p17_21"),
      href: "https://portal.ifrn.edu.br/cursos/tecnicos/tecnico-integrado/informatica-para-internet/",
    },
  ];

  const EXPERIENCE: ResumeItem[] = [
    {
      institution: "Geowellex",
      role: t("roles.uxuiDesigner"),
      period: t("periods.present"),
    },
    {
      institution: "Leme",
      role: t("roles.uiFrontend"),
      period: t("periods.p20_21"),
    },
    {
      institution: "Assembleia Smart",
      role: t("roles.uiFreelance"),
      period: t("periods.p19"),
    },
  ];

  const PROJECTS: InfoItem[] = [
    { name: "Croft Design System", meta: "24", href: "/croft", thumbnail: "/assets/croft-mockup.mp4", roles: [t("projectRoles.productDesign"), t("projectRoles.designSystem")], description: t("projectDesc.croft") },
    { name: "Depth Track", meta: "24", href: "/depth-track", thumbnail: "/assets/depth/preview.mp4", roles: [t("projectRoles.uxUiDesign"), t("projectRoles.frontend")], description: t("projectDesc.depth") },
    { name: "IFSolve Platform", meta: "23", href: "/ifsolve", thumbnail: "/assets/ifsolve/preview.mp4", roles: [t("projectRoles.uxResearch"), t("projectRoles.usability")], description: t("projectDesc.ifsolve") },
    { name: "Geowellex Education", meta: "22", href: "/geowellex", thumbnail: "/assets/geox-education/FireShot Capture 001 - Geowellex Education - [www.geowellex.com].png", roles: [t("projectRoles.uiDesign"), t("projectRoles.frontend")], description: t("projectDesc.geowellex") },
    { name: "Diga Duvido", meta: "21", href: "/diga-duvido", thumbnail: "/assets/diga-duvido/home.webp", roles: [t("projectRoles.productDesign")], description: t("projectDesc.diga") },
  ];

  return (
    <footer
      id="contact"
      className="relative flex flex-col justify-center bg-stone-950 p-6 lg:p-12 lg:p-16 py-16 w-full min-h-screen overflow-hidden animate-fade-in"
    >
      <div className="flex lg:flex-row flex-col gap-4 mb-4">
        {/* Left Column: Profile / About me Card */}
        <div className="group relative flex flex-col justify-between bg-gradient-to-b from-[#a3060e] to-[#CB1019] shadow-2xl p-8 rounded-xl w-full lg:w-[25%] lg:min-h-full aspect-[9/16] sm:aspect-video overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-stone-950/20 pointer-events-none mix-blend-overlay" />

          <Image
            src={side}
            alt="Diogo profile picture"
            className="-bottom-2 -left-2 z-3 absolute w-[75%] group-hover:w-[76%] scale-x-[-1] transition-all duration-300"
            priority
          />
          <Image
            src={side}
            alt="Diogo profile picture"
            className="-bottom-2 -left-2 z-2 absolute blur-[3px] w-[75%] group-hover:w-[76%] scale-x-[-1] transition-all duration-300"
            priority
          />
          <Image
            src={side}
            alt="Shadow"
            className="-bottom-2 -left-2 z-1 absolute opacity-20 group-hover:opacity-60 blur-lg w-80 scale-x-[-1] transition-all duration-300 mix-blend-plus-darker"
            priority
          />
          <div className="top-0 left-0 z-4 absolute bg-gradient-to-b from-80% from-orange-700/0 to-red-700/90 w-full h-full" />
          <div className="top-[50%] group-hover:top-[35%] left-1/2 z-0 absolute font-black text-[280px] rotate-6 group-hover:rotate-45 transition-all -translate-x-1/2 -translate-y-1/2 duration-300">
            DIO
          </div>

          <div className="z-10 relative mt-auto pt-48">

            <p className="max-w-[360px] font-medium text-white text-base lg:text-lg leading-snug">
              {t("aboutMeText")}
            </p>
          </div>
        </div>
        {/* Right Column: Experience, Education, Projects */}
        <div className="flex flex-col flex-1 gap-4">
          {/* Top Row: Experience and Education */}
          <div className="flex lg:flex-row flex-col flex-1 gap-8 bg-white/5 p-6 rounded-lg">
            <div className="flex flex-col flex-1 gap-2">
              {/* Experience Section */}
              <p className="font-medium text-stone-500 text-lg">{t("experience")}</p>
              <div className="flex flex-col gap-4">
                {EXPERIENCE.map((item, idx) => (
                  <ResumeItemComponent key={idx} {...item} />
                ))}
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              {/* Education Section */}
              <p className="font-medium text-stone-500 text-lg">{t("education")}</p>
              <div className="flex flex-col gap-4">
                {EDUCATION.map((item, idx) => (
                  <ResumeItemComponent key={idx} {...item} />
                ))}
              </div>
            </div>
          </div>
          {/* Middle Row: Projects and Extra Info */}
          <div className="flex lg:flex-row flex-col gap-4">
            {/* Projects Section */}
            <div className="flex flex-col flex-1 gap-2 bg-white/5 p-6 rounded-lg">
              <p className="font-medium text-stone-500 text-lg">{t("projects")}</p>
              <InfoList items={PROJECTS} />
            </div>
            {/* Extra Info Section */}
            <div className="flex flex-row bg-white/5 rounded-lg w-full lg:w-[40%] aspect-video">
              <StoryCard />
            </div>
          </div>
          {/* Bottom Row: Additional Rows */}
          <div className="flex lg:flex-row flex-col items-center gap-8 bg-white/5 p-6 rounded-lg overflow-hidden">
            <p className="lg:me-auto font-semibold text-stone-300 text-2xl text-center">{t("letsChat")}</p>
            <div className="flex gap-4">
              {/* Desktop Copy Email Button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText("diogo.sam.nascimento@gmail.com");
                  toast.success(t("emailCopied"), {
                    className: "!bg-green-900 !border-green-800 !text-green-100",
                  })
                }}
                className="group hidden sm:flex items-center gap-0 hover:gap-2 bg-white/5 px-5 py-2 rounded-full text-stone-400 hover:text-stone-50 text-lg cursor-pointer"
              >
                {t("copyEmail")}
                <div className="w-0 group-hover:w-5 overflow-hidden transition-all duration-200 ease-in-out">
                  <Copy className="w-5" />
                </div>
              </button>
              {/* Mobile Mailto Link */}
              <a
                href="mailto:diogo.sam.nascimento@gmail.com"
                className="group sm:hidden flex items-center gap-0 hover:gap-2 bg-white/5 px-5 py-2 rounded-full text-stone-400 hover:text-stone-50 text-lg cursor-pointer"
              >
                {t("sendEmail")}
                <div className="w-0 group-hover:w-5 overflow-hidden transition-all duration-200 ease-in-out">
                  <ArrowUpRight className="w-5" />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/diogo-santos-nascimento/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-0 hover:gap-2 bg-white/5 px-5 py-2 rounded-full text-stone-400 hover:text-stone-50 text-lg cursor-pointer"
              >
                Linkedin
                <div className="w-0 group-hover:w-5 overflow-hidden transition-all duration-200 ease-in-out">
                  <ArrowUpRight className="w-5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
