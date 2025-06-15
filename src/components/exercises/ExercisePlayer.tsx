import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BreathingAnimation } from "./animations/BreathingAnimation";
import { BodyScanAnimation } from "./animations/BodyScanAnimation";
import { VisualizationAnimation } from "./animations/VisualizationAnimation";
import { SleepAnimation } from "./animations/SleepAnimation";
import { FocusAnimation } from "./animations/FocusAnimation";

interface ExercisePlayerProps {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g. "5 min"
  onClose: () => void;
}

const EXERCISE_INSTRUCTIONS: Record<string, string[]> = {
  "1": [
    "Sit comfortably and relax your shoulders.",
    "Inhale through your nose for a count of 4 seconds.",
    "Hold your breath for 7 seconds.",
    "Exhale slowly through your mouth for 8 seconds.",
    "Repeat the cycle until the timer completes."
  ],
  "2": [
    "Lie down or sit in a comfortable position.",
    "Start focusing on your head and face.",
    "Progressively notice and relax each part: shoulders, arms, chest, abdomen, legs, feet.",
    "Let go of any tension as the highlight moves.",
    "Breathe naturally and follow along."
  ],
  "3": [
    "Find a quiet place and close your eyes.",
    "Visualize a peaceful, calming scene.",
    "Notice the sights, sounds, and sensations.",
    "Let go of anxious thoughts as you focus on this journey.",
    "Return to the present slowly when ready."
  ],
  "4": [
    "Dim the lights and avoid digital screens.",
    "Follow the moon and waves to settle your mind.",
    "Breathe deeply as you watch the calming rhythm.",
    "Let yourself feel relaxed and drowsy.",
    "Continue until you are ready to sleep."
  ],
  "5": [
    "Sit upright with feet flat on the floor.",
    "Focus on the moving circle and breathe deeply.",
    "Keep your attention on the spot, returning when your mind wanders.",
    "Try to maintain concentration throughout the timer."
  ]
};

const EXERCISE_UNSPLASH_IMAGES: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80", // breathing: woman on bed
  "2": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // mindfulness: body of water
  "3": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80", // anxiety: woman at laptop
  "4": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80", // sleep: sunlight & leaves
  "5": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80", // focus: Matrix
};

const getAnimationComponent = (id: string, phase: number | string) => {
  switch (id) {
    case "1":
      // 4-7-8 breathing cycle: phase is one of "in", "hold1", "out", "hold2"
      return <BreathingAnimation phase={phase as any} />;
    case "2":
      // Body scan: phase is activeIndex
      return <BodyScanAnimation activeIndex={phase as number} />;
    case "3":
      return <VisualizationAnimation />;
    case "4":
      return <SleepAnimation />;
    case "5":
      return <FocusAnimation step={phase as number} />;
    default:
      return null;
  }
};

// Helper for GIF paths. Place gifs in /public/exercise-gifs/exercise-[id].gif
const getExerciseGifSrc = (id: string) => {
  try {
    // User should upload their .gif files to public/exercise-gifs/
    return `/exercise-gifs/exercise-${id}.gif`;
  } catch {
    // Fallback placeholder if not found
    return `/exercise-gifs/placeholder.gif`;
  }
};

// Helper to resolve the exercise demo src.
// Prefer GIF in /public/exercise-gifs/ (if user supplies), otherwise fallback to Unsplash.
const getExerciseDemoSrc = (id: string) => {
  // Try .gif in public dir first.
  const gifUrl = `/exercise-gifs/exercise-${id}.gif`;
  // If user ever uploads a gif, the browser loads it. If not found, fallback to Unsplash below using onError handler.
  return { gifUrl, unsplash: EXERCISE_UNSPLASH_IMAGES[id] };
};

