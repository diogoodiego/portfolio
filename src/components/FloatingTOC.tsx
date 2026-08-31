"use client";

import React, { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  title: string;
}

interface FloatingTOCProps {
  items: TOCItem[];
}

export const FloatingTOC: React.FC<FloatingTOCProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId = '';
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Threshold to activate section
          if (rect.top <= 150) {
            currentActiveId = item.id;
          }
        }
      }

      // If we are at the very top, activate the first one or none
      if (window.scrollY < 100 && items.length > 0) {
        currentActiveId = items[0].id;
      }

      if (currentActiveId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for any sticky headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block top-1/3 right-4 z-50 fixed bg-stone-900/90 shadow-xl backdrop-blur-md p-3 border border-stone-800 rounded-2xl w-60">
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollTo(item.id)}
              className={`text-left cursor-pointer p-3 w-full text-xs font-medium transition-colors truncate hover:text-white hover:bg-white/5 rounded-lg ${activeId === item.id
                ? 'text-white'
                : 'text-stone-400 '
                }`}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
