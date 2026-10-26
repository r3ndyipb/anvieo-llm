"use client";

import React, { useEffect, useRef } from "react";
import createCustomGlobe from "./createCustomGlobe";

interface CobeGlobeProps {
  theme?: "light" | "dark";
}

export default function CobeGlobe({ theme = "light" }: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let animId: number;

    const isDark = theme === "dark";

    // Bright Grey Light / Cool Silver for hubs (nodes) and network arcs (dashed lines)
    // RGB normalized [0-1]: [0.92, 0.94, 0.98] - Highly visible, sharp and crisp against the dark background
    const lightGreyColor: [number, number, number] = [0.92, 0.94, 0.98];

    const globe = createCustomGlobe(canvas, {
      devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 2, 2) : 2,
      width: 440 * 2,
      height: 440 * 2,
      phi: 0,
      theta: 0.22,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.68, 0.72, 0.78], // Natural slate-grey for the globe surface
      markerColor: lightGreyColor,
      arcColor: lightGreyColor,
      arcWidth: 0.85, // Thickened to make the dashed lines prominent and clearly visible
      arcHeight: 0.35,
      markerElevation: 0.035,
      markers: [
        { location: [-6.2088, 106.8456], size: 0.075 }, // Jakarta
        { location: [1.3521, 103.8198], size: 0.065 },  // Singapore
        { location: [35.6762, 139.6503], size: 0.07 },  // Tokyo
        { location: [51.5074, -0.1278], size: 0.07 },   // London
        { location: [37.7749, -122.4194], size: 0.075 }, // San Francisco
        { location: [47.3769, 8.5417], size: 0.065 },   // Zurich
        { location: [-33.8688, 151.2093], size: 0.065 }, // Sydney
      ],
      arcs: [
        { from: [-6.2088, 106.8456], to: [1.3521, 103.8198] }, // Jakarta - Singapore
        { from: [1.3521, 103.8198], to: [35.6762, 139.6503] },  // Singapore - Tokyo
        { from: [35.6762, 139.6503], to: [37.7749, -122.4194] }, // Tokyo - SF
        { from: [37.7749, -122.4194], to: [51.5074, -0.1278] },  // SF - London
        { from: [51.5074, -0.1278], to: [47.3769, 8.5417] },    // London - Zurich
        { from: [47.3769, 8.5417], to: [-6.2088, 106.8456] },   // Zurich - Jakarta
        { from: [1.3521, 103.8198], to: [-33.8688, 151.2093] }, // Singapore - Sydney
      ],
    });

    const animate = () => {
      phi += 0.005;
      globe.update({ phi });
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      globe.destroy();
    };
  }, [theme]);

  return (
    <div className="cobe-globe-interactive-box">
      {/* Ozone ambient halo completely removed */}
      <canvas
        ref={canvasRef}
        className="cobe-globe-canvas"
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "420px",
          aspectRatio: "1",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
  );
}
