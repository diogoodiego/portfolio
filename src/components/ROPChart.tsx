"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface DataPoint {
  depth: number; // meters
  rop: number;   // Rate of Penetration, m/h
  target: number; // Benchmark ROP, m/h
}

// Generate premium-looking, realistic drilling telemetry data
const initialData: DataPoint[] = [
  { depth: 2100, rop: 12.4, target: 15.0 },
  { depth: 2102, rop: 14.8, target: 15.0 },
  { depth: 2104, rop: 18.2, target: 15.0 },
  { depth: 2106, rop: 15.1, target: 15.0 },
  { depth: 2108, rop: 22.4, target: 15.0 },
  { depth: 2110, rop: 26.8, target: 15.0 },
  { depth: 2112, rop: 21.0, target: 15.0 },
  { depth: 2114, rop: 13.5, target: 15.0 },
  { depth: 2116, rop: 9.6, target: 15.0 },
  { depth: 2118, rop: 11.2, target: 15.0 },
  { depth: 2120, rop: 17.5, target: 15.0 },
  { depth: 2122, rop: 23.1, target: 15.0 },
  { depth: 2124, rop: 29.4, target: 15.0 },
  { depth: 2126, rop: 32.8, target: 15.0 },
  { depth: 2128, rop: 25.4, target: 15.0 },
  { depth: 2130, rop: 19.8, target: 15.0 },
  { depth: 2132, rop: 16.2, target: 15.0 },
  { depth: 2134, rop: 22.1, target: 15.0 },
  { depth: 2136, rop: 28.5, target: 15.0 },
  { depth: 2138, rop: 34.2, target: 15.0 },
  { depth: 2140, rop: 31.0, target: 15.0 },
];

