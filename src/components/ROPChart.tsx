"use client";

import React, { useState, useMemo } from "react";

interface ChartDataPoint {
  date: string;
  value: number;
}

interface TabData {
  data: ChartDataPoint[];
  total: string;
  change: string;
}

export const ROPChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate high-fidelity realistic dataset for "All Time" relative to May 19, 2026
  const activeData = useMemo<TabData>(() => {
    const baseDate = new Date(2026, 4, 19); // May 19, 2026
    const data: ChartDataPoint[] = [];
    const startVal = 1500;
    const endVal = 48250.00;
    const count = 28;

    for (let i = 0; i < count; i++) {
      const d = new Date(baseDate);
      d.setMonth(baseDate.getMonth() - (count - 1 - i) * 2);
      const dateStr = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });

      const factor = i / (count - 1);
      const wave = Math.sin(factor * Math.PI * 4) * 1800;
      const noise = Math.cos(i * 1.5) * 800;
      let value = startVal + (endVal - startVal) * factor + wave + noise;

      if (i === count - 1) value = endVal;
      data.push({ date: dateStr, value: Math.round(value * 100) / 100 });
    }
    return { data, total: "$48,250.00", change: "148.9% ↑" };
  }, []);

  const { data: chartData, total: totalBalance, change: percentageChange } = activeData;

  // Find min and max for scaling
  const values = chartData.map((d) => d.value);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);

  // Helper to scale bar heights elegantly (min height is 15% to keep chart balanced)
  const getBarHeight = (value: number) => {
    if (maxVal === minVal) return 50;
    // Scale value between 15% and 85% for visual composition
    const range = maxVal - minVal;
    return ((value - minVal) / range) * 70 + 15;
  };

  // Tooltip position & information calculation
  const hoveredPoint = hoveredIndex !== null ? chartData[hoveredIndex] : null;
  const hoveredBarHeight = hoveredPoint ? getBarHeight(hoveredPoint.value) : 0;
  const hoveredBarLeft = hoveredIndex !== null ? (hoveredIndex / (chartData.length - 1)) * 100 : 0;

  // Decide if tooltip should go to the left or right of the line
  const isTooltipOnRight = hoveredIndex !== null && hoveredIndex / chartData.length < 0.35;

  return (
    <div className="z-10 flex flex-col col-start-2 row-start-2 bg-stone-900/20 shadow-2xl backdrop-blur-md p-5 rounded-2xl w-[420px] font-sans">
      {/* Header Info */}
      <div className="flex flex-col">
        <span className="font-medium text-[11px] text-stone-400 uppercase tracking-wide">
          Total Balance
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-bold text-white text-3xl tracking-tight">
            {totalBalance}
          </span>
          <span className="flex items-center gap-0.5 font-semibold text-[13px] text-emerald-400">
            {percentageChange}
          </span>
        </div>
      </div>

      {/* Interactive Bar Chart Container */}
      <div className="relative flex justify-between items-end w-full h-32 select-none">

        {/* Render Background Bars */}
        {chartData.map((d, index) => {
          const height = getBarHeight(d.value);
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col flex-1 justify-end items-center h-full cursor-pointer"
              style={{
                paddingLeft: chartData.length > 10 ? "1px" : "4px",
                paddingRight: chartData.length > 10 ? "1px" : "4px",
              }}
            >
              {/* The visual Bar */}
              <div
                className={`w-full rounded-t-[3px] transition-all duration-500 ease-out ${isHovered
                  ? "bg-theme-accent shadow-theme-glow"
                  : "bg-white/[0.08] hover:bg-white/20"
                  }`}
                style={{ height: `${height}%` }}
              />
            </div>
          );
        })}

        {/* Hover Line, Handle Dot, and Tooltip */}
        {hoveredIndex !== null && hoveredPoint && (
          <>
            {/* Vertical Line through active bar */}
            <div
              className="top-0 bottom-0 absolute bg-theme-accent/30 w-[1px] transition-all duration-150 ease-out pointer-events-none"
              style={{
                left: `calc(${hoveredBarLeft}% + 0px)`,
              }}
            />

            {/* Glowing Dot on top of active bar */}
            <div
              className="absolute bg-white shadow-theme-glow-sm border-2 border-theme-accent rounded-full w-3 h-3 transition-all -translate-x-1/2 translate-y-1/2 duration-150 ease-out pointer-events-none"
              style={{
                left: `${hoveredBarLeft}%`,
                bottom: `${hoveredBarHeight}%`,
              }}
            />

            {/* Floating Tooltip positioned left or right of the handle */}
            <div
              className="z-30 absolute flex items-center gap-1.5 bg-stone-900/95 shadow-xl backdrop-blur-sm px-2.5 py-1.5 border border-white/10 rounded-lg text-white text-xs transition-all duration-150 ease-out pointer-events-none"
              style={{
                bottom: `calc(${hoveredBarHeight}% - 14px)`,
                left: isTooltipOnRight
                  ? `calc(${hoveredBarLeft}% + 12px)`
                  : `calc(${hoveredBarLeft}% - 12px)`,
                transform: isTooltipOnRight
                  ? "translate(0, 0)"
                  : "translate(-100%, 0)",
              }}
            >
              <span className="font-sans font-medium text-stone-400">{hoveredPoint.date}</span>
              <span className="text-white/30">|</span>
              <span className="font-bold text-white">
                ${hoveredPoint.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
