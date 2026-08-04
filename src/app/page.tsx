"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import me from "../assets/me.png";
import { Navbar, Button, MusicPlayer } from "@/components";
import { BentoSection } from "@/sections/BentoSection";
import { FooterSection } from "@/sections/FooterSection";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const widgetVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.4,
    },
  },
};

export default function Home() {
  return (
    <main className="h-screen overflow-y-auto scroll-auto snap-mandatory snap-y scrollbar-thumb-white/20 scrollbar-thin">
      <Navbar />
      <div id="home" className="relative border-4 border-stone-950 sm:border-8 rounded-3xl sm:rounded-4xl w-full h-screen overflow-hidden snap-start">
        <video
          src="/assets/red_nebula2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="-z-3 absolute w-full h-full object-cover object-top"
        />
        <Image
          src={me}
          alt="myself"
          className="bottom-0 left-1/2 -z-1 absolute blur-[.5px] w-[90%] sm:w-[80%] object-cover -translate-x-1/2 mix-blend-darken"
        />

        {/* UI Components */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={widgetVariants}
          className="right-0 bottom-0 absolute flex flex-col justify-end gap-2"
        >
          {/* music player */}
          {/* <MusicPlayer /> */}
        </motion.div>

        <div className="-z-2 absolute bg-stone-950/10 w-full h-full" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="z-10 relative flex flex-col justify-end items-start gap-4 sm:gap-8 p-6 sm:p-12 px-6 sm:px-12 md:px-16 lg:px-24 pb-56 sm:pb-48 md:pb-12 w-full lg:w-1/2 xl:w-2/5 h-full"
        >
          <motion.h1
            variants={itemVariants}
            className="drop-shadow-lg max-w-4xl font-medium text-white text-3xl sm:text-4xl md:text-5xl text-start leading-tight tracking-tight"
          >
            Crafting digital products focused on utility, aesthetics, and precision
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="font-abeezee font-regular text-white/80 text-sm sm:text-base leading-relaxed"
          >
            Hi, I&apos;m Dio! I design intuitive interfaces, robust design systems,
            and high-fidelity visual solutions for complex industries and
            innovative startups.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a href="#projects">
              <Button size="lg">View Projects</Button>
            </a>
            <a href="#contact">
              <Button variant="secondary" size="lg">
                Get in Touch
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
      <BentoSection />
      <FooterSection />
    </main>
  );
}
