"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

// Project Card Component with 1st frame preview, non-looping video on hover and link support
const ProjectCard = ({
  title,
  videoSrc = "/assets/croft-mockup.mp4",
  href,
  className = "",
}: {
  title: string;
  videoSrc?: string;
  href?: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      if (videoRef.current.ended) {
        videoRef.current.currentTime = 0;
      }
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const CardContent = (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden bg-stone-900/60 p-6 sm:p-8 flex flex-col justify-end h-full cursor-pointer transition-colors duration-300 ${className}`}
    >
      {/* Background Video (previews 1st frame, non-looping, stops on last frame) */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 pointer-events-none ${isHovered ? "scale-105" : "scale-100"
            }`}
        />
      )}

      {/* Dark Overlay for Text Readability */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-stone-950/20 to-black/0 transition-opacity duration-300 pointer-events-none ${isHovered ? "opacity-0" : "opacity-85"
          }`}
      />

      {/* Card Title */}
      <h3 className="z-10 relative font-medium text-white text-xl sm:text-3xl tracking-tight">
        {title}
      </h3>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full no-underline">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export const BentoSection = () => {
  return (
    <section id="projects" className="flex flex-col justify-between bg-stone-950 p-6 md:p-8 md:px-16 lg:px-24 py-4 lg:pt-24 min-h-screen">
      {/* Header: Headline top left, Subtitle top right per diagram */}
      <div className="flex md:flex-row flex-col flex-shrink-0 justify-between md:items-baseline gap-4 mb-8">
        <h2 className="font-bold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight">
          Featured Projects
        </h2>
        <p className="max-w-md text-stone-400 text-sm md:text-base md:text-right">
          A curated selection of product design, design systems, and usability research projects.
        </p>
      </div>

      {/* 3 Vertical Cards Grid */}
      <div className="flex-1 items-stretch gap-6 lg:gap-4 grid grid-cols-1 md:grid-cols-3 h-full min-h-0">
        <ProjectCard title="Croft" videoSrc="/assets/croft-mockup.mp4" href="/croft" />
        <ProjectCard title="Depth Track" videoSrc="/assets/depth/preview.mp4" href="/depth-track" />
        <ProjectCard title="IFSolve" videoSrc="/assets/ifsolve/preview.mp4" href="/ifsolve" />
      </div>
    </section>
  );
};




