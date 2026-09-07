"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavItem } from "./NavItem";
import navbarImage from "@/assets/navbar_image.jpg";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export const Navbar: React.FC = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const changeLanguage = (newLocale: "en" | "pt") => {
    router.replace(pathname, { locale: newLocale });
    setIsLangOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="top-8 left-1/2 z-[1000] fixed flex flex-row justify-center items-start px-4 sm:px-8 md:px-16 lg:px-32 xl:px-72 w-full"
    >
      {/* Corpo Central da Navbar */}
      <div
        className={`flex flex-row items-center flex-1 justify-between rounded-full transition-all duration-200 ${isScrolled ? "bg-stone-950/60 border border-white/5 backdrop-blur-sm px-6 py-3" : ""
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

        <div className={`flex items-center p-3 pe-5 rounded-full ${isScrolled ? "bg-transparent p-0!" : "bg-stone-950/60"}`}>
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            <NavItem
              href="/"
              isActive={activeSection === "home"}
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
                  window.history.pushState(null, "", `/${locale}`);
                }
              }}
            >
              {t("home")}
            </NavItem>
            <NavItem
              href="/#projects"
              isActive={activeSection === "projects"}
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", `/${locale}#projects`);
                }
              }}
            >
              {t("projects")}
            </NavItem>
            <NavItem
              href="/#contact"
              isActive={activeSection === "contact"}
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", `/${locale}#contact`);
                }
              }}
            >
              {t("contact")}
            </NavItem>
          </div>

          <div className="relative flex items-center ml-2 sm:ml-4" ref={langDropdownRef}>
            <div className="group relative flex justify-center items-center">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex justify-center items-center shadow-sm rounded-full focus:outline-none ring-3 ring-white/40 hover:ring-white/60 focus:ring-white/60 w-[22px] h-[22px] overflow-hidden transition-all duration-300"
                aria-label={t("switchLanguage")}
              >
                <img
                  src={locale === "en" ? "https://flagcdn.com/us.svg" : "https://flagcdn.com/br.svg"}
                  alt={locale === "en" ? "US Flag" : "Brazil Flag"}
                  className="w-full h-full object-cover scale-[1.5]"
                />
              </button>

              <div className="top-full left-1/2 z-50 absolute bg-stone-800 opacity-0 group-hover:opacity-100 shadow-lg mt-3 px-2 py-1 border border-white/10 rounded-md text-white/90 text-xs whitespace-nowrap transition-opacity -translate-x-1/2 pointer-events-none">
                {t("switchLanguage")}
              </div>
            </div>

            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="top-full right-0 z-50 absolute flex flex-col gap-0.5 bg-stone-900/95 shadow-2xl backdrop-blur-md mt-3 p-1.5 border border-white/10 rounded-2xl min-w-[140px]"
              >
                <button
                  onClick={() => changeLanguage("en")}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${locale === "en" ? "bg-white/10 text-white font-medium" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                >
                  <div className="rounded-full ring-1 ring-white/20 w-5 h-5 overflow-hidden shrink-0">
                    <img src="https://flagcdn.com/us.svg" alt="English" className="w-full h-full object-cover scale-[1.5]" />
                  </div>
                  {t("english")}
                </button>
                <button
                  onClick={() => changeLanguage("pt")}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${locale === "pt" ? "bg-white/10 text-white font-medium" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                >
                  <div className="rounded-full ring-1 ring-white/20 w-5 h-5 overflow-hidden shrink-0">
                    <img src="https://flagcdn.com/br.svg" alt="Português" className="w-full h-full object-cover scale-[1.5]" />
                  </div>
                  {t("portuguese")}
                </button>
              </motion.div>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex justify-center items-center bg-white/5 hover:bg-white/10 ml-2 p-1.5 rounded-full w-8 h-8 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden top-full right-4 left-4 absolute flex flex-col gap-1 bg-stone-900/95 shadow-2xl backdrop-blur-xl mt-3 p-2 border border-white/10 rounded-2xl overflow-hidden origin-top"
          >
            <NavItem
              href="/"
              isActive={activeSection === "home"}
              className="py-3 w-full text-center"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
                  window.history.pushState(null, "", `/${locale}`);
                }
                closeMobileMenu();
              }}
            >
              {t("home")}
            </NavItem>
            <NavItem
              href="/#projects"
              isActive={activeSection === "projects"}
              className="py-3 w-full text-center"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", `/${locale}#projects`);
                }
                closeMobileMenu();
              }}
            >
              {t("projects")}
            </NavItem>
            <NavItem
              href="/#contact"
              isActive={activeSection === "contact"}
              className="py-3 w-full text-center"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", `/${locale}#contact`);
                }
                closeMobileMenu();
              }}
            >
              {t("contact")}
            </NavItem>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