export const ROPChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredData, setHoveredData] = useState<DataPoint | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    const container = containerRef.current;

    // Clear previous elements
    svg.selectAll("*").remove();

    // Get exact dimensions of parent container
    const width = container.clientWidth;
    const height = container.clientHeight;

    const margin = { top: 12, right: 16, bottom: 20, left: 32 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define X & Y Scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(initialData, (d) => d.depth) as [number, number])
      .range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, (d3.max(initialData, (d) => Math.max(d.rop, d.target)) || 40) * 1.1])
      .range([chartHeight, 0]);

    // Create custom gridlines
    const yTicks = yScale.ticks(4);
    g.append("g")
      .attr("class", "gridlines")
      .selectAll("line")
      .data(yTicks)
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", chartWidth)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", "rgba(255, 255, 255, 0.05)")
      .attr("stroke-dasharray", "2,2");

    // X Axis (Depth) - sleek minimalist style
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat((d) => `${d}m`)
      .tickSize(0)
      .tickPadding(8);

    g.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis)
      .call((g) => g.select(".domain").remove())
      .selectAll("text")
      .attr("fill", "rgba(255, 255, 255, 0.4)")
      .style("font-size", "10px")
      .style("font-family", "monospace");

    // Y Axis (ROP)
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(4)
      .tickFormat((d) => `${d}`)
      .tickSize(0)
      .tickPadding(6);

    g.append("g")
      .call(yAxis)
      .call((g) => g.select(".domain").remove())
      .selectAll("text")
      .attr("fill", "rgba(255, 255, 255, 0.4)")
      .style("font-size", "10px")
      .style("font-family", "monospace");

    // Defs for gradients & glowing filters
    const defs = svg.append("defs");

    // Area Gradient (Teal/Emerald)
    const areaGradient = defs
      .append("linearGradient")
      .attr("id", "rop-area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    areaGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#10b981")
      .attr("stop-opacity", 0.25);

    areaGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#10b981")
      .attr("stop-opacity", 0.0);

    // Glowing filter for the line
    const glowFilter = defs
      .append("filter")
      .attr("id", "glow")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%");

    glowFilter
      .append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "blur");

    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "blur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Area Generator
    const areaGenerator = d3
      .area<DataPoint>()
      .x((d) => xScale(d.depth))
      .y0(chartHeight)
      .y1((d) => yScale(d.rop))
      .curve(d3.curveMonotoneX);

    // Line Generator (Actual ROP)
    const lineGenerator = d3
      .line<DataPoint>()
      .x((d) => xScale(d.depth))
      .y((d) => yScale(d.rop))
      .curve(d3.curveMonotoneX);

    // Line Generator (Target ROP benchmark)
    const targetLineGenerator = d3
      .line<DataPoint>()
      .x((d) => xScale(d.depth))
      .y((d) => yScale(d.target))
      .curve(d3.curveMonotoneX);

    // Draw Target Benchmark Line (Subtle pink dashed line)
    g.append("path")
      .datum(initialData)
      .attr("fill", "none")
      .attr("stroke", "#db2777")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.4)
      .attr("stroke-dasharray", "4,4")
      .attr("d", targetLineGenerator);

    // Draw ROP Gradient Area
    const areaPath = g
      .append("path")
      .datum(initialData)
      .attr("fill", "url(#rop-area-gradient)")
      .attr("d", areaGenerator);

    // Draw ROP Neon Line
    const linePath = g
      .append("path")
      .datum(initialData)
      .attr("fill", "none")
      .attr("stroke", "#10b981")
      .attr("stroke-width", 2)
      .attr("filter", "url(#glow)")
      .attr("d", lineGenerator);

    // Add entry animation (draw line from left to right)
    const totalLength = linePath.node()?.getTotalLength() || 0;
    linePath
      .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0);

    // Animate Area opacity fading in
    areaPath
      .attr("opacity", 0)
      .transition()
      .delay(400)
      .duration(1000)
      .attr("opacity", 1);

    // Create interactive Overlay for tooltips
    const focus = g.append("g").style("display", "none");

    // Vertical cursor line
    const hoverLine = focus
      .append("line")
      .attr("class", "hover-line")
      .attr("stroke", "rgba(255, 255, 255, 0.15)")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,3")
      .attr("y1", 0)
      .attr("y2", chartHeight);

    // Active data point circle
    const hoverCircle = focus
      .append("circle")
      .attr("r", 5)
      .attr("fill", "#ffffff")
      .attr("stroke", "#10b981")
      .attr("stroke-width", 2)
      .attr("filter", "url(#glow)");

    // Target point indicator
    const targetHoverCircle = focus
      .append("circle")
      .attr("r", 3.5)
      .attr("fill", "#db2777")
      .attr("stroke-width", 0);

    // Bisector function for finding nearest point on hover
    const bisectDepth = d3.bisector((d: DataPoint) => d.depth).left;

    // Invisible rectangle to capture all mouse events
    g.append("rect")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("fill", "transparent")
      .on("mouseover", () => focus.style("display", null))
      .on("mouseout", () => {
        focus.style("display", "none");
        setHoveredData(null);
      })
      .on("mousemove", function (event) {
        const mouseX = d3.pointer(event)[0];
        const xValue = xScale.invert(mouseX);

        // Find index of closest data point
        const index = bisectDepth(initialData, xValue, 1);
        const d0 = initialData[index - 1];
        const d1 = initialData[index];
        if (!d0) return;
        const d = !d1 ? d0 : xValue - d0.depth > d1.depth - xValue ? d1 : d0;

        const xPos = xScale(d.depth);
        const yPos = yScale(d.rop);
        const yTargetPos = yScale(d.target);

        // Update indicators
        hoverLine.attr("x1", xPos).attr("x2", xPos);
        hoverCircle.attr("cx", xPos).attr("cy", yPos);
        targetHoverCircle.attr("cx", xPos).attr("cy", yTargetPos);

        // Update state for DOM tooltip
        setHoveredData(d);
        setTooltipPos({
          x: xPos + margin.left + 12,
          y: yPos + margin.top - 20,
        });
      });

    // Resize observer to handle dynamic changes
    const resizeObserver = new ResizeObserver(() => {
      // Re-trigger layout logic on size change
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      
      const newChartWidth = newWidth - margin.left - margin.right;
      const newChartHeight = newHeight - margin.top - margin.bottom;

      xScale.range([0, newChartWidth]);
      yScale.range([newChartHeight, 0]);

      // Re-render components instantly
      g.selectAll(".gridlines line")
        .attr("x2", newChartWidth)
        .attr("y1", (d: any) => yScale(d))
        .attr("y2", (d: any) => yScale(d));

      g.select(".x-axis").attr("transform", `translate(0, ${newChartHeight})`);
      
      // Update paths
      areaPath.attr("d", areaGenerator);
      linePath.attr("d", lineGenerator);
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-neutral-900/40 rounded-lg animate-pulse border border-white/5 flex items-center justify-center">
        <span className="text-white/20 text-xs font-mono">Telemetry Connecting...</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-visible select-none">
      <svg ref={svgRef} className="w-full h-full overflow-visible" />
      
      {/* Absolute overlay HTML tooltip for pixel-perfect design */}
      {hoveredData && (
        <div
          className="absolute z-20 pointer-events-none bg-black/90 border border-white/10 rounded px-2 py-1 shadow-lg flex flex-col gap-0.5"
          style={{
            left: `${Math.min(tooltipPos.x, (containerRef.current?.clientWidth || 300) - 110)}px`,
            top: `${Math.max(4, Math.min(tooltipPos.y, (containerRef.current?.clientHeight || 100) - 45))}px`,
            transition: "left 0.08s ease, top 0.08s ease",
          }}
        >
          <div className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase">
            Depth: <span className="text-zinc-300 font-semibold">{hoveredData.depth} m</span>
          </div>
          <div className="flex items-center gap-1.5 justify-between">
            <span className="text-[10px] text-emerald-400 font-bold font-mono">
              ROP: {hoveredData.rop.toFixed(1)} m/h
            </span>
            <span className="text-[9px] text-pink-500 font-mono">
              tgt: {hoveredData.target.toFixed(1)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
