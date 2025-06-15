
import React from "react";

interface BreathingAnimationProps {
  phase: "in" | "hold1" | "out" | "hold2";
}

const PHASE_TEXT = {
  in: "Breathe In",
  hold1: "Hold",
  out: "Breathe Out",
  hold2: "Hold",
};

export const BreathingAnimation: React.FC<{ phase: BreathingAnimationProps["phase"] }> = ({
  phase,
}) => (
  <div className="flex flex-col items-center justify-center w-full h-64">
    <div
      className={[
        "rounded-full bg-blue-300/80 shadow-xl flex items-center justify-center transition-all duration-700",
        "w-28 h-28",
        phase === "in" ? "scale-125" : "",
        phase === "out" ? "scale-100" : "",
        phase === "hold1" || phase === "hold2" ? "scale-110" : "",
        "animate-breathe",
      ].join(" ")}
      style={{ filter: "blur(1px)" }}
    >
      <span className="sr-only">{PHASE_TEXT[phase]}</span>
    </div>
    <div className="mt-8 text-xl font-semibold text-blue-700 animate-fade-in-up">
      {PHASE_TEXT[phase]}
    </div>
  </div>
);
