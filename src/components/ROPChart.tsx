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
  const [selectedTab, setSelectedTab] = useState<string>("1M");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate high-fidelity realistic datasets for each tab relative to May 19, 2026
  const tabDataMap = useMemo<Record<string, TabData>>(() => {
    const baseDate = new Date(2026, 4, 19); // May 19, 2026

    // 1W: 7 days
    const generate1W = (): TabData => {
      const values = [5210.45, 5480.90, 5320.10, 5890.30, 6120.75, 6436.44, 7223.62];
      const data = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() - (6 - i));
        const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return { date: dateStr, value: values[i] };
      });
      return { data, total: "$7,223.62", change: "14.3% ↑" };
    };

    // 1M: 28 days (to fit perfectly in the card layout)
    const generate1M = (): TabData => {
      const data: ChartDataPoint[] = [];
      const startVal = 4700;
      const endVal = 7223.62;
      const count = 28;
      
      for (let i = 0; i < count; i++) {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() - (count - 1 - i));
        const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        
        // Progress factor
        const factor = i / (count - 1);
        // Add smooth wave fluctuations
        const wave = Math.sin(factor * Math.PI * 2.5) * 350;
        const noise = Math.sin(i * 1.8) * 120;
        let value = startVal + (endVal - startVal) * factor + wave + noise;
        
        // Ensure precise final value
        if (i === count - 1) value = endVal;
        data.push({ date: dateStr, value: Math.round(value * 100) / 100 });
      }
      return { data, total: "$7,223.62", change: "14.3% ↑" };
    };

    // 6M: 24 points (approx weekly points over 6 months)
    const generate6M = (): TabData => {
      const data: ChartDataPoint[] = [];
      const startVal = 5120;
      const endVal = 12850.40;
      const count = 24;

      for (let i = 0; i < count; i++) {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() - (count - 1 - i) * 7);
        const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        
        const factor = i / (count - 1);
        const wave = Math.sin(factor * Math.PI * 3.5) * 550;
        const noise = Math.cos(i * 1.2) * 200;
        let value = startVal + (endVal - startVal) * factor + wave + noise;
        
        if (i === count - 1) value = endVal;
        data.push({ date: dateStr, value: Math.round(value * 100) / 100 });
      }
      return { data, total: "$12,850.40", change: "32.1% ↑" };
    };

    // 1Y: 12 monthly points
    const generate1Y = (): TabData => {
      const data: ChartDataPoint[] = [];
      const startVal = 10800;
      const endVal = 24110.85;
      const count = 12;

      for (let i = 0; i < count; i++) {
        const d = new Date(baseDate);
        d.setMonth(baseDate.getMonth() - (count - 1 - i));
        const dateStr = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
        
        const factor = i / (count - 1);
        const wave = Math.sin(factor * Math.PI * 2.2) * 1100;
        let value = startVal + (endVal - startVal) * factor + wave;
        
        if (i === count - 1) value = endVal;
        data.push({ date: dateStr, value: Math.round(value * 100) / 100 });
      }
      return { data, total: "$24,110.85", change: "68.4% ↑" };
    };

    // All Time: 28 bi-weekly/monthly points
    const generateAllTime = (): TabData => {
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
    };

    return {
      "1W": generate1W(),
      "1M": generate1M(),
      "6M": generate6M(),
      "1Y": generate1Y(),
      "All Time": generateAllTime(),
    };
  }, []);

  const activeData = tabDataMap[selectedTab];
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
    <div className="col-start-2 row-start-2 flex flex-col p-5 bg-stone-950/40 backdrop-blur-md z-10 rounded-2xl gap-4 w-[420px] shadow-2xl border border-white/5 font-sans">
      {/* Header Info */}
      <div className="flex flex-col">
        <span className="text-[11px] text-stone-400 font-medium tracking-wide uppercase font-mono">
          Total Balance
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-bold tracking-tight text-white">
            {totalBalance}
          </span>
          <span className="text-[13px] font-semibold text-emerald-400 flex items-center gap-0.5">
            {percentageChange}
          </span>
        </div>
      </div>

      {/* Timeframe Selector tabs */}
      <div className="flex justify-between items-center gap-1.5 mt-1">
        {["1W", "1M", "6M", "1Y", "All Time"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSelectedTab(tab);
              setHoveredIndex(null);
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
              selectedTab === tab
                ? "bg-white text-stone-950 shadow-md scale-105"
                : "bg-transparent text-stone-400 hover:text-white border border-white/10 hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Interactive Bar Chart Container */}
      <div className="relative h-32 w-full mt-4 flex items-end justify-between select-none">
        
        {/* Render Background Bars */}
        {chartData.map((d, index) => {
          const height = getBarHeight(d.value);
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer relative"
              style={{
                paddingLeft: chartData.length > 10 ? "1px" : "4px",
                paddingRight: chartData.length > 10 ? "1px" : "4px",
              }}
            >
              {/* The visual Bar */}
              <div
                className={`w-full rounded-t-[3px] transition-all duration-500 ease-out ${
                  isHovered
                    ? "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.65)]"
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
              className="absolute top-0 bottom-0 w-[1px] bg-rose-500/30 pointer-events-none transition-all duration-150 ease-out"
              style={{
                left: `calc(${hoveredBarLeft}% + 0px)`,
              }}
            />

            {/* Glowing Dot on top of active bar */}
            <div
              className="absolute w-3 h-3 rounded-full bg-white border-2 border-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] -translate-x-1/2 translate-y-1/2 pointer-events-none transition-all duration-150 ease-out"
              style={{
                left: `${hoveredBarLeft}%`,
                bottom: `${hoveredBarHeight}%`,
              }}
            />

            {/* Floating Tooltip positioned left or right of the handle */}
            <div
              className="absolute z-30 pointer-events-none bg-stone-900/95 border border-white/10 text-white rounded-lg px-2.5 py-1.5 shadow-xl text-xs flex items-center gap-1.5 font-mono backdrop-blur-sm transition-all duration-150 ease-out"
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
              <span className="text-stone-400 font-sans font-medium">{hoveredPoint.date}</span>
              <span className="text-white/30">|</span>
              <span className="text-white font-bold">
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
