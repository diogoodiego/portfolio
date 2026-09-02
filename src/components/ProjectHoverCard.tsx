"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export interface InfoItem {
  name: string;
  meta: string;
  href?: string;
  thumbnail?: string;
  description?: string;
  roles?: string[];
}

export const ProjectHoverCard = ({ item }: { item: InfoItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const itemContent = (
    <>
      <span className="font-iceberg text-stone-400 group-hover/item:text-stone-50 text-2xl transition-colors duration-200">
        {item.name}
      </span>
      <span className="text-stone-600 group-hover/item:text-stone-50 text-sm text-right italic transition-colors duration-200">
        {item.meta.match(/^\d+$/) ? `${item.meta}` : item.meta}
      </span>
    </>
  );

  const hoverCardContent = (
    <AnimatePresence>
      {isHovered && item.thumbnail && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="z-50 fixed pointer-events-none"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y + 20,
          }}
        >
          <div className="bg-black shadow-2xl p-2 rounded-xl w-64 md:w-80 overflow-hidden">
            <div className="relative rounded-lg w-full aspect-video overflow-hidden">
              {item.thumbnail.endsWith(".mp4") ? (
                <video
                  src={item.thumbnail}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-3">
              <h4 className="font-bold text-white text-sm">{item.name}</h4>
              {item.description && (
                <p className="mt-1 text-stone-400 text-xs line-clamp-2">
                  {item.description}
                </p>
              )}
              {item.roles && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.roles.map((role, i) => (
                    <span
                      key={i}
                      className="bg-stone-800 px-2 py-0.5 rounded text-[9px] text-stone-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <li
        className="group/item flex justify-between items-center text-xs cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {item.href ? (
          <Link href={item.href} className="flex justify-between w-full no-underline">
            {itemContent}
          </Link>
        ) : (
          <div className="flex justify-between w-full">{itemContent}</div>
        )}
      </li>

      {/* Render the hover card inside a portal to avoid z-index and clipping issues */}
      {typeof document !== "undefined"
        ? createPortal(hoverCardContent, document.body)
        : null}
    </>
  );
};
