import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// 4-letter easy words
const WORDS_4_EASY = [
  "CALM", "LOVE", "HOPE", "EASE", "CARE", "REST", "OPEN", "PLAY", "KIND", "LAZY",
  "WARM", "DOVE", "BOLD", "RISE", "FIRM", "WISH", "SOFT", "WORK", "PLAN", "GIFT",
  "WISE", "FAIR", "JUMP", "MIND", "TIME",
];

// 5-letter medium words
const WORDS_5_MED = [
  "PEACE", "SMILE", "BRAVE", "SLEEP", "GUIDE", "LAUGH", "TRUST", "HAPPY", "HEART", "FAITH",
  "DREAM", "PRIDE", "FOCUS", "GRACE", "SHINE", "VALUE", "UNITY", "BALMY", "SOLID", "BLISS",
  "SOLVE", "VOICE", "BLOOM", "STILL", "GLOW", "RELAX", "BOOST", "LIGHT", "SOOTH", "MOTTO",
  "JOYLY", "GRASP", "BLOOD", "LUCKY", "BASIN", "HONEY"
];

// 4 and 5 letter hard mix (levels 71-100; more challenging but not necessarily all uncommon)
const WORDS_HARD_MIX = [
  // Strong 4-letter
  "ZENY", "COZY", "VAST", "JAZZ", "QUIZ", "MYTH", "CALX", "VATU", "SYNC", "WHIZ",
  "QUIZ", "FJORD", "GLYPH", "NYMPH", "SPHINX",
  // Harder 5-letter (less common, or trickier consonant clusters)
  "MINDF", "BLEND", "PLUSH", "DUSKY", "CLIMB", "CRISP", "STERN", "PLANT", "SHOCK", "CHILL",
  "CLOVE", "SHUSH", "SHYLY", "STOUT"
];

// Helper: for each level, get possible word set per your rules
function getLevelWordList(level: number) {
  if (level <= 25) return WORDS_4_EASY;
  if (level <= 70) return WORDS_5_MED;
  // 71-100
  return WORDS_HARD_MIX;
}

// Helper: pick the word for the level (cycling through list)
function pickWord(level: number) {
  const wordList = getLevelWordList(level);
  // Level 1 is index 0, wrap around if > wordList.length
  return wordList[(level - 1) % wordList.length].toUpperCase();
}

// Helper: only allowed keyboard letters currently
function getAllowedKeyboardLetters(level: number) {
  const uniqueLetters = new Set<string>();
  const wordList = getLevelWordList(level);
  wordList.forEach(word => {
    word.split("").forEach(ltr => uniqueLetters.add(ltr));
  });
  // Always show letters sorted for usability
  return Array.from(uniqueLetters).sort();
}

// Returns 3 rows for the custom keyboard, similar to QWERTY
function buildCustomKeyboardRows(level: number) {
  const allowed = getAllowedKeyboardLetters(level);
  // Attempt to split into 3 rows similar to QWERTY (10/9/7 or so)
  const row1 = allowed.slice(0, 10);
  const row2 = allowed.slice(10, 19);
  const row3 = allowed.slice(19);

  const result = [
    [...row1],
    [...row2],
    ["ENTER", ...row3, "DEL"],
  ];
  return result.filter(row => row.length > 0); // Remove empty rows
}

const MAX_ATTEMPTS = 6;
const MAX_LEVEL = 100;
const WORDS_PER_LEVEL = 1;

