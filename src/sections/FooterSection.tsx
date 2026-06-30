"use client";

import React from "react";
import Image from "next/image";
import me from "../assets/me.png";
import side from "../assets/side.png";

// ==========================================
// Types & Data Contracts
// ==========================================

interface InfoItem {
  name: string;
  meta: string;
}

interface ContactInfo {
  label: string;
  action: string;
  value: string;
  href: string;
}

// ==========================================
// Static Dataset Configuration (Optimized)
// ==========================================

const CONTACTS: ContactInfo[] = [
  {
    label: "Got a question?",
    action: "Get in touch",
    value: "hello@dio.design",
    href: "mailto:hello@dio.design",
  },
  {
    label: "Stay in the loop",
    action: "Subscribe",
    value: "news@dio.design",
    href: "mailto:newsletter@dio.design",
  },
  {
    label: "I'm on socials",
    action: "Connect on LinkedIn",
    value: "linkedin.com/in/dio",
    href: "https://linkedin.com",
  },
];

interface ResumeItem {
  institution: string;
  role: string;
  period: string;
}

const EDUCATION: ResumeItem[] = [
  {
    institution: "IFRN",
    role: "Technologist in Software Analysis and Development",
    period: "2021-2025",
  },
  {
    institution: "IFRN",
    role: "Web Development Technician",
    period: "2017-2021",
  },
];

const EXPERIENCE: ResumeItem[] = [
  {
    institution: "Geowellex",
    role: "UX/UI Designer",
    period: "Present",
  },
  {
    institution: "Leme",
    role: "UI Designer and Front-end Developer",
    period: "2020-2021",
  },
  {
    institution: "Assembleia Smart",
    role: "Ui Designer Freelancer",
    period: "2019",
  },
];

const PROJECTS: InfoItem[] = [
  { name: "Croft Design System", meta: "24" },
  { name: "IFSolve Platform", meta: "23" },
  { name: "Petrobras ROP Console", meta: "24" },
  { name: "StreamTV Streaming", meta: "23" },
  { name: "Vortx Fintech App", meta: "24" },
];

const STACK: InfoItem[] = [
  { name: "Figma & Design Tokens", meta: "UI/UX Design" },
  { name: "Prototyping & Motion", meta: "Framer / Principle" },
  { name: "Design Systems", meta: "Design Ops" },
  { name: "Design Engineering", meta: "Next.js / React" },
  { name: "Data Visualization", meta: "D3.js / SVG" },
  { name: "User Research", meta: "Maze / Hotjar" },
];

const CHANNELS: InfoItem[] = [
  { name: "LinkedIn", meta: "Professional" },
  { name: "Bento.me", meta: "Link-in-bio" },
  { name: "Behance", meta: "Case Studies" },
  { name: "Dribbble", meta: "UI Interactions" },
  { name: "Read.cv", meta: "Resumé" },
];

const FEATURES: InfoItem[] = [
  { name: "Figma Config", meta: "24" },
  { name: "Awwwards SOTD", meta: "24" },
  { name: "CSS Design Awards", meta: "24" },
  { name: "UX Collective", meta: "23" },
  { name: "Adobe Design Arena", meta: "23" },
];

const CLIENTS: InfoItem[] = [
  { name: "Petrobras", meta: "Energy Sector" },
  { name: "IFSolve", meta: "EdTech Startup" },
  { name: "Croft Technology", meta: "Deep Tech" },
  { name: "Vortx", meta: "Fintech Industry" },
  { name: "StreamTV", meta: "Entertainment" },
];

// ==========================================
// Sub-Components
// ==========================================

