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
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="top-0 left-1/2 z-[1000] fixed flex flex-row justify-center items-start px-4 sm:px-8 md:px-16 lg:px-32 xl:px-72 w-full"
    >
      {/* SVG Canto Esquerdo */}
      <div className="hidden sm:block -mr-[1px] h-12 shrink-0">
        <svg width="64" height="48" viewBox="0 0 64 48" fill="none" className="w-16 h-12">
          <path d="M64 0 H0 C32 0 32 48 64 48 Z" fill="#0c0a09" />
        </svg>
      </div>

      {/* Corpo Central da Navbar */}
      <div className="flex flex-row flex-1 justify-between items-center bg-stone-950 px-5 pe-5 sm:pe-2 sm:rounded-none rounded-b-xl h-12 transition-all duration-400">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-white text-xl sm:text-2xl no-underline tracking-tight"
        >
          <span>DIO</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4 rounded-full h-12">
          <NavItem href="#home" isActive>
            Home
          </NavItem>
          <NavItem href="#projects">Projects</NavItem>
          <NavItem href="#contact">Contact</NavItem>
        </div>
      </div>

      {/* SVG Canto Direito */}
      <div className="hidden sm:block -ml-[1px] h-12 shrink-0">
        <svg width="64" height="48" viewBox="0 0 64 48" fill="none" className="w-16 h-12">
          <path d="M0 0 H64 C32 0 32 48 0 48 Z" fill="#0c0a09" />
        </svg>
      </div>
    </motion.nav>
  );
};
