"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import me from "@/assets/me.png";

export interface StoryItem {
  id: number;
  image: string;
  tag: string;
  title: string;
  caption: string;
  timestamp: string;
}

const DEFAULT_STORIES: StoryItem[] = [
  {
    id: 1,
    image: "/assets/story1.jpg",
    tag: "Mobile UI",
    title: "Minimalist App Interface",
    caption: "Crafting fluid mobile experiences with vibrant dark mode accents.",
    timestamp: "2h ago",
  },
  {
    id: 2,
    image: "/assets/story2.jpg",
    tag: "Prototyping",
    title: "Design System & Workflows",
    caption: "Exploring 3D component systems and high-fidelity interactive flows.",
    timestamp: "5h ago",
  },
  {
    id: 3,
    image: "/assets/story3.jpg",
    tag: "Analytics",
    title: "Data Visualization UI",
    caption: "Designing real-time metric dashboards for complex fintech applications.",
    timestamp: "1d ago",
  },
];

interface StoryCardProps {
  stories?: StoryItem[];
  durationPerStory?: number; // duration in ms
  className?: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  stories = DEFAULT_STORIES,
  durationPerStory = 5000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextStory = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  }, [stories.length]);

  const prevStory = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  }, []);

  // Handle smooth progress animation loop
  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime: number | null = null;

    const step = (timestamp: number) => {
      if (lastTime !== null) {
        const delta = timestamp - lastTime;
        setProgress((prev) => {
          const next = prev + (delta / durationPerStory) * 100;
          if (next >= 100) {
            return 100;
          }
          return next;
        });
      }
      lastTime = timestamp;
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentIndex, isPaused, durationPerStory]);

  // Advance story when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      nextStory();
    }
  }, [progress, nextStory]);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.3) {
      prevStory();
    } else {
      nextStory();
    }
  };

  const activeStory = stories[currentIndex];

  return (
    <div
      onClick={handleCardClick}
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      className={`group relative flex min-h-[300px] h-full w-full select-none flex-col justify-between overflow-hidden rounded-xl bg-stone-900 shadow-xl transition-all duration-300 hover:border-white/20 cursor-pointer ${className}`}
    >
      {/* Background Image with Framer Motion crossfade */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeStory.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={activeStory.image}
            alt={activeStory.title}
            fill
            className="object-center object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays for UI Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/85 via-stone-950/20 to-stone-950/95 pointer-events-none z-[1]" />

      {/* Top Header: Progress Bars + User Info */}
      <div className="z-10 flex flex-col gap-2.5 p-4">
        {/* Progress Bars */}
        <div className="flex gap-1.5 w-full">
          {stories.map((story, index) => {
            let barWidth = "0%";
            if (index < currentIndex) {
              barWidth = "100%";
            } else if (index === currentIndex) {
              barWidth = `${progress}%`;
            }

            return (
              <button
                key={story.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                  setProgress(0);
                }}
                className="flex-1 bg-white/25 backdrop-blur-sm rounded-full h-1 overflow-hidden cursor-pointer hover:bg-white/40 transition-colors"
              >
                <div
                  className="bg-gradient-to-r from-white/90 to-white rounded-full h-full transition-all duration-75 ease-linear"
                  style={{ width: barWidth }}
                />
              </button>
            );
          })}
        </div>

        {/* User Info Header */}
        <div className="flex items-center gap-2.5 mt-1">
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/30 shrink-0 shadow-md">
            <Image src={me} alt="Diogo" fill className="object-cover" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white tracking-wide drop-shadow">
              Diogo
            </span>
            <span className="text-[10px] text-white/60 font-mono">
              • {activeStory.timestamp}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Content Info */}
      <div className="z-10 p-5 mt-auto flex flex-col gap-1.5 pointer-events-none">
        {activeStory.tag && (
          <span className="px-2 py-0.5 bg-[#f85c37] text-white font-mono text-[9px] uppercase tracking-wider font-semibold rounded-md shadow-sm self-start">
            {activeStory.tag}
          </span>
        )}
        <h4 className="text-base font-bold text-white leading-snug drop-shadow-md">
          {activeStory.title}
        </h4>
        <p className="text-xs text-stone-300 leading-relaxed line-clamp-2 drop-shadow">
          {activeStory.caption}
        </p>
      </div>

      {/* Explicit Navigation Controls */}
      <div className="absolute inset-y-0 left-0 right-0 z-20 flex justify-between items-center px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevStory();
          }}
          className="pointer-events-auto flex justify-center items-center bg-stone-950/60 hover:bg-stone-900/90 text-white rounded-full w-8 h-8 font-bold shadow-lg transition-transform active:scale-95 cursor-pointer backdrop-blur-md border border-white/10"
          aria-label="Previous story"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextStory();
          }}
          className="pointer-events-auto flex justify-center items-center bg-stone-950/60 hover:bg-stone-900/90 text-white rounded-full w-8 h-8 font-bold shadow-lg transition-transform active:scale-95 cursor-pointer backdrop-blur-md border border-white/10"
          aria-label="Next story"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

