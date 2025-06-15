
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Eye, EyeOff } from "lucide-react";

const EMOJIS = ["🌟","🍀","🌈","🔥","💧","🌙","🐬","🦋","🎵","🎨","🎈","🌸","💎","🍎","🏆","🐛","❤️","🧠","⚡️","🐦","🍓","🌻","🦄","😺","🍩","🎲"];

function getLevelConfig(level: number) {
  // Sequence: from 3 up to 10 by level 20
  const seqLen = Math.min(3 + Math.floor(level / 2), 10);
  // Palette increases, but always at least 2 more than sequence
  const paletteSize = Math.min(seqLen + 2 + Math.floor(level/2), EMOJIS.length);
  // Show time and answer time
  const visualizeSeconds = Math.max(3 + seqLen, 5);
  const timeLimit = Math.max(5 + seqLen, 7);
  return { seqLen, paletteSize, visualizeSeconds, timeLimit };
}
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const EmojiSequenceMemory: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [sequence, setSequence] = useState<string[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [phase, setPhase] = useState<"memorize"|"recall"|"result">("memorize");
  const [visualTimer, setVisualTimer] = useState(0);
  const [recallTimer, setRecallTimer] = useState(0);
  const [result, setResult] = useState<null|"success"|"fail"|"timeout">(null);

  // Start new round
  const startRound = React.useCallback(() => {
    const { seqLen, paletteSize, visualizeSeconds, timeLimit } = getLevelConfig(level);
    const palette = shuffle(EMOJIS).slice(0, paletteSize);
    const seq = Array.from({length: seqLen}, () =>
      palette[Math.floor(Math.random() * palette.length)]
    );
    setSequence(seq);
    setChoices(shuffle(palette));
    setUserInput([]);
    setVisualTimer(visualizeSeconds);
    setRecallTimer(timeLimit);
    setResult(null);
    setPhase("memorize");
  }, [level]);

  // Memorization timer
  useEffect(() => {
    if (phase !== "memorize" || visualTimer === 0) return;
    const t = setTimeout(() => setVisualTimer((v) => v-1), 1000);
    if (visualTimer === 1 && phase === "memorize") {
      setTimeout(() => setPhase("recall"), 800);
    }
    return () => clearTimeout(t);
  }, [phase, visualTimer]);

  // Recall timer
  useEffect(() => {
    if (phase !== "recall" || recallTimer === 0) return;
    const t = setTimeout(() => setRecallTimer((v)=>v-1), 1000);
    if (recallTimer === 1 && phase === "recall") {
      setTimeout(() => {setResult("timeout"); setPhase("result");}, 800);
    }
    return () => clearTimeout(t);
  }, [phase, recallTimer]);

  useEffect(() => {
    startRound();
  }, [level, startRound]);

  function handlePick(emoji: string) {
    if (phase !== "recall" || userInput.length >= sequence.length) return;
    setUserInput((prev) => {
      const next = [...prev, emoji];
      if (next.length === sequence.length) {
        const correct = next.every((em, idx)=>em === sequence[idx]);
        if (correct) {
          setResult("success");
          setScore((s) => s + 80 + (recallTimer * 3));
        }
        else {setResult("fail");}
        setTimeout(() => setPhase("result"), 500);
      }
      return next;
    });
  }

  function nextLevel() {
    if (level < 20) setLevel((l)=>l+1);
    else {setLevel(1); setScore(0);}
  }
  function resetGame() {
    setLevel(1); setScore(0); startRound();
  }

  const { seqLen, paletteSize, visualizeSeconds, timeLimit } = getLevelConfig(level);

  return (
    <Card className="max-w-lg mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-pink-200 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-pink-800">Emoji Sequence Memory</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-pink-100 text-pink-900">Level {level}/20</Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-700">Score: {score}</Badge>
              {phase === "memorize" && visualTimer > 0 && (
                <Badge className="bg-purple-100 text-purple-900">
                  <Eye className="w-3 h-3 mr-1" />{visualTimer}s
                </Badge>
              )}
              {phase === "recall" && recallTimer > 0 && (
                <Badge className="bg-orange-100 text-orange-900">
                  <EyeOff className="w-3 h-3 mr-1" />{recallTimer}s
                </Badge>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={startRound}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={resetGame}>
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {phase === "memorize" && (
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Badge className="bg-purple-100 text-purple-800"><Eye className="w-4 h-4 mr-1" />Memorize the sequence!</Badge>
            </div>
            <div className="flex gap-2 justify-center my-4">
              {sequence.map((em, idx) => (
                <div key={idx} className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-md border-2 border-gray-200 text-2xl bg-gradient-to-br from-pink-100 to-pink-300 flex items-center justify-center animate-pulse">{em}</div>
              ))}
            </div>
            <div className="text-sm text-gray-600">The sequence will be hidden in <b>{visualTimer}</b> seconds.</div>
          </div>
        )}
        {phase === "recall" && (
          <>
            <div className="flex justify-center mb-2">
              <Badge className="bg-yellow-100 text-yellow-800">
                <EyeOff className="w-4 h-4 mr-1" />
                Recall the emoji sequence
              </Badge>
            </div>
            <div className="flex gap-2 justify-center mb-4 min-h-[3rem] md:min-h-[4rem]">
              {Array.from({length: sequence.length}).map((_, idx) => (
                <div key={idx}
                  className={`
                    w-12 h-12 md:w-16 md:h-16 rounded-lg border-2 border-dashed flex items-center justify-center text-2xl font-bold
                    ${userInput[idx] ? "bg-pink-400/80 border-pink-700" : "bg-gray-100 border-gray-300"}
                  `}
                >{userInput[idx] ?? ""}</div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {choices.map((em) => (
                <Button key={em}
                  className="w-12 h-12 md:w-16 md:h-16 rounded shadow bg-pink-200 hover:bg-pink-300 text-2xl"
                  disabled={userInput.filter((x)=>x===em).length >= sequence.filter((x)=>x===em).length ||
                    userInput.length >= sequence.length || phase !== "recall"}
                  tabIndex={0}
                  aria-label={`Pick emoji ${em}`}
                  onClick={() => handlePick(em)}
                ><span className="sr-only">{em}</span>{em}</Button>
              ))}
            </div>
            <div className="text-center text-xs text-gray-500 mt-2">
              Tap the emojis below in the <b>original order</b>.
            </div>
          </>
        )}
        {phase === "result" && (
          <div className={`text-center p-4 rounded-lg border transition-all mb-2 ${
            result === "success"
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
                  +{80 + recallTimer * 3} points
                </p>
                <Button onClick={nextLevel} className="bg-green-600 hover:bg-green-700 text-white">
                  {level < 20 ? `Next Level (${level+1})` : 'Restart'}
                </Button>
              </>
            )}
            {result === "fail" && (
              <>
                <div className="text-red-600 font-semibold mb-2">
                  Incorrect! The correct sequence was:
                </div>
                <div className="flex gap-2 justify-center my-2">
                  {sequence.map((em, idx) => (
                    <span key={idx} className="w-8 h-8 md:w-12 md:h-12 rounded-lg border bg-pink-100 border-gray-300 flex items-center justify-center text-2xl">{em}</span>
                  ))}
                </div>
                <Button variant="outline" onClick={startRound} className="border-pink-300 text-pink-700 hover:bg-pink-50">Try Again</Button>
              </>
            )}
            {result === "timeout" && (
              <>
                <div className="text-orange-600 font-semibold mb-2">
                  Time's up! The correct sequence was:
                </div>
                <div className="flex gap-2 justify-center my-2">
                  {sequence.map((em, idx) => (
                    <span key={idx} className="w-8 h-8 md:w-12 md:h-12 rounded-lg border bg-pink-100 border-gray-300 flex items-center justify-center text-2xl">{em}</span>
                  ))}
                </div>
                <Button variant="outline" onClick={startRound} className="border-orange-300 text-orange-700 hover:bg-orange-50">Try Again</Button>
              </>
            )}
          </div>
        )}
        <div className="text-center text-xs text-gray-500">
          {`Sequence Length: ${seqLen} | Palette Size: ${paletteSize} | Memorize: ${visualizeSeconds}s | Recall: ${timeLimit}s`}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmojiSequenceMemory;
