
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw } from "lucide-react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function getLevelConfig(level: number) {
  // increase letters to sort, from 4 up to 15 by level 20
  const min = 4;
  const max = 15;
  const size = Math.min(min + level, max);
  // limit the allowed pool, from 8 at level 1 to 26 at 20
  const pool = Math.min(8 + level, 26);
  return { size, pool };
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const AlphabetOrderChallenge: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<null | "success" | "fail">(null);

  const { size, pool: poolSize } = getLevelConfig(level);

  // (Re)start round
  const initRound = React.useCallback(() => {
    const p = shuffle(ALPHABET).slice(0, poolSize);
    const seq = shuffle(p).slice(0, size);
    setPool(p);
    setLetters(seq);
    setSelected([]);
    setResult(null);
  }, [level, poolSize, size]);

  useEffect(() => {
    initRound();
  }, [level, initRound]);

  function handleLetterPick(letter: string) {
    if (result) return;
    if (selected.includes(letter)) return;
    const next = [...selected, letter];
    setSelected(next);
    if (next.length === letters.length) {
      // check for correct alphabetical order
      const correctOrder = [...letters].sort();
      if (next.join("") === correctOrder.join("")) {
        setResult("success");
        setScore((s) => s + 100 + level * 5);
      } else {
        setResult("fail");
      }
    }
  }

  function nextLevel() {
    if (level < 20) setLevel((l) => l + 1);
    else { setLevel(1); setScore(0);}
    setResult(null);
  }

  function resetGame() {
    setLevel(1); setScore(0);
    initRound();
  }

  return (
    <Card className="max-w-lg mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-indigo-200 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-indigo-800">Alphabet Order Challenge</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-indigo-100 text-indigo-900">Level {level}/20</Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-700">Score: {score}</Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={initRound}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={resetGame}>
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="mb-1 text-center text-md text-gray-700">
          Pick the <span className="font-bold text-indigo-600">letters</span> in alphabetical order!
        </div>
        {/* The letters for THIS round, in sorted order as "solution" (hidden): */}
        {/* <div className="mb-1 text-center text-xs text-gray-400">({letters.slice().sort().join(" ")})</div> */}
        <div className="flex flex-wrap justify-center gap-2 my-2 min-h-[2.5rem]">
          {Array.from({ length: letters.length }).map((_, idx) => (
            <div
              key={idx}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border-2
                ${selected[idx] ? "bg-indigo-500 text-white border-indigo-700"
                  : "bg-gray-100 border-gray-200"}
                flex items-center justify-center text-lg font-bold tracking-wide transition-all`}
            >
              {selected[idx] ?? ""}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 my-2">
          {pool.map((l) => (
            <Button
              key={l}
              className="w-10 h-10 md:w-12 md:h-12 rounded shadow bg-indigo-300/50 hover:bg-indigo-300 text-indigo-900 text-lg font-bold"
              disabled={selected.includes(l) || !!result}
              onClick={() => handleLetterPick(l)}
              aria-label={`Pick letter ${l}`}
            >
              {l}
            </Button>
          ))}
        </div>
        {result && (
          <div className={`p-3 text-center mt-2 rounded-lg border ${
            result === "success"
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}>
            {result === "success" ? (
              <>
                <div className="flex items-center justify-center space-x-2 text-green-700 font-semibold mb-1">
                  <Trophy className="w-5 h-5" />
                  <span>Correct! Level {level} Complete</span>
                </div>
                <p className="text-sm text-green-600 mb-3">+{100 + level*5} points</p>
                <Button onClick={nextLevel} className="bg-green-600 hover:bg-green-700 text-white">
                  {level < 20 ? `Next Level (${level + 1})` : 'Restart'}
                </Button>
              </>
            ) : (
              <>
                <div className="text-red-600 font-semibold mb-1">
                  Nice try! The correct order is:&nbsp;
                  <span className="font-mono text-red-700">
                    {letters.slice().sort().join(" ")}
                  </span>
                </div>
                <Button onClick={initRound} className="bg-red-100 text-red-800 mt-2">
                  Try Again
                </Button>
              </>
            )}
          </div>
        )}
        <div className="text-center mt-4 text-xs text-gray-500">
          {`Sequence Length: ${size}, Pool Size: ${poolSize}`}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlphabetOrderChallenge;