const getTodaySeed = () => {
  // Returns a value from 0 to 365 for the day of year, cycling daily.
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  // @ts-ignore
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

function initializeEmptyGrid(wordLength: number) {
  return Array.from({ length: MAX_ATTEMPTS }, () =>
    Array.from({ length: wordLength }, () => "")
  );
}

type LetterStatus = "correct" | "present" | "absent" | "";

function computeStatuses(guess: string, answer: string): LetterStatus[] {
  // Green: right place, right letter; Yellow: right letter, wrong place; Gray: wrong letter
  let result: LetterStatus[] = [];
  const answerArr = answer.split("");
  const guessArr = guess.split("");
  const used = Array(answer.length).fill(false);

  // First pass: mark correct
  for (let i = 0; i < guessArr.length; i++) {
    if (guessArr[i] === answerArr[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }
  // Second pass: mark present
  for (let i = 0; i < guessArr.length; i++) {
    if (!result[i]) {
      const index = answerArr.findIndex(
        (ltr, j) => ltr === guessArr[i] && !used[j]
      );
      if (index !== -1) {
        result[i] = "present";
        used[index] = true;
      } else {
        result[i] = "absent";
      }
    }
  }
  return result;
}

const getKeyStatus = (
  guesses: { word: string; result: LetterStatus[] }[]
): Record<string, LetterStatus> => {
  // Collate latest status per letter for the keyboard
  const statuses: Record<string, LetterStatus> = {};
  guesses.forEach(({ word, result }) => {
    word.split("").forEach((ltr, idx) => {
      if (
        result[idx] === "correct" ||
        (result[idx] === "present" && statuses[ltr] !== "correct") ||
        (result[idx] === "absent" &&
          statuses[ltr] !== "correct" &&
          statuses[ltr] !== "present")
      ) {
        statuses[ltr] = result[idx];
      }
    });
  });
  return statuses;
};

const ALPHABET = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

const WordleChallenge: React.FC = () => {
  const { toast } = useToast();
  const [level, setLevel] = useState(1);
  const [answer, setAnswer] = useState<string>(() => pickWord(1));
  const [grid, setGrid] = useState<string[][]>(
    () => initializeEmptyGrid(answer.length)
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [guesses, setGuesses] = useState<{ word: string; result: LetterStatus[] }[]>([]);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [inputDisabled, setInputDisabled] = useState(false);

  useEffect(() => {
    console.log('[WordleChallenge.tsx] Component mounted: level', level, 'answer:', answer);
    // If new level, reset grid+guesses and get new word
    const word = pickWord(level);
    setAnswer(word);
    setGrid(initializeEmptyGrid(word.length));
    setCurrentRow(0);
    setGuesses([]);
    setGameState("playing");
    setInputDisabled(false);
    setCurrentCol(0);
  }, [level]);

  // Add effect to log grid/currentRow/currentCol changes
  useEffect(() => {
    console.log('[WordleChallenge.tsx] grid changed:', grid, 'currentRow:', currentRow, 'currentCol:', currentCol);
  }, [grid, currentRow, currentCol]);

  const handleKey = (key: string) => {
    console.log('[WordleChallenge.tsx] handleKey:', key, {
      inputDisabled,
      gameState,
      currentRow,
      currentCol,
      grid,
    });
    if (inputDisabled || gameState !== "playing") return;
    if (key === "DEL") {
      setGrid((g) => {
        const current = [...g[currentRow]];
        let col = currentCol;
        if (col > 0) {
          col -= 1;
          current[col] = "";
          const newGrid = [...g];
          newGrid[currentRow] = current;
          setCurrentCol(col);
          return newGrid;
        }
        return g;
      });
      return;
    }
    if (key === "ENTER") {
      const guess = grid[currentRow].join("").toUpperCase();
      if (guess.length !== answer.length) return;
      // Ensure guess is a valid word (optional: real dictionary lookup)
      const wordList = getLevelWordList(level);
      if (!wordList.includes(guess) && guess !== answer) {
        toast({
          variant: "destructive",
          title: "Not a valid word",
          description: "Try a real word or check your spelling!",
        });
        return;
      }
      const statuses = computeStatuses(guess, answer);
      setGuesses((prev) => [...prev, { word: guess, result: statuses }]);
      setGrid((g) => {
        const newGrid = [...g];
        newGrid[currentRow] = guess.split("");
        return newGrid;
      });
      if (guess === answer) {
        setGameState("won");
        setScore((s) => s + (MAX_ATTEMPTS - currentRow) * level);
        setStreak((s) => s + 1);
        setInputDisabled(true);
        setTimeout(() => {
          if (level < MAX_LEVEL) setLevel((l) => l + 1);
        }, 1500);
        return;
      }
      if (currentRow + 1 === MAX_ATTEMPTS) {
        setGameState("lost");
        setStreak(0);
        setInputDisabled(true);
        setTimeout(() => {
          if (level < MAX_LEVEL) setLevel((l) => l + 1);
        }, 1800);
        return;
      }
      setCurrentRow(currentRow + 1);
      setCurrentCol(0);
      return;
    }
    if (key.length === 1 && /^[A-Z]$/.test(key)) {
      setGrid((g) => {
        if (currentCol >= answer.length) return g;
        const current = [...g[currentRow]];
        current[currentCol] = key;
        const newGrid = [...g];
        newGrid[currentRow] = current;
        setCurrentCol((c) => c + 1);
        return newGrid;
      });
    }
  };

  // Keyboard handling (desktop):
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      console.log('[WordleChallenge.tsx] physical keyboard event', e.key);
      if (e.key === "Backspace") handleKey("DEL");
      else if (e.key === "Enter") handleKey("ENTER");
      else if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toUpperCase());
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line
  }, [grid, currentRow, currentCol, answer, inputDisabled, gameState]);

  // On-screen keyboard key coloring:
  const keyStatuses = useMemo(() => getKeyStatus(guesses), [guesses]);

  // Determine if current row is complete
  const currentGuessFull =
    grid[currentRow]?.join("").length === answer.length;

  // Keyboard rows now depend on allowed letters for this level
  const [keyRows, setKeyRows] = useState(buildCustomKeyboardRows(level));
  useEffect(() => {
    setKeyRows(buildCustomKeyboardRows(level));
  }, [answer, level]);
  
  // Renderers:
  const renderSquare = (ltr: string, status: LetterStatus, idx: number) => (
    <div
      key={idx}
      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-md border flex items-center justify-center text-xl sm:text-2xl font-bold transition-colors duration-300
        ${
          status === "correct"
            ? "bg-green-500 text-white border-green-600"
            : status === "present"
            ? "bg-yellow-400 text-white border-yellow-600"
            : status === "absent"
            ? "bg-gray-400 text-white border-gray-500"
            : "bg-white/90 text-gray-900 border-gray-300"
        }
      `}
      style={{ boxShadow: status ? "0 2px 8px rgba(34,197,94,0.14)" : undefined }}
    >
      {ltr}
    </div>
  );

  return (
    <Card className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 animate-fade-in-up">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <span>Wordle Challenge</span>
          <Badge className="ml-2 bg-purple-600 text-white">{level}/100</Badge>
        </CardTitle>
        <div className="flex justify-center gap-6 mt-4 font-medium">
          <span>
            <Trophy className="inline w-4 h-4 text-yellow-500 mr-1" />
            Score: {score}
          </span>
          <span>
            <Check className="inline w-4 h-4 text-green-600 mr-1" />
            Streak: {streak}
          </span>
        </div>
        <div className="mt-2 text-gray-600 text-sm">
          {gameState === "won" && (
            <span className="bg-green-100 text-green-800 p-2 rounded font-semibold">
              Correct! <Check className="inline w-5 h-5" />
              {level < MAX_LEVEL && <> Next level... </>}
            </span>
          )}
          {gameState === "lost" && (
            <span className="bg-red-100 text-red-800 p-2 rounded font-semibold">
              Out of attempts! Word was <span className="font-bold">{answer}</span>.
              {level < MAX_LEVEL && <> Next level... </>}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {/* The 6xN grid */}
          {grid.map((row, ridx) => {
            const guessResult =
              guesses[ridx]?.result ??
              Array(answer.length)
                .fill("");
            return (
              <div key={ridx} className="flex justify-center gap-2">
                {row.map((ltr, cidx) =>
                  renderSquare(ltr, guessResult[cidx], cidx)
                )}
              </div>
            );
          })}
        </div>
        {/* On-screen keyboard */}
        <div className="space-y-2 select-none">
          {keyRows.map((row, ridx) => (
            <div className="flex justify-center gap-2" key={ridx}>
              {row.map((key) => {
                if (key === "ENTER" || key === "DEL") {
                  // Disable ENTER unless guess is filled
                  const isEnterDisabled =
                    inputDisabled ||
                    (key === "ENTER" && !currentGuessFull);
                  return (
                    <Button
                      key={key}
                      size="sm"
                      className="w-14 bg-blue-500 text-white"
                      onClick={() => handleKey(key)}
                      disabled={isEnterDisabled}
                    >
                      {key === "DEL" ? <X className="w-4 h-4" /> : "ENTER"}
                    </Button>
                  );
                }
                const keyStatus = keyStatuses[key] ?? "";
                return (
                  <Button
                    key={key}
                    size="sm"
                    className={`w-10 aspect-square font-bold uppercase border
                      ${
                        keyStatus === "correct"
                          ? "bg-green-500 text-white border-green-600"
                          : keyStatus === "present"
                          ? "bg-yellow-400 text-white border-yellow-600"
                          : keyStatus === "absent"
                          ? "bg-gray-400 text-white border-gray-500"
                          : "bg-white/90 text-gray-900 border-gray-300"
                      }
                    `}
                    onClick={() => handleKey(key)}
                    disabled={inputDisabled}
                  >
                    {key}
                  </Button>
                );
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WordleChallenge;
