"use client";

import React from "react";
import Link from "next/link";
import { NavItem } from "./NavItem";

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-full px-72">
      <div className="w-full flex flex-row justify-between items-center bg-white/5 border border-white/10 rounded-full ps-5 pe-2 py-2 backdrop-blur-[32px]  transition-all duration-400">
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
    </nav>
  );
};
