"use client";

import React from "react";
import Link from "next/link";
import { NavItem } from "./NavItem";

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-[1000] flex flex-row items-start justify-center w-full px-72">
      {/* SVG Canto Esquerdo */}
      <div className="shrink-0 -mr-[1px] h-12">
        <svg width="64" height="48" viewBox="0 0 64 48" fill="none" className="w-16 h-12">
          <path d="M64 0 H0 C32 0 32 48 64 48 Z" fill="#09090b" />
        </svg>
      </div>

      {/* Corpo Central da Navbar */}
      <div className="flex-1 h-12 flex flex-row justify-between items-center bg-zinc-950 ps-5 pe-2 transition-all duration-400">
        <Link
          href="/"
          className="text-2xl font-bold text-white no-underline tracking-tight flex items-center gap-2"
        >
          <span>DIO</span>
        </Link>

        <div className="flex items-center gap-4 rounded-full">
          <NavItem href="#home" isActive>
            Home
          </NavItem>
          <NavItem href="#projetos">Projetos</NavItem>
          <NavItem href="#contato">Contato</NavItem>
        </div>
      </div>

      {/* SVG Canto Direito */}
      <div className="shrink-0 -ml-[1px] h-12">
        <svg width="64" height="48" viewBox="0 0 64 48" fill="none" className="w-16 h-12">
          <path d="M0 0 H64 C32 0 32 48 0 48 Z" fill="#09090b" />
        </svg>
      </div>
    </nav>
  );
};
