"use client";

import React from "react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = "",
  title,
}) => {
  return (
    <div
      className={`flex flex-col bg-white/5 shadow-xl backdrop-blur-md p-6 md:p-8 rounded-xl transition-all duration-300 ${className}`}
    >
      {title && (
        <h4 className="mb-4 font-mono font-bold text-stone-500 text-xs tracking-widest">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
};
