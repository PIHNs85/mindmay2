
import React from "react";

// Moon and gentle waves, with stars blinking
export const SleepAnimation: React.FC = () => (
  <div className="relative w-full h-48 rounded-xl bg-gradient-to-tr from-blue-900 via-indigo-800 to-blue-400 flex justify-center items-end overflow-hidden">
    <div className="absolute top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white/80 shadow-lg" style={{ filter: "blur(1px)" }} />
    <div className="absolute top-10 left-[30%] w-2 h-2 rounded-full bg-white opacity-80 animate-blink" />
    <div className="absolute top-16 right-[20%] w-1.5 h-1.5 rounded-full bg-white/60 animate-blink" />
    <div className="absolute top-8 right-10 w-1.5 h-1.5 rounded-full bg-white/90 animate-blink" />
    <div className="absolute bottom-0 left-0 w-full h-16 bg-blue-300/80 rounded-t-full blur animate-float"></div>
    <div className="absolute bottom-2 left-[10%] w-28 h-8 bg-blue-200/70 rounded-t-full blur animate-float"></div>
    <div className="absolute bottom-4 right-[8%] w-24 h-6 bg-blue-100/60 rounded-t-full blur animate-float"></div>
    <div className="absolute bottom-2 right-0 left-0 mx-auto w-3/4 h-8 bg-blue-400/50 rounded-t-full blur" />
  </div>
);
