"use client";

import React from "react";
import Image from "next/image";
import me from "../assets/me.png";

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
    <h4 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase font-mono mb-2">
      {label}
    </h4>
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="text-xs text-white hover:text-[#f85c37] font-medium transition-colors duration-200 block group"
    >
      {action} &rarr;{" "}
      <span className="font-mono block text-zinc-400 group-hover:text-zinc-300 mt-0.5 transition-colors duration-200">
        {value}
      </span>
    </a>
  </div>
);

const InfoList = ({ title, items }: { title: string; items: InfoItem[] }) => (
  <div className="flex flex-col gap-3">
    <h5 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase font-mono">
      {title}
    </h5>
    <ul className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="flex justify-between items-center text-xs group/item cursor-pointer"
        >
          <span className="text-zinc-400 group-hover/item:text-[#f85c37] transition-colors duration-200">
            {item.name}
          </span>
          <span className="text-[9px] sm:text-[10px] text-zinc-600 font-mono text-right group-hover/item:text-zinc-400 transition-colors duration-200">
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
      id="contato"
      className="relative bg-black h-screen w-full flex flex-col lg:flex-row p-12 gap-12 items-center justify-center snap-start overflow-hidden animate-fade-in"
    >
      {/* Left Side: Editorial Bio/About Hero Card */}
      <div className="group relative w-full lg:w-[380px] shrink-0 bg-gradient-to-b from-[#e23c14] to-[#f85c37] rounded-[24px] p-8 flex flex-col justify-between min-h-[460px] lg:min-h-[580px] shadow-2xl overflow-hidden">
        {/* Subtle noise/mesh background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20 mix-blend-overlay pointer-events-none" />

        {/* Top text - Huge bold header */}
        <div className="relative z-10">
          <h3 className="text-4xl font-extrabold tracking-tighter text-white select-none font-mono">
            DIO
          </h3>
        </div>

        {/* Profile cutout blend overlay */}
        <div className="absolute bottom-0 right-0 left-0 h-[65%] w-full flex items-end justify-center pointer-events-none overflow-hidden select-none">
          <Image
            src={me}
            alt="Diogo profile picture"
            className="w-[90%] h-full object-contain object-bottom translate-y-4 scale-110 mix-blend-luminosity opacity-90 transition-all duration-700 ease-out group-hover:scale-105 group-hover:translate-y-2 group-hover:opacity-100 group-hover:mix-blend-normal"
            priority
          />
          {/* Smooth transition gradient to bottom of the card */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f85c37] to-transparent" />
        </div>

        {/* Bottom Biography Area */}
        <div className="relative z-10 mt-auto pt-48">
          <p className="text-[11px] font-bold tracking-wider text-white/50 uppercase font-mono mb-2">
            Sobre mim
          </p>
          <p className="text-white text-base md:text-lg leading-snug font-medium max-w-[280px]">
            Olá, sou o{" "}
            <span className="underline decoration-white/30 underline-offset-4 font-bold">
              Diogo (Dio)
            </span>
            . Desenho interfaces intuitivas, sistemas de design robustos e
            soluções digitais de alta precisão.
          </p>
        </div>
      </div>

      {/* Right Side: Navigation Lists, Metadata & Action button */}
      <div className="flex-1 flex flex-col justify-between gap-12 lg:gap-8 pt-4 lg:pt-0">
        {/* Top Row: Quick Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8 border-b border-white/5">
          {CONTACTS.map((contact, idx) => (
            <ContactItem key={idx} {...contact} />
          ))}
        </div>

        {/* Middle Row: Double layer Grid columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 py-4">
          <InfoList title="Projects" items={PROJECTS} />
          <InfoList title="Stack" items={STACK} />
          <InfoList title="Channels" items={CHANNELS} />
          <InfoList title="Features" items={FEATURES} />
          <InfoList title="Clients" items={CLIENTS} />
        </div>

        {/* Bottom Section: Footer metadata & Pill Action button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/5">
          <div className="flex flex-col gap-1 text-[11px] text-zinc-600">
            <div className="font-mono">
              &copy; {new Date().getFullYear()} DIO. All rights reserved.
            </div>
            <div>
              Designed with pixel-precision. Built with Next.js, React and D3.
            </div>
          </div>

          {/* Glowing Orange Book Call Action Button */}
          <a
            href="mailto:hello@dio.design"
            className="relative inline-flex items-center justify-center px-7 py-3.5 bg-gradient-to-r from-[#e23c14] to-[#f85c37] rounded-full text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(248,92,55,0.4)] active:scale-[0.98]"
          >
            Book a session
          </a>
        </div>
      </div>
    </footer>
  );
};
