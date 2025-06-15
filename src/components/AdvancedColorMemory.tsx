
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Timer, Trophy, RotateCcw, EyeOff, Eye, Shuffle } from "lucide-react";

interface Color {
  name: string;
  bgColor: string;
}

const ALL_COLORS: Color[] = [
  { name: "Red", bgColor: "bg-red-500" },
  { name: "Blue", bgColor: "bg-blue-500" },
  { name: "Green", bgColor: "bg-green-500" },
  { name: "Yellow", bgColor: "bg-yellow-500" },
  { name: "Purple", bgColor: "bg-purple-500" },
  { name: "Pink", bgColor: "bg-pink-500" },
  { name: "Orange", bgColor: "bg-orange-500" },
  { name: "Teal", bgColor: "bg-teal-500" },
  { name: "Indigo", bgColor: "bg-indigo-500" },
  { name: "Cyan", bgColor: "bg-cyan-500" },
  { name: "Lime", bgColor: "bg-lime-500" },
  { name: "Violet", bgColor: "bg-violet-500" },
  { name: "Amber", bgColor: "bg-amber-500" },
  { name: "Emerald", bgColor: "bg-emerald-500" },
  { name: "Sky", bgColor: "bg-sky-500" },
];

const getGameConfig = (level: number) => {
  // Sequence increases, max 9, palette increases too
  const sequenceLength = Math.min(3 + Math.floor((level - 1) / 2), 9);
  const colorPalette = Math.min(4 + Math.floor(level / 2), ALL_COLORS.length);
  const visualizeTime = Math.max(3 + sequenceLength, 5); // seconds to show
  const timeLimit = Math.max(7 + sequenceLength, 10); // seconds to answer
  return { sequenceLength, colorPalette, visualizeTime, timeLimit };
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const AdvancedColorMemory: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [sequence, setSequence] = useState<Color[]>([]);
  const [choices, setChoices] = useState<Color[]>([]);
  const [userInput, setUserInput] = useState<Color[]>([]);
  const [gamePhase, setGamePhase] = useState<"memorize" | "recall" | "result">("memorize");
  const [visualizeTimer, setVisualizeTimer] = useState(0);
  const [recallTimer, setRecallTimer] = useState(0);
  const [result, setResult] = useState<null | "success" | "fail" | "timeout">(null);

  // Setup new round based on level
  const startNewRound = React.useCallback(() => {
    const { sequenceLength, colorPalette, visualizeTime, timeLimit } = getGameConfig(level);

    const palette = shuffle(ALL_COLORS).slice(0, colorPalette);

    // Guarantee sequence consists only of palette colors
    const seq: Color[] = Array.from({ length: sequenceLength }, () =>
      palette[Math.floor(Math.random() * palette.length)]
    );

    setSequence(seq);
    setChoices(shuffle(palette));
    setUserInput([]);
    setVisualizeTimer(visualizeTime);
    setRecallTimer(timeLimit);
    setResult(null);
    setGamePhase("memorize");
  }, [level]);

  // Memorization timer
  useEffect(() => {
    if (gamePhase !== "memorize" || visualizeTimer === 0) return;
    const t = setTimeout(() => {
      setVisualizeTimer((v) => v - 1);
    }, 1000);
    if (visualizeTimer === 1 && gamePhase === "memorize") {
      setTimeout(() => setGamePhase("recall"), 800);
    }
    return () => clearTimeout(t);
  }, [gamePhase, visualizeTimer]);

  // Recall timer
  useEffect(() => {
    if (gamePhase !== "recall" || recallTimer === 0) return;
    const t = setTimeout(() => {
      setRecallTimer((v) => v - 1);
    }, 1000);
    if (recallTimer === 1 && gamePhase === "recall") {
      setTimeout(() => {
        setResult("timeout");
        setGamePhase("result");
      }, 800);
    }
    return () => clearTimeout(t);
  }, [gamePhase, recallTimer]);

  // On phase transition, begin new round
  useEffect(() => {
    startNewRound();
  }, [level, startNewRound]);

  // User picks a color
  function handleColorPick(color: Color) {
    if (gamePhase !== "recall" || userInput.length >= sequence.length) return;
    setUserInput((prev) => {
      const next = [...prev, color];
      if (next.length === sequence.length) {
        const correct = next.every((c, idx) => c.name === sequence[idx].name);
        if (correct) {
          setResult("success");
          setScore((s) => s + 50 + (recallTimer * 2));
        } else {
          setResult("fail");
        }
        setTimeout(() => setGamePhase("result"), 400);
      }
      return next;
    });
  }

  function nextLevel() {
    if (level < 15) setLevel((l) => l + 1);
    else setLevel(1), setScore(0);
  }

  function resetGame() {
    setLevel(1);
    setScore(0);
    startNewRound();
  }

  const { sequenceLength, colorPalette, visualizeTime, timeLimit } = getGameConfig(level);

  return (
    <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-blue-200 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-blue-800">
              Advanced Color Memory
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-blue-100 text-blue-900">Level {level}/15</Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-700">
                Score: {score}
              </Badge>
              {(gamePhase === "memorize" && visualizeTimer > 0) && (
                <Badge className="bg-green-100 text-green-900">
                  <Eye className="w-3 h-3 mr-1" />
                  {visualizeTimer}s
                </Badge>
              )}
              {(gamePhase === "recall" && recallTimer > 0) && (
                <Badge className="bg-orange-100 text-orange-900">
                  <Timer className="w-3 h-3 mr-1" />
                  {recallTimer}s
                </Badge>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={startNewRound}>
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={resetGame}>
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {gamePhase === "memorize" && (
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Badge className="bg-purple-100 text-purple-800">
                <Eye className="w-4 h-4 mr-1" />
                Memorize the color sequence!
              </Badge>
            </div>
            <div className="flex gap-2 justify-center my-4">
              {sequence.map((color, idx) => (
                <div
                  key={idx}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-md border-2 border-gray-200 ${color.bgColor} animate-pulse`}
                  title={color.name}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              The sequence will be hidden in <b>{visualizeTimer}</b> seconds.
            </div>
          </div>
        )}

        {gamePhase === "recall" && (
          <>
            <div className="flex justify-center mb-2">
              <Badge className="bg-yellow-100 text-yellow-800">
                <EyeOff className="w-4 h-4 mr-1" />
                Recall the exact color order
              </Badge>
            </div>
            <div className="flex gap-2 justify-center mb-4 min-h-[3rem] md:min-h-[4rem]">
              {Array.from({ length: sequence.length }).map((_, idx) => (
                <div
                  key={idx}
                  className={`
                    w-12 h-12 md:w-16 md:h-16 rounded-lg border-2 border-dashed flex items-center justify-center text-xl font-bold
                    ${userInput[idx]?.bgColor ?? "bg-gray-100"}
                    ${userInput[idx] ? "border-gray-400" : "border-gray-200"}
                  `}
                >
                  {userInput[idx] && (
                    <span className="text-white drop-shadow">{idx + 1}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {choices.map((color) => (
                <Button
                  key={color.name}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded shadow ${color.bgColor} border-2 border-gray-400
                    text-transparent hover:opacity-90 active:scale-95`}
                  disabled={
                    !!userInput.find((c) => c.name === color.name) ||
                    userInput.length >= sequence.length ||
                    gamePhase !== "recall"
                  }
                  tabIndex={0}
                  aria-label={`Pick color ${color.name}`}
                  onClick={() => handleColorPick(color)}
                >
                  {/* for screen readers only */}
                  <span className="sr-only">{color.name}</span>
                </Button>
              ))}
            </div>
            <div className="text-center text-xs text-gray-500 mt-2">
              Tap the colors below in the <b>original order</b>.
            </div>
          </>
        )}

        {gamePhase === "result" && (
          <div className={`text-center p-4 rounded-lg border transition-all mb-2 ${result === "success"
            ? "bg-green-50 border-green-200"
            : result === "timeout"
              ? "bg-orange-50 border-orange-200"
              : "bg-red-50 border-red-200"
            }`}>
            {result === "success" && (
              <>
                <div className="flex items-center justify-center space-x-2 text-green-700 font-semibold mb-2">
                  <Trophy className="w-5 h-5" />
                  <span>Correct! Level {level} Complete</span>
                </div>
                <p className="text-sm text-green-600 mb-3">
                  +{50 + recallTimer * 2} points
                </p>
                <Button
                  onClick={nextLevel}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {level < 15 ? `Next Level (${level + 1})` : 'Restart'}
                </Button>
              </>
            )}
            {result === "fail" && (
              <>
                <div className="text-red-600 font-semibold mb-2">
                  Incorrect! The correct sequence was:
                </div>
                <div className="flex gap-2 justify-center my-2">
                  {sequence.map((color, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 md:w-12 md:h-12 rounded ${color.bgColor} border border-gray-300`}
                      title={color.name}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={startNewRound}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Try Again
                </Button>
              </>
            )}
            {result === "timeout" && (
              <>
                <div className="text-orange-600 font-semibold mb-2">
                  Time's up! The correct sequence was:
                </div>
                <div className="flex gap-2 justify-center my-2">
                  {sequence.map((color, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 md:w-12 md:h-12 rounded ${color.bgColor} border border-gray-300`}
                      title={color.name}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={startNewRound}
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  Try Again
                </Button>
              </>
            )}
          </div>
        )}
        <div className="text-center text-xs text-gray-500">
          {`Sequence Length: ${sequenceLength} | Palette Size: ${colorPalette} | Visualize: ${visualizeTime}s | Recall Time: ${timeLimit}s`}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedColorMemory;

