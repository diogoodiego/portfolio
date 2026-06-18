"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";

// Color Conversion Helpers
function hsvToRgb(h: number, s: number, v: number) {
  h = h / 360;
  s = s / 100;
  v = v / 100;
  let r = 0, g = 0, b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r, g, b };
  } else if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return { r, g, b };
  }
  return { r: 225, g: 29, b: 72 }; // Default to rose-600 RGB
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (c: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16).toUpperCase();
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Easing Functions
type EasingType = "Sine" | "Linear" | "Quad" | "Cubic";

const EASING_FUNCTIONS: Record<EasingType, (t: number) => number> = {
  Linear: (t) => t,
  Sine: (t) => (1 - Math.cos(t * Math.PI)) / 2,
  Quad: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  Cubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

export const ColorPicker = () => {
  // State variables for Accordion and Color details
  const [isOpen, setIsOpen] = useState(false);
  const [h, setH] = useState(346); // Default: Rose-600 Hue
  const [s, setS] = useState(80);  // Default: Rose-600 Sat
  const [v, setV] = useState(88);  // Default: Rose-600 Val (Brightness)
  const [hexInput, setHexInput] = useState("#E11D48");
  const [copied, setCopied] = useState(false);

  // Accordion sub-options
  const [steps, setSteps] = useState(11);
  const [easing, setEasing] = useState<EasingType>("Sine");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Refs for Drag Coordinates
  const canvasRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Synchronize HEX input text with HSV change
  useEffect(() => {
    const rgb = hsvToRgb(h, s, v);
    const calculatedHex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setHexInput(calculatedHex);

    // Apply color to CSS Variables on the Document Element
    document.documentElement.style.setProperty("--theme-color", calculatedHex);
    document.documentElement.style.setProperty("--theme-color-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }, [h, s, v]);

  // Handle Hex manual typing
  const handleHexInputChange = (val: string) => {
    setHexInput(val);
    const clean = val.replace("#", "").trim();
    if (clean.length === 6 || clean.length === 3) {
      const rgb = hexToRgb(val);
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      setH(hsv.h);
      setS(hsv.s);
      setV(hsv.v);
    }
  };

  // Copy code to Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(hexInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Saturation-Value Canvas Drag Event Handlers
  const handleCanvasMove = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    const newS = Math.round((x / rect.width) * 100);
    const newV = Math.round((1 - y / rect.height) * 100);
    setS(newS);
    setV(newV);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    handleCanvasMove(e.clientX, e.clientY);
    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleCanvasMove(moveEvent.clientX, moveEvent.clientY);
    };
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleCanvasTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handleCanvasMove(e.touches[0].clientX, e.touches[0].clientY);
    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches.length === 0) return;
      handleCanvasMove(moveEvent.touches[0].clientX, moveEvent.touches[0].clientY);
    };
    const handleTouchEnd = () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };

  // Steps slider drag handler
  const handleStepsMove = (clientX: number) => {
    if (!stepsRef.current) return;
    const rect = stepsRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newSteps = Math.round(pct * (11 - 2) + 2);
    setSteps(newSteps);
  };

  // Palette Generator based on easing and step count
  const generatePalette = () => {
    const palette: string[] = [];
    const easeFn = EASING_FUNCTIONS[easing];

    // Lightest value range: S is low, V is high
    const vLight = 94;
    const sLight = Math.max(8, s - 60);

    // Darkest value range: S is high, V is low
    const vDark = 16;
    const sDark = Math.min(100, s + 10);

    for (let i = 0; i < steps; i++) {
      const t = steps === 1 ? 0.5 : i / (steps - 1);
      const easedT = easeFn(t);

      // Interpolate Value and Saturation
      const interpolatedV = vLight + (vDark - vLight) * easedT;
      const interpolatedS = sLight + (sDark - sLight) * easedT;

      const rgb = hsvToRgb(h, interpolatedS, interpolatedV);
      palette.push(rgbToHex(rgb.r, rgb.g, rgb.b));
    }
    return palette;
  };

  const paletteColors = generatePalette();

  return (
    <div className="z-10 flex flex-col gap-4 col-start-1 row-start-2 bg-stone-950/40 shadow-2xl backdrop-blur-md p-5 border border-white/5 rounded-2xl w-[420px] transition-all duration-300">
      {/* Header with Accordion Toggle */}
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between items-center cursor-pointer select-none group"
      >
        <div className="flex items-center gap-2.5">
          <div 
            className="w-3.5 h-3.5 rounded-full border border-white/10 shadow transition-colors duration-200"
            style={{ backgroundColor: hexInput }}
          />
          <span className="font-semibold text-white text-sm tracking-wide group-hover:text-white/90 transition-colors">
            Theme Color
          </span>
        </div>
        <div className="text-zinc-400 group-hover:text-white transition-colors">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Expanded Accordion Area */}
      {isOpen && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          {/* Saturation-Value Board Canvas */}
          <div
            ref={canvasRef}
            onMouseDown={handleCanvasMouseDown}
            onTouchStart={handleCanvasTouchStart}
            className="relative w-full h-36 rounded-xl overflow-hidden cursor-crosshair select-none border border-white/5"
            style={{ backgroundColor: `hsl(${h}, 100%, 50%)` }}
          >
            {/* White-to-transparent overlay gradient (X axis) */}
            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
            {/* Transparent-to-black overlay gradient (Y axis) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            
            {/* Selection Ring */}
            <div
              className="absolute w-4 h-4 border-2 border-white rounded-full shadow-[0_0_4px_rgba(0,0,0,0.5)] -translate-x-1/2 translate-y-1/2 pointer-events-none"
              style={{
                left: `${s}%`,
                bottom: `${v}%`,
              }}
            />
          </div>

          {/* Hue, Saturation, Value Sliders + Hex Display */}
          <div className="flex gap-4 items-center">
            {/* Stacked HSV Sliders */}
            <div className="flex flex-col flex-1 gap-2.5">
              {/* Hue Slider */}
              <div className="relative flex items-center h-2 w-full rounded-full overflow-visible">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={h}
                  onChange={(e) => setH(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none pointer-events-auto accent-white border border-white/5"
                  style={{
                    background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                  }}
                />
              </div>

              {/* Saturation Slider */}
              <div className="relative flex items-center h-2 w-full rounded-full overflow-visible">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={s}
                  onChange={(e) => setS(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none pointer-events-auto accent-white border border-white/5"
                  style={{
                    background: `linear-gradient(to right, #808080, hsl(${h}, 100%, 50%))`,
                  }}
                />
              </div>

              {/* Value/Brightness Slider */}
              <div className="relative flex items-center h-2 w-full rounded-full overflow-visible">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={v}
                  onChange={(e) => setV(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none pointer-events-auto accent-white border border-white/5"
                  style={{
                    background: `linear-gradient(to right, #000000, hsl(${h}, 100%, 50%))`,
                  }}
                />
              </div>
            </div>

            {/* Hex Input Display (right of the sliders) */}
            <div className="flex items-center gap-1 bg-stone-900/60 p-2 border border-white/5 rounded-xl w-32 h-10 shrink-0">
              <span className="font-mono text-zinc-500 text-xs select-none">#</span>
              <input
                type="text"
                value={hexInput.replace("#", "")}
                onChange={(e) => handleHexInputChange(e.target.value)}
                maxLength={6}
                className="w-full bg-transparent border-none outline-none font-mono text-white text-xs font-semibold uppercase tracking-wider focus:ring-0"
              />
              <button 
                onClick={handleCopy} 
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer shrink-0 ml-1"
                title="Copy HEX"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
            </div>
          </div>

          {/* Steps Control */}
          <div className="flex flex-col gap-1.5">
            <span className="text-zinc-400 font-medium text-[11px] uppercase tracking-wider">Steps</span>
            <div 
              ref={stepsRef}
              className="relative w-full h-1.5 bg-stone-900 border border-white/5 rounded-full cursor-pointer mt-1"
              onMouseDown={(e) => {
                handleStepsMove(e.clientX);
                const handleMove = (ev: MouseEvent) => handleStepsMove(ev.clientX);
                const handleUp = () => {
                  window.removeEventListener("mousemove", handleMove);
                  window.removeEventListener("mouseup", handleUp);
                };
                window.addEventListener("mousemove", handleMove);
                window.addEventListener("mouseup", handleUp);
              }}
            >
              {/* Slider Progress Fill */}
              <div 
                className="absolute left-0 top-0 h-full rounded-full opacity-80" 
                style={{ 
                  width: `${((steps - 2) / (11 - 2)) * 100}%`,
                  backgroundColor: hexInput,
                }}
              />
              {/* Slider handle with double chevron icon */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-5.5 h-5.5 rounded-full bg-white shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-105 transition-transform border border-zinc-200"
                style={{ left: `calc(${((steps - 2) / (11 - 2)) * 100}% - 11px)` }}
                onMouseDown={(e) => e.stopPropagation()} // Prevents resetting container click
              >
                <svg className="w-2.5 h-2.5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
                </svg>
              </div>
            </div>
            {/* Steps labels */}
            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono mt-0.5">
              <span>2</span>
              <span className="font-bold" style={{ color: hexInput }}>{steps}</span>
              <span>11</span>
            </div>
          </div>

          {/* Easing Dropdown */}
          <div className="flex flex-col gap-1.5 relative">
            <span className="text-zinc-400 font-medium text-[11px] uppercase tracking-wider">Generation Easing</span>
            <div 
              ref={dropdownRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-stone-900/60 hover:bg-stone-900/80 px-3.5 py-2 border border-white/5 rounded-xl text-white text-xs font-medium flex justify-between items-center w-full h-9 cursor-pointer select-none transition-colors"
            >
              <span>{easing}</span>
              <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              
              {/* Dropdown Options List */}
              {isDropdownOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-stone-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 py-1">
                  {(["Sine", "Linear", "Quad", "Cubic"] as EasingType[]).map((type) => (
                    <div
                      key={type}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEasing(type);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-3.5 py-2 text-xs transition-colors hover:bg-white/5 cursor-pointer ${
                        easing === type ? "text-white font-semibold" : "text-zinc-400"
                      }`}
                      style={easing === type ? { color: hexInput } : {}}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Swatches (always visible at the bottom) */}
      <div className="flex justify-between items-center w-full gap-1.5 select-none mt-1">
        {paletteColors.map((color, index) => {
          const isSelected = hexInput.toUpperCase() === color.toUpperCase();
          return (
            <button
              key={index}
              onClick={() => {
                const rgb = hexToRgb(color);
                const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
                setH(hsv.h);
                setS(hsv.s);
                setV(hsv.v);
              }}
              className={`h-6 flex-1 rounded-md transition-all duration-200 cursor-pointer border ${
                isSelected 
                  ? "border-white scale-110 shadow-lg" 
                  : "border-transparent hover:border-white/40 hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          );
        })}
      </div>
    </div>
  );
};
