"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const nextStory = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  }, [stories.length]);

  const prevStory = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
  }, [stories.length]);

  // Handle progress animation loop
  useEffect(() => {
    if (isPaused) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = null;
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        setProgress((prevProgress) => {
          const nextVal = prevProgress + (delta / durationPerStory) * 100;
          if (nextVal >= 100) {
            nextStory();
            return 0;
          }
          return nextVal;
        });
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      lastTimeRef.current = null;
    };
  }, [isPaused, durationPerStory, nextStory]);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.35) {
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
      className={`group relative flex min-h-[300px] h-full w-full select-none flex-col justify-between overflow-hidden rounded-xl  bg-stone-900 shadow-xl transition-all duration-300 hover:border-white/20 cursor-pointer ${className}`}
    >
      {/* Background Image with Framer Motion crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStory.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
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
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/85 via-stone-950/20 to-stone-950/95 pointer-events-none" />

      {/* Top Header: Instagram Progress Bars + User Info */}
      <div className="z-10 flex flex-col gap-2.5 p-5">
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
              <div
                key={story.id}
                className="flex-1 bg-white/25 backdrop-blur-sm rounded-full h-1 overflow-hidden"
              >
                <div
                  className="bg-gradient-to-r from-white/90 to-white rounded-full h-full transition-all duration-75 ease-linear"
                  style={{ width: barWidth }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Indicators (Hover arrows) */}
      <div className="right-0 left-0 z-10 absolute inset-y-0 flex justify-between items-center opacity-0 group-hover:opacity-100 px-3 transition-opacity duration-200 pointer-events-none">
        <div className="flex justify-center items-center bg-stone-950/50 backdrop-blur-sm rounded-full w-7 h-7 text-white text-sm">
          ‹
        </div>
        <div className="flex justify-center items-center bg-stone-950/50 backdrop-blur-sm rounded-full w-7 h-7 text-white text-sm">
          ›
        </div>
      </div>
    </div>
  );
};
