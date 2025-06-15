
import React from "react";

const SCAN_PARTS = [
  { name: "Head", top: "10%", height: "7%" },
  { name: "Shoulders", top: "18%", height: "7%" },
  { name: "Arms", top: "26%", height: "12%" },
  { name: "Chest", top: "39%", height: "10%" },
  { name: "Abdomen", top: "50%", height: "9%" },
  { name: "Legs", top: "60%", height: "15%" },
  { name: "Feet", top: "76%", height: "9%" },
];

export const BodyScanAnimation: React.FC<{ activeIndex: number }> = ({ activeIndex }) => (
  <div className="relative w-32 h-72 mx-auto">
    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-25 select-none">
      <svg viewBox="0 0 80 250" width="90" height="250">
        <ellipse cx="40" cy="30" rx="22" ry="24" fill="#a5d6f9"/>
        <rect x="18" y="55" width="44" height="50" rx="18" fill="#a5d6f9"/>
        <rect x="10" y="100" width="60" height="75" rx="24" fill="#a5d6f9"/>
        <rect x="18" y="180" width="44" height="46" rx="22" fill="#a5d6f9"/>
      </svg>
    </div>
    {SCAN_PARTS.map((part, idx) => (
      <div
        key={part.name}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: part.top,
          height: part.height,
        }}
        className={`
          flex items-center justify-center w-full
          ${idx === activeIndex ? "animate-scan-glow" : "opacity-50"}
        `}
      >
        <div
          className={`bg-blue-400 rounded-full w-14 h-5 transition-all duration-500`}
          style={{
            boxShadow: idx === activeIndex ? "0 0 16px 6px rgba(59,130,246,0.7)" : undefined,
          }}
        ></div>
      </div>
    ))}
  </div>
);
