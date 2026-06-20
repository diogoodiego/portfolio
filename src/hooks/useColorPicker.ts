import React, { useState, useEffect, useRef } from "react";

// Color Conversion Helpers
export function hsvToRgb(h: number, s: number, v: number) {
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

export function rgbToHsv(r: number, g: number, b: number) {
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

export function hexToRgb(hex: string) {
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

export function rgbToHex(r: number, g: number, b: number) {
  const toHex = (c: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16).toUpperCase();
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Easing Functions
export type EasingType = "Sine" | "Linear" | "Quad" | "Cubic";

export const EASING_FUNCTIONS: Record<EasingType, (t: number) => number> = {
  Linear: (t) => t,
  Sine: (t) => (1 - Math.cos(t * Math.PI)) / 2,
  Quad: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  Cubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

export function useColorPicker() {
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
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--theme-color", calculatedHex);
      document.documentElement.style.setProperty("--theme-color-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }
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
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(hexInput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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

  const handleStepsMouseDown = (e: React.MouseEvent) => {
    handleStepsMove(e.clientX);
    const handleMove = (ev: MouseEvent) => handleStepsMove(ev.clientX);
    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  const handleStepsTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handleStepsMove(e.touches[0].clientX);
    const handleMove = (ev: TouchEvent) => {
      if (ev.touches.length === 0) return;
      handleStepsMove(ev.touches[0].clientX);
    };
    const handleEnd = () => {
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);
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

  return {
    isOpen,
    setIsOpen,
    h,
    setH,
    s,
    setS,
    v,
    setV,
    hexInput,
    copied,
    steps,
    easing,
    setEasing,
    isDropdownOpen,
    setIsDropdownOpen,
    canvasRef,
    stepsRef,
    dropdownRef,
    handleHexInputChange,
    handleCopy,
    handleCanvasMouseDown,
    handleCanvasTouchStart,
    handleStepsMouseDown,
    handleStepsTouchStart,
    paletteColors,
  };
}