const ContactItem = ({ label, action, value, href }: ContactInfo) => (
  <div>
    <h4 className="mb-2 font-mono font-bold text-[10px] text-zinc-500 uppercase tracking-widest">
      {label}
    </h4>
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group block font-medium text-white hover:text-[#f85c37] text-xs transition-colors duration-200"
    >
      {action} &rarr;{" "}
      <span className="block mt-0.5 font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200">
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

const ResumeItemComponent = ({ institution, role, period }: ResumeItem) => (
  <div className="group flex items-start gap-4 py-1">
    <SparkleIcon />
    <div className="flex-1">
      <div className="flex justify-between items-baseline gap-4">
        <h5 className="font-bold text-white group-hover:text-[#f85c37] text-sm sm:text-base tracking-wide transition-colors duration-200">
          {institution}
        </h5>
        <span className="font-mono text-zinc-500 group-hover:text-zinc-400 text-xs transition-colors duration-200 shrink-0">
          {period}
        </span>
      </div>
      <p className="mt-1 text-zinc-400 group-hover:text-zinc-300 text-xs sm:text-sm leading-relaxed transition-colors duration-200">
        {role}
      </p>
    </div>
  </div>
);

const InfoList = ({ title, items }: { title: string; items: InfoItem[] }) => (
  <div className="flex flex-col gap-3">
    <h5 className="font-mono font-bold text-[10px] text-zinc-500 uppercase tracking-widest">
      {title}
    </h5>
    <ul className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="group/item flex justify-between items-center text-xs cursor-pointer"
        >
          <span className="text-zinc-400 group-hover/item:text-[#f85c37] transition-colors duration-200">
            {item.name}
          </span>
          <span className="font-mono text-[9px] text-zinc-600 sm:text-[10px] group-hover/item:text-zinc-400 text-right transition-colors duration-200">
            {item.meta.match(/^\d+$/) ? `'${item.meta}` : item.meta}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

// ==========================================
// Main Section Component
// ==========================================

export const FooterSection = () => {
  return (
    <footer
      id="contact"
      className="relative flex lg:flex-row flex-col justify-center items-center gap-8 bg-stone-950 p-24 w-full min-h-screen overflow-hidden animate-fade-in snap-start"
    >
      {/* Left Side: Editorial Bio/About Hero Card */}
      <div className="group relative flex flex-col justify-between lg:self-stretch bg-gradient-to-b from-[#a3060e] to-[#CB1019] shadow-2xl p-8 rounded-[24px] overflow-hidden shrink-0">
        {/* Subtle noise/mesh background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-stone-950/20 pointer-events-none mix-blend-overlay" />

        {/* Profile cutout blend overlay */}
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
        <div className="top-0 left-0 z-4 absolute bg-gradient-to-b from-80% from-orange-700/0 to-red-700/90 w-full h-full"></div>
        <div className="top-[50%] group-hover:top-[35%] left-1/2 z-0 absolute font-black text-[280px] rotate-6 group-hover:rotate-45 transition-all -translate-x-1/2 -translate-y-1/2 duration-300">
          DIO
        </div>

        {/* Bottom Biography Area */}
        <div className="z-10 relative mt-auto pt-48">
          <p className="mb-2 font-regular text-md text-white/60 uppercase tracking-wider">
            About me
          </p>
          <p className="max-w-[360px] font-medium text-white text-base md:text-lg leading-snug">
            I'm Diogo! A designer with over 5 years of experience, specializing
            in creating intuitive interfaces and visual solutions for the energy
            industry.
          </p>
        </div>
      </div>

      {/* Right Side: Navigation Lists, Metadata & Action button */}
      <div className="flex flex-col justify-between gap-8 w-full">
        {/* Middle Row: About Me + Education & Experience Layout and Navigation Info Lists */}
        <div className="gap-8 grid grid-cols-1 xl:grid-cols-5 py-2">
          {/* Left Part (Col 1-3): About Me + Education & Experience */}
          <div className="flex flex-col gap-6 xl:col-span-3">
            <div className="relative gap-6 grid grid-cols-1 sm:grid-cols-2 pt-4">
              {/* Education */}
              <div className="flex flex-col gap-4">
                <h4 className="font-mono font-bold text-zinc-500 text-xs uppercase tracking-widest">
                  Education
                </h4>
                <div className="flex flex-col gap-4">
                  {EDUCATION.map((item, idx) => (
                    <ResumeItemComponent key={idx} {...item} />
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="flex flex-col gap-4 sm:pl-6 sm:border-white/5 sm:border-l">
                <h4 className="font-mono font-bold text-zinc-500 text-xs uppercase tracking-widest">
                  Experience
                </h4>
                <div className="flex flex-col gap-4">
                  {EXPERIENCE.map((item, idx) => (
                    <ResumeItemComponent key={idx} {...item} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Part (Col 4-5): Original Navigation Info Lists (Compact 2-column layout) */}
          <div className="gap-x-6 gap-y-8 grid grid-cols-2 xl:col-span-2 xl:pl-8 xl:border-white/5 xl:border-l">
            <InfoList title="Projects" items={PROJECTS} />
            <InfoList title="Stack" items={STACK} />
            <InfoList title="Channels" items={CHANNELS} />
            <InfoList title="Features" items={FEATURES} />
            <div className="col-span-2">
              <InfoList title="Clients" items={CLIENTS} />
            </div>
          </div>
        </div>

        {/* Bottom Section: Footer metadata & Pill Action button */}
        <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-6 pt-6 border-white/5 border-t">
          {CONTACTS.map((contact, idx) => (
            <ContactItem key={idx} {...contact} />
          ))}

          {/* Glowing Orange Book Call Action Button */}
          <a
            href="mailto:hello@dio.design"
            className="inline-flex relative justify-center items-center bg-gradient-to-r from-[#e23c14] to-[#f85c37] hover:shadow-[0_0_24px_rgba(248,92,55,0.4)] px-7 py-3.5 rounded-full font-bold text-white text-xs uppercase tracking-wider hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            Book a session
          </a>
        </div>
      </div>
    </footer>
  );
};
