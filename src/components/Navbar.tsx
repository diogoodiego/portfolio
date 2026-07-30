"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavItem } from "./NavItem";

export const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="fixed top-0 left-1/2 z-[1000] flex flex-row items-start justify-center w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-72"
    >
      {/* SVG Canto Esquerdo */}
      <div className="shrink-0 -mr-[1px] h-12 hidden sm:block">
        <svg width="64" height="48" viewBox="0 0 64 48" fill="none" className="w-16 h-12">
          <path d="M64 0 H0 C32 0 32 48 64 48 Z" fill="#09090b" />
        </svg>
      </div>

      {/* Corpo Central da Navbar */}
      <div className="flex-1 h-12 flex flex-row justify-between items-center bg-zinc-950 ps-5 pe-5 sm:pe-2 rounded-b-xl sm:rounded-none transition-all duration-400">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-white no-underline tracking-tight flex items-center gap-2"
        >
          <span>DIO</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4 rounded-full">
          <NavItem href="#home" isActive>
            Home
          </NavItem>
          <NavItem href="#projects">Projects</NavItem>
          <NavItem href="#contact">Contact</NavItem>
        </div>
      </div>

      {/* SVG Canto Direito */}
      <div className="shrink-0 -ml-[1px] h-12 hidden sm:block">
        <svg width="64" height="48" viewBox="0 0 64 48" fill="none" className="w-16 h-12">
          <path d="M0 0 H64 C32 0 32 48 0 48 Z" fill="#09090b" />
        </svg>
      </div>
    </motion.nav>
  );
};
