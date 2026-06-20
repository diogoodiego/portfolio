"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Copy, Check, Info } from "lucide-react";
import { useColorPicker, EasingType } from "../hooks/useColorPicker";
import { hexToRgb, hexToHsl, calcAPCA, getAPCAReadability } from "@/utils/colorUtils";

export const ColorPicker = () => {
  const {
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
  } = useColorPicker();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [popoverCopiedField, setPopoverCopiedField] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSwatchMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredIndex(index);
  };

  const handleSwatchMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 160);
  };

  const handlePopoverMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handlePopoverMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 160);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handlePopoverCopy = (text: string, fieldName: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setPopoverCopiedField(fieldName);
      setTimeout(() => setPopoverCopiedField(null), 1500);
    }
  };

  const getWeightLabel = (index: number, totalSteps: number) => {
    if (totalSteps === 11) {
      return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][index];
    }
    if (totalSteps === 10) {
      return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900][index];
    }
    if (totalSteps === 9) {
      return [100, 200, 300, 400, 500, 600, 700, 800, 900][index];
    }
    const t = totalSteps === 1 ? 0.5 : index / (totalSteps - 1);
    const w = Math.round((50 + t * 900) / 50) * 50;
    return w === 0 ? 50 : w;
  };

  return (
    <div className="z-20 flex flex-col gap-4 col-start-1 row-start-2 bg-stone-950/90 p-3 rounded-2xl w-[420px] transition-all duration-300">
      {/* Header with Accordion Toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group flex justify-between items-center cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="shadow border border-white/10 rounded-full w-3.5 h-3.5 transition-colors duration-200"
            style={{ backgroundColor: hexInput }}
          />
          <span className="font-semibold text-white group-hover:text-white/90 text-sm tracking-wide transition-colors">
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
            className="relative m-0 p-0 rounded-xl w-full h-36 overflow-hidden cursor-crosshair select-none"
            style={{ backgroundColor: `hsl(${h}, 100%, 50%)` }}
          >
            {/* White-to-transparent overlay gradient (X axis) */}
            <div className="top-0 left-0 absolute bg-gradient-to-r from-white to-transparent w-full h-full" />
            {/* Transparent-to-black overlay gradient (Y axis) */}
            <div className="top-0 left-0 absolute bg-gradient-to-t from-black to-transparent w-full h-full" />

            {/* Selection Ring */}
            <div
              className="absolute shadow-[0_0_4px_rgba(0,0,0,0.5)] border-2 border-white rounded-full w-4 h-4 -translate-x-1/2 translate-y-1/2 pointer-events-none"
              style={{
                left: `${s}%`,
                bottom: `${v}%`,
              }}
            />
          </div>

          {/* Hue, Saturation, Value Sliders + Hex Display */}
          <div className="flex items-center gap-4">
            {/* Stacked HSV Sliders */}
            <div className="flex flex-col flex-1 gap-2.5">
              {/* Hue Slider */}
              <div className="relative flex items-center rounded-full w-full h-2 overflow-visible">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={h}
                  onChange={(e) => setH(Number(e.target.value))}
                  className="border border-white/5 rounded-full outline-none w-full h-1.5 accent-white appearance-none cursor-pointer pointer-events-auto"
                  style={{
                    background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                  }}
                />
              </div>

              {/* Saturation Slider */}
              <div className="relative flex items-center rounded-full w-full h-2 overflow-visible">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={s}
                  onChange={(e) => setS(Number(e.target.value))}
                  className="border border-white/5 rounded-full outline-none w-full h-1.5 accent-white appearance-none cursor-pointer pointer-events-auto"
                  style={{
                    background: `linear-gradient(to right, #808080, hsl(${h}, 100%, 50%))`,
                  }}
                />
              </div>

              {/* Value/Brightness Slider */}
              <div className="relative flex items-center rounded-full w-full h-2 overflow-visible">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={v}
                  onChange={(e) => setV(Number(e.target.value))}
                  className="border border-white/5 rounded-full outline-none w-full h-1.5 accent-white appearance-none cursor-pointer pointer-events-auto"
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
                className="bg-transparent border-none outline-none focus:ring-0 w-full font-mono font-semibold text-white text-xs uppercase tracking-wider"
              />
              <button
                onClick={handleCopy}
                className="ml-1 text-zinc-500 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copy HEX"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
            </div>
          </div>

          {/* Steps Control */}
          <div className="flex flex-col gap-1.5">
            <span className="font-normal text-[13px] text-zinc-200">Steps</span>
            <div
              ref={stepsRef}
              className="relative flex items-center bg-stone-900/60 mt-1 p-[2px] border border-white/10 rounded-full w-full h-7 cursor-pointer select-none"
              onMouseDown={handleStepsMouseDown}
              onTouchStart={handleStepsTouchStart}
            >
              {/* Slider handle with double chevron icon */}
              <div
                className="top-1/2 absolute flex justify-center items-center bg-white shadow-md rounded-full w-6 h-6 hover:scale-105 transition-transform -translate-y-1/2 cursor-grab active:cursor-grabbing"
                style={{ left: `calc(2px + ${(steps - 2) / 9} * (100% - 28px))` }}
              >
                <svg className="w-3 h-3 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
                </svg>
              </div>
            </div>
            {/* Steps labels */}
            <div className="flex justify-between items-center mt-1 font-sans text-zinc-400 text-xs">
              <span>2</span>
              <span>11</span>
            </div>
          </div>

          {/* Easing Dropdown */}
          <div className="relative flex flex-col gap-1.5">
            <span className="font-normal text-[13px] text-zinc-200">Generation Easing</span>
            <div
              ref={dropdownRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex justify-between items-center bg-stone-900/60 hover:bg-stone-900/80 px-3.5 py-2 border border-white/5 rounded-xl w-full h-9 font-medium text-white text-xs transition-colors cursor-pointer select-none"
            >
              <span>{easing}</span>
              <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />

              {/* Dropdown Options List */}
              {isDropdownOpen && (
                <div className="top-[calc(100%+4px)] left-0 z-20 absolute bg-stone-900 shadow-2xl py-1 border border-white/10 rounded-xl w-full overflow-hidden">
                  {(["Sine", "Linear", "Quad", "Cubic"] as EasingType[]).map((type) => (
                    <div
                      key={type}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEasing(type);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-3.5 py-2 text-xs transition-colors hover:bg-white/5 cursor-pointer ${easing === type ? "text-white font-semibold" : "text-zinc-400"
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
      <div className="relative flex justify-between items-center gap-1.5 mt-1 w-full select-none">
        {paletteColors.map((color, index) => (
          <div
            key={index}
            className="flex-1 rounded-md h-6 active:scale-95 hover:scale-y-110 transition-all duration-150 cursor-pointer"
            style={{ backgroundColor: color }}
            onMouseEnter={() => handleSwatchMouseEnter(index)}
            onMouseLeave={handleSwatchMouseLeave}
          />
        ))}

        {/* Hover Popover */}
        {hoveredIndex !== null && (() => {
          const hoveredColor = paletteColors[hoveredIndex];
          const rgb = hexToRgb(hoveredColor);
          const hsl = hexToHsl(hoveredColor);
          const weight = getWeightLabel(hoveredIndex, paletteColors.length);

          const apcaWhite = calcAPCA("#FFFFFF", hoveredColor);
          const apcaBlack = calcAPCA("#000000", hoveredColor);

          const whiteRead = getAPCAReadability(apcaWhite);
          const blackRead = getAPCAReadability(apcaBlack);

          // Position calculation
          const N = paletteColors.length;
          const pct = (hoveredIndex + 0.5) / N;
          const swatchCenter = 12 + pct * 396; // 396 content width
          const popoverWidth = 330;
          const left = Math.max(12, Math.min(420 - popoverWidth - 12, swatchCenter - popoverWidth / 2));
          const arrowLeft = swatchCenter - left;

          const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

          return (
            <div
              className="bottom-9 z-30 absolute flex flex-col gap-3 bg-stone-950/95 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl p-4 border border-white/10 rounded-2xl w-[330px] transition-all animate-fadeIn duration-200 pointer-events-auto select-text"
              style={{
                left: `${left}px`,
                transform: "translateY(-4px)",
              }}
              onMouseEnter={handlePopoverMouseEnter}
              onMouseLeave={handlePopoverMouseLeave}
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-white/10 border-b">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">
                    Tom {weight}
                  </span>
                  <span className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-[10px] text-zinc-400">
                    Swatch {hoveredIndex + 1}/{N}
                  </span>
                </div>
                <div
                  className="shadow-inner border border-white/10 rounded-md w-5 h-5"
                  style={{ backgroundColor: hoveredColor }}
                />
              </div>

              {/* Color Formats */}
              <div className="flex flex-col gap-2 font-mono text-[11px]">
                {/* Hex */}
                <div className="group/row flex justify-between items-center">
                  <span className="text-zinc-500">HEX</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white uppercase">{hoveredColor}</span>
                    <button
                      onClick={() => handlePopoverCopy(hoveredColor, "hex")}
                      className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                      title="Copiar HEX"
                    >
                      {popoverCopiedField === "hex" ? (
                        <Check size={10} className="text-emerald-400" />
                      ) : (
                        <Copy size={10} />
                      )}
                    </button>
                  </div>
                </div>

                {/* RGB */}
                <div className="group/row flex justify-between items-center">
                  <span className="text-zinc-500">RGB</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">{rgbString}</span>
                    <button
                      onClick={() => handlePopoverCopy(rgbString, "rgb")}
                      className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                      title="Copiar RGB"
                    >
                      {popoverCopiedField === "rgb" ? (
                        <Check size={10} className="text-emerald-400" />
                      ) : (
                        <Copy size={10} />
                      )}
                    </button>
                  </div>
                </div>

                {/* HSL */}
                <div className="group/row flex justify-between items-center">
                  <span className="text-zinc-500">HSL</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">{hslString}</span>
                    <button
                      onClick={() => handlePopoverCopy(hslString, "hsl")}
                      className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                      title="Copiar HSL"
                    >
                      {popoverCopiedField === "hsl" ? (
                        <Check size={10} className="text-emerald-400" />
                      ) : (
                        <Copy size={10} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* APCA Contrast Checker */}
              <div className="flex flex-col gap-2 pt-2.5 pb-1 border-white/10 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[10px] text-zinc-400 uppercase tracking-wider">
                    Contraste APCA (Readability)
                  </span>
                  <span title="APCA mede a legibilidade percebida pelo olho humano." className="cursor-help">
                    <Info size={11} className="text-zinc-500" />
                  </span>
                </div>

                <div className="gap-2 grid grid-cols-2 mt-1">
                  {/* White Text on Background */}
                  <div className="flex flex-col bg-white/5 p-2 border border-white/5 rounded-xl">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-medium text-[10px] text-zinc-400">Texto Branco</span>
                      <span className={`text-[9px] px-1 py-0.2 rounded-full border ${whiteRead.badgeColor} font-semibold`}>
                        {whiteRead.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="flex justify-center items-center rounded w-8 h-6 font-bold text-white text-xs"
                        style={{ backgroundColor: hoveredColor }}
                      >
                        Aa
                      </div>
                      <span className="font-mono font-bold text-white text-xs">
                        Lc {whiteRead.score > 0 ? `+${whiteRead.score}` : whiteRead.score}
                      </span>
                    </div>
                  </div>

                  {/* Black Text on Background */}
                  <div className="flex flex-col bg-white/5 p-2 border border-white/5 rounded-xl">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-medium text-[10px] text-zinc-400">Texto Preto</span>
                      <span className={`text-[9px] px-1 py-0.2 rounded-full border ${blackRead.badgeColor} font-semibold`}>
                        {blackRead.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="flex justify-center items-center rounded w-8 h-6 font-bold text-black text-xs"
                        style={{ backgroundColor: hoveredColor }}
                      >
                        Aa
                      </div>
                      <span className="font-mono font-bold text-white text-xs">
                        Lc {blackRead.score > 0 ? `+${blackRead.score}` : blackRead.score}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Didactic Description */}
              <div className="bg-white/5 p-2.5 border border-white/5 rounded-xl font-sans text-[10px] text-zinc-400 leading-relaxed">
                <span className="font-semibold text-zinc-200">Sobre o APCA:</span> O algoritmo calcula o contraste de forma perceptiva. Valores <span className="text-zinc-200">Lc &gt; 75</span> são adequados para corpo de texto, <span className="text-zinc-200">Lc &gt; 45</span> para títulos e <span className="text-zinc-200">Lc &gt; 30</span> apenas para bordas e ícones.
              </div>

              {/* Arrow */}
              <div
                className="bottom-[-5px] absolute bg-stone-950 border-white/10 border-t border-r w-2.5 h-2.5 rotate-45 -translate-x-1/2"
                style={{ left: `${arrowLeft}px` }}
              />
            </div>
          );
        })()}
      </div>
    </div>
  );
};
