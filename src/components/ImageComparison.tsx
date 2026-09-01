"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageComparisonProps {
  leftImage: string;
  rightImage: string;
  leftAlt?: string;
  rightAlt?: string;
}

export function ImageComparison({
  leftImage,
  rightImage,
  leftAlt = "Left image",
  rightAlt = "Right image",
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="group relative shadow-2xl border border-white/5 rounded-2xl w-full aspect-[16/10] sm:aspect-video overflow-hidden select-none">
      {/* Right Image (Background) */}
      <Image
        src={rightImage}
        alt={rightAlt}
        fill
        className="object-cover object-left-top pointer-events-none"
      />

      {/* Left Image (Foreground) */}
      <div
        className="z-10 absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={leftImage}
          alt={leftAlt}
          fill
          className="object-cover object-left-top"
        />
      </div>

      {/* Slider Handle & Line */}
      <div
        className="z-20 absolute inset-y-0 flex justify-center items-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Line */}
        <div className="bg-zinc-400 w-1 h-full" />

        {/* Handle */}
        <div className="absolute flex justify-center items-center bg-white shadow-lg rounded-md w-8 h-8 transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-stone-800"
          >
            <polyline points="9 16 5 12 9 8"></polyline>
            <polyline points="15 8 19 12 15 16"></polyline>
          </svg>
        </div>
      </div>

      {/* Range Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="z-30 absolute inset-0 opacity-0 m-0 w-full h-full touch-none cursor-ew-resize"
      />
    </div>
  );
}