export const ExercisePlayer: React.FC<ExercisePlayerProps> = ({
  id,
  title,
  description,
  duration,
  onClose
}) => {
  // Simple timer in seconds:
  const totalTime =
    parseInt(duration) * 60 ||
    60; /* fallback */ // Most durations are like '5 min', parseInt('5 min') = 5

  const [elapsed, setElapsed] = useState(0);

  // For animation control (different per exercise type)
  const [breathingPhase, setBreathingPhase] = useState<"in" | "hold1" | "out" | "hold2">("in");
  const [scanStep, setScanStep] = useState(0);
  const [focusStep, setFocusStep] = useState(0);

  // Animation timers
  useEffect(() => {
    if (id === "1") {
      // Breathing: 4-7-8 cycle
      setBreathingPhase("in");
      let t: any;
      let phase: "in" | "hold1" | "out" | "hold2" = "in";
      let phaseTimes = [
        { phase: "in", len: 4000 },
        { phase: "hold1", len: 7000 },
        { phase: "out", len: 8000 },
        { phase: "hold2", len: 1000 }
      ];
      let step = 0;
      function loop() {
        setBreathingPhase(phaseTimes[step].phase as typeof phase);
        t = setTimeout(() => {
          step = (step + 1) % 4;
          loop();
        }, phaseTimes[step].len);
      }
      loop();
      return () => clearTimeout(t);
    } else if (id === "2") {
      // Body scan: highlight each part every 6s
      let active = 0;
      setScanStep(0);
      const interval = setInterval(() => {
        active = (active + 1) % 7;
        setScanStep(active);
      }, 6000);
      return () => clearInterval(interval);
    } else if (id === "5") {
      let st = 0;
      setFocusStep(0);
      const interval = setInterval(() => {
        st++;
        setFocusStep(st);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [id]);

  // 1. Preparation "Get Ready" step before actual exercise
  const [ready, setReady] = useState(false);

  // Only start elapsed timer once ready is true
  useEffect(() => {
    if (!ready) return;
    if (elapsed >= totalTime) return;
    const interval = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [elapsed, totalTime, ready]);

  // Sync animation phase by exercise type
  let animationPhase: any =
    id === "1"
      ? breathingPhase
      : id === "2"
      ? scanStep
      : id === "5"
      ? focusStep
      : undefined;

  // Define the progress for the progress bar
  const progress = Math.min(elapsed / totalTime, 1);

  // New: single source of demo image/gif
  const { gifUrl, unsplash } = getExerciseDemoSrc(id);

  return (
    <div className="fixed z-50 inset-0 bg-black/60 flex items-center justify-center animate-fade-in-up px-3">
      <Card className="w-full max-w-lg mx-auto p-0 overflow-hidden shadow-2xl rounded-3xl relative bg-white/95 backdrop-blur-lg">
        <CardHeader className="border-b border-blue-100 shadow-sm">
          <div className="flex items-center justify-between">
            <CardTitle className="text-blue-900">{title}</CardTitle>
            <Button size="icon" variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>
          <div className="text-blue-600 font-medium mt-2">{description}</div>
        </CardHeader>
        <CardContent className="pt-4 pb-8">
          <div>
            {/* 1. Preparation view before exercise starts */}
            {!ready ? (
              <div className="flex flex-col items-center justify-center py-8">
                {/* Demo: GIF (if exists), otherwise Unsplash for beauty */}
                <img
                  src={gifUrl}
                  alt="How to do the exercise"
                  className="w-40 h-40 object-cover rounded-2xl shadow-lg border bg-white mb-5"
                  onError={e => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = unsplash;
                  }}
                  loading="eager"
                  style={{ background: "#f9fafb" }}
                />
                <div className="text-xl font-bold text-blue-700 mb-3">
                  Get Ready!
                </div>
                <div className="text-md text-blue-900 mb-6 text-center max-w-xs">
                  Watch the demo above. When you're ready, press start to begin your session.
                </div>
                <Button
                  className="px-8 py-3 text-lg bg-green-600 hover:bg-green-700"
                  onClick={() => setReady(true)}
                  autoFocus
                >
                  Start Now
                </Button>
              </div>
            ) : (
              <>
                {/* Exercise Animation & Instructions */}
                <div className="flex flex-col items-center md:flex-row md:items-start gap-6 mb-4">
                  {/* Animation */}
                  <div className="flex-1 flex flex-col items-center">
                    {getAnimationComponent(id, animationPhase)}
                  </div>
                  {/* Demo: GIF (if exists), otherwise Unsplash */}
                  <img
                    src={gifUrl}
                    alt="Human doing the exercise"
                    className="w-32 h-32 object-cover rounded-xl shadow-md border bg-white self-center mt-2"
                    onError={e => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = unsplash;
                    }}
                    loading="eager"
                    style={{ background: "#f9fafb" }}
                  />
                </div>
                <div className="flex items-center justify-between mt-3 text-md font-medium text-blue-700">
                  <span>Progress:</span>
                  <span>
                    {Math.floor((totalTime - elapsed) / 60)
                      .toString()
                      .padStart(2, "0")}
                    :
                    {((totalTime - elapsed) % 60)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                </div>
                <div className="w-full bg-blue-100 rounded h-2 mt-2 relative overflow-hidden">
                  <div
                    className="h-2 rounded bg-blue-500 transition-all"
                    style={{
                      width: `${progress * 100}%`
                    }}
                  />
                </div>
                <ul className="text-blue-900 mt-5 space-y-2 text-[16px]">
                  {EXERCISE_INSTRUCTIONS[id]?.map((step, i) => (
                    <li key={i} className="pl-2">
                      <span className="inline-block mr-2 w-1.5 h-1.5 bg-blue-400 rounded-full align-middle" />
                      {step}
                    </li>
                  ))}
                </ul>
                {elapsed >= totalTime && (
                  <div className="text-center mt-6">
                    <div className="text-green-600 font-semibold text-lg">
                      Exercise Complete!
                    </div>
                    <Button className="mt-2 px-8" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
