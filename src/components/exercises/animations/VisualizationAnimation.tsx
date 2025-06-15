
import React from "react";

// A soft animated scene: clouds drifting and water flowing using CSS animations
export const VisualizationAnimation: React.FC = () => (
  <div className="w-full h-48 flex flex-col items-center justify-end bg-gradient-to-t from-blue-100 via-blue-50 to-teal-50 rounded-xl overflow-hidden">
    <div className="absolute left-1/2 -translate-x-1/2 top-8 w-56 h-14 z-10 pointer-events-none">
      <div className="absolute w-24 h-8 rounded-full bg-white/80 blur-sm animate-float left-3"/>
      <div className="absolute w-20 h-7 rounded-full bg-white/60 blur animate-float right-0"/>
    </div>
    <div className="relative w-full h-12 mt-auto overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-blue-200 via-teal-300 to-blue-400 opacity-60 animate-pulse"/>
      <div className="absolute w-full h-full flex flex-row gap-2 items-end animate-float">
        <div className="w-12 h-8 bg-blue-200 rounded-full" />
        <div className="w-16 h-9 bg-blue-300 rounded-full" />
        <div className="w-20 h-12 bg-blue-400 rounded-full" />
      </div>
    </div>
  </div>
);
