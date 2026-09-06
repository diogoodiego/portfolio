"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavItem } from "./NavItem";
import navbarImage from "@/assets/navbar_image.jpg";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const mainElement = document.getElementById("main-scroll");

    const checkActiveSection = () => {
      if (pathname !== "/") {
        setActiveSection("");
        return;
      }

      const sections = ["home", "projects", "contact"];
      let found = false;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(id);
            found = true;
            break;
          }
        }
      }
      if (!found && mainElement && mainElement.scrollTop < 100) {
        setActiveSection("home");
      }
    };

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsScrolled(target.scrollTop > 20);
      checkActiveSection();
    };

    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
      checkActiveSection();
      return () => mainElement.removeEventListener("scroll", handleScroll);
    } else {
      const handleWindowScroll = () => {
        setIsScrolled(window.scrollY > 20);
        checkActiveSection();
      };
      window.addEventListener("scroll", handleWindowScroll);
      checkActiveSection();
      return () => window.removeEventListener("scroll", handleWindowScroll);
    }
  }, [pathname]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="top-8 left-1/2 z-[1000] fixed flex flex-row justify-center items-start px-4 sm:px-8 md:px-16 lg:px-32 xl:px-72 w-full"
    >
      {/* Corpo Central da Navbar */}
      <div
        className={`flex flex-row items-center flex-1 justify-between rounded-full transition-all duration-200 ${isScrolled ? "bg-stone-950/60 backdrop-blur-sm px-6 py-3" : ""
          }`}
      >
        <Link
          href="/"
          className={`flex group relative items-center gap-2 bg-stone-950/60 p-3 pe-6 rounded-full font-bold text-white text-xl sm:text-2xl no-underline tracking-tight ${isScrolled ? "!p-0 bg-transparent" : ""}`}
        >
          <Image src={navbarImage} alt="diogoodiego" className="rounded-full w-8 h-8"></Image>
          <span>DIO</span>
          <span className="group-hover:left-[-18px] z-[-10] group-hover:z-[100] absolute w-4 h-4 text-base group-hover:-rotate-45 transition-all animate-hang duration-200">🤙</span>
        </Link>

        <div className={`flex items-center gap-3 sm:gap-4 p-3 rounded-full ${isScrolled ? "bg-transparent p-0!" : "bg-stone-950/60"}`}>
          <NavItem
            href="/"
            isActive={activeSection === "home"}
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
              }
            }}
          >
            Home
          </NavItem>
          <NavItem
            href="/#projects"
            isActive={activeSection === "projects"}
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "/#projects");
              }
            }}
          >
            Projects
          </NavItem>
          <NavItem
            href="/#contact"
            isActive={activeSection === "contact"}
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "/#contact");
              }
            }}
          >
            Contact
          </NavItem>
        </div>
      </div>
    </motion.nav>
  );
};
