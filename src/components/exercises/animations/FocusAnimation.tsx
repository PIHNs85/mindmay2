
import React from "react";

// Animated concentration dot/rings
export const FocusAnimation: React.FC<{ step: number }> = ({ step }) => (
  <div className="flex flex-col items-center justify-center w-full h-48">
    <div className="relative w-28 h-28 flex items-center justify-center">
      <div
        className={`
          absolute left-0 top-0 w-full h-full rounded-full 
          bg-blue-300/40 animate-focus-pulse
        `}
      />
      <div
        className={`
          w-14 h-14 rounded-full bg-blue-500/70 border-4 border-blue-600 shadow-md 
          ${step % 2 === 0 ? "animate-float" : ""}
        `}
      />
      <div
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          w-2 h-2 rounded-full bg-blue-900 
        `}
      />
    </div>
    <div className="mt-8 text-xl font-semibold text-blue-700 animate-fade-in-up">
      Focus here
    </div>
  </div>
);
