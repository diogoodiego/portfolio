"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import side from "../assets/side.png";
import { StoryCard, BentoCard, ProjectHoverCard } from "@/components";

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
}

// ==========================================
// Static Dataset Configuration
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
  { name: "Croft Design System", meta: "24", href: "/croft", thumbnail: "/assets/croft-mockup.mp4", roles: ["Product Design", "Design System"], description: "A scalable design system for enterprise products." },
  { name: "Depth Track", meta: "24", href: "/depth-track", thumbnail: "/assets/video.mp4", roles: ["UX/UI Design", "Frontend"], description: "Drilling monitoring platform." },
  { name: "IFSolve Platform", meta: "23", href: "/ifsolve", thumbnail: "/assets/ifsolve.mp4", roles: ["UX Research", "Usability"], description: "Platform for evaluating UX heuristics." },
  { name: "Geowellex Education", meta: "22", thumbnail: "/assets/geox-education/FireShot Capture 001 - Geowellex Education - [www.geowellex.com].png", roles: ["UI Design", "Frontend"], description: "Educational portal for the energy sector." },
  { name: "Diga Duvido", meta: "21", thumbnail: "/assets/diga-duvido/home.webp", roles: ["Product Design"], description: "Card game digital experience." },
];

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

const ResumeItemComponent = ({ institution, role, period }: ResumeItem) => (
  <div className="group flex items-start gap-4 py-1">
    <SparkleIcon />
    <div className="flex-1">
      <div className="flex justify-between items-baseline gap-4">
        <h5 className="font-bold text-white group-hover:text-[#f85c37] text-sm sm:text-base tracking-wide transition-colors duration-200">
          {institution}
        </h5>
        <span className="text-stone-500 group-hover:text-stone-400 text-xs transition-colors duration-200 shrink-0">
          {period}
        </span>
      </div>
      <p className="mt-1 text-stone-400 group-hover:text-stone-300 text-xs sm:text-sm leading-relaxed transition-colors duration-200">
        {role}
      </p>
    </div>
  </div>
);

const InfoList = ({ items }: { items: InfoItem[] }) => (
  <div className="flex flex-col gap-3">
    <ul className="flex flex-col gap-2.5">
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
  return (
    <footer
      id="contact"
      className="relative flex flex-col justify-center bg-stone-950 p-6 md:p-12 lg:p-16 py-16 w-full min-h-screen overflow-hidden animate-fade-in snap-start"
    >
      {/* Single Flat Bento Grid Container */}
      <div className="items-stretch gap-4 lg:gap-6 grid grid-cols-1 lg:grid-cols-8 mx-auto w-full">
        {/* Card 1: Editorial Bio/About Hero Card */}
        <div className="group relative flex flex-col justify-between lg:col-span-2 lg:row-span-3 bg-gradient-to-b from-[#a3060e] to-[#CB1019] shadow-2xl p-8 rounded-xl w-full min-h-[480px] lg:min-h-full overflow-hidden shrink-0">
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
            <p className="mb-2 font-regular text-md text-white/60 tracking-wider">
              About me
            </p>
            <p className="max-w-[360px] font-medium text-white text-base md:text-lg leading-snug">
              I&apos;m Diogo! A designer with over 5 years of experience, specializing
              in creating intuitive interfaces and visual solutions for the energy
              industry.
            </p>
          </div>
        </div>

        {/* Card 2: Experience */}
        <BentoCard className="lg:col-span-3" title="Experience">
          <div className="flex flex-col gap-4">
            {EXPERIENCE.map((item, idx) => (
              <ResumeItemComponent key={idx} {...item} />
            ))}
          </div>
        </BentoCard>

        {/* Card 3: Education */}
        <BentoCard className="lg:col-span-3" title="Education">
          <div className="flex flex-col gap-4">
            {EDUCATION.map((item, idx) => (
              <ResumeItemComponent key={idx} {...item} />
            ))}
          </div>
        </BentoCard>

        {/* Card 4: Projects */}
        <BentoCard className="lg:col-span-4" title="Projects">
          <InfoList items={PROJECTS} />
        </BentoCard>

        {/* Card 5: Stories Carousel */}
        <div className="lg:col-span-2 min-h-[300px]">
          <StoryCard />
        </div>

        {/* Card 6: Contacts & Action button */}
        <BentoCard className="flex lg:flex-row flex-col justify-between items-start lg:items-center gap-6 lg:col-span-6">
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-3 w-full lg:w-auto">
            {CONTACTS.map((contact, idx) => (
              <ContactItem key={idx} {...contact} />
            ))}
          </div>

          <a
            href="mailto:hello@dio.design"
            className="inline-flex relative justify-center items-center bg-gradient-to-r from-[#e23c14] to-[#f85c37] hover:shadow-[0_0_24px_rgba(248,92,55,0.4)] px-7 py-3.5 rounded-full font-bold text-white text-xs tracking-wider hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shrink-0"
          >
            Book a session
          </a>
        </BentoCard>
      </div>
    </footer>
  );
};
