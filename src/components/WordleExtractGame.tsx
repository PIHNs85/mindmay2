
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Word banks for levels (can be extended for more fun)
const WORDS_4_EASY = [
  "CALM", "LOVE", "HOPE", "EASE", "CARE", "REST", "OPEN", "PLAY", "KIND", "LAZY",
  "WARM", "DOVE", "BOLD", "RISE", "FIRM", "WISH", "SOFT", "WORK", "PLAN", "GIFT",
  "WISE", "FAIR", "JUMP", "MIND", "TIME"
];
const WORDS_5_MED = [
  "PEACE", "SMILE", "BRAVE", "SLEEP", "GUIDE", "LAUGH", "TRUST", "HAPPY", "HEART", "FAITH",
  "DREAM", "PRIDE", "FOCUS", "GRACE", "SHINE", "VALUE", "UNITY", "BALMY", "SOLID", "BLISS",
  "SOLVE", "VOICE", "BLOOM", "STILL", "GLOW", "RELAX", "BOOST", "LIGHT", "SOOTH", "MOTTO",
  "JOYLY", "GRASP", "BLOOD", "LUCKY", "BASIN", "HONEY"
];
const WORDS_HARD_MIX = [
  "ZENY", "COZY", "VAST", "JAZZ", "QUIZ", "MYTH", "CALX", "VATU", "SYNC", "WHIZ",
  "FJORD", "GLYPH", "NYMPH", "SPHINX",
  "MINDF", "BLEND", "PLUSH", "DUSKY", "CLIMB", "CRISP", "STERN", "PLANT", "SHOCK", "CHILL",
  "CLOVE", "SHUSH", "SHYLY", "STOUT"
];

// Small local English 3+ letter word sample, thin for demo but should be replaced with real dictionary in real use
const MIN_WORDS = [
  ...WORDS_4_EASY, ...WORDS_5_MED, ...WORDS_HARD_MIX,
  "CAT", "DOG", "SUN", "FUN", "MAP", "LOG", "HAT", "RUN", "PEN", "PAT", "PIN", "JAM", "FAN",
  "LAW", "RAW", "TAR", "FIT", "PAN", "EAT", "ATE", "TEA", "SEA", "SIT", "YES", "NOT", "TON",
  "ONE", "LAP", "POT", "LOT", "LIT", "GOT", "SON", "DOT", "TIP", "PEN", "HOT", "TOP", "OAT",
  "LAD", "MAD", "PAD", "BAD", "BAT", "HEN", "MEN", "MAN", "CAN", "CANE", "MIND", "KIND"
];

// Helper
function getLevelWordList(level: number) {
  if (level <= 25) return WORDS_4_EASY;
  if (level <= 70) return WORDS_5_MED;
  return WORDS_HARD_MIX;
}

// Pick main word for the level
function pickWord(level: number) {
  const wordList = getLevelWordList(level);
  return wordList[(level - 1) % wordList.length].toUpperCase();
}

// Helper to shuffle an array
function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Get list of all possible subwords (by brute-force approach for small demo)
function getPossibleWords(mainWord: string, wordBank: string[]): string[] {
  const chars = mainWord.split("");
  const charCounts: Record<string, number> = {};
  for (const c of chars) charCounts[c] = (charCounts[c] || 0) + 1;

  return wordBank.filter(w => {
    if (w.length < 3) return false;
    // Must not use more of a letter than available
    const copy = { ...charCounts };
    for (const ch of w.toUpperCase()) {
      if (!copy[ch]) return false;
      copy[ch]--;
    }
    return true;
  });
}

const MAX_LEVEL = 100;

const WordleExtractGame: React.FC = () => {
  const { toast } = useToast();
  const [level, setLevel] = useState(1);
  const [mainWord, setMainWord] = useState(() => pickWord(1));
  const [shuffledLetters, setShuffledLetters] = useState<string[]>(() => shuffleArray(pickWord(1).split("")));
  const [currentInput, setCurrentInput] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  // All possible words user could submit for this combo
  const possibleWords = useMemo(
    () => getPossibleWords(mainWord, MIN_WORDS),
    [mainWord]
  );

  useEffect(() => {
    const nextWord = pickWord(level);
    setMainWord(nextWord);
    setShuffledLetters(shuffleArray(nextWord.split("")));
    setCurrentInput([]);
    setFoundWords([]);
  }, [level]);

  // Only allow input of available letters (and up to however many times they appear)
  const onKeyPress = (ltr: string) => {
    const usedCount = currentInput.filter(c => c === ltr).length;
    const baseCount = mainWord.split("").filter(c => c === ltr).length;
    if (usedCount < baseCount && currentInput.length < mainWord.length) {
      setCurrentInput([...currentInput, ltr]);
    }
  };

  const onDelete = () => {
    setCurrentInput(input => input.slice(0, -1));
  };

  const onSubmit = () => {
    const guess = currentInput.join("").toUpperCase();
    if (guess.length < 3) {
      toast({ title: "Too short", description: "Use at least 3 letters.", variant: "destructive" });
      return;
    }
    // Only allow if the guess can be built from letter pool, not more than available
    const tempBase = mainWord.split("");
    for (let c of guess) {
      const idx = tempBase.indexOf(c);
      if (idx === -1) {
        toast({ title: "Invalid", description: "You used extra letters!", variant: "destructive" });
        return;
      }
      tempBase.splice(idx, 1);
    }
    if (!possibleWords.includes(guess)) {
      toast({ title: "Not a known word", description: "Try another guess!", variant: "destructive" });
      return;
    }
    if (foundWords.includes(guess)) {
      toast({ title: "Already found", description: "Try something new!", variant: "destructive" });
      return;
    }
    setFoundWords(fw => [...fw, guess]);
    setScore(s => s + guess.length); // Score by word length
    setCurrentInput([]);
    toast({ title: "Good job!", description: `"${guess}" counted!`, variant: "default" });
  };

  const onSkip = () => {
    if (level < MAX_LEVEL) setLevel(level+1);
  };

  const onNext = () => {
    if (level < MAX_LEVEL) setLevel(level+1);
  }

  // Only present letters present in the main word as keyboard
  const letterPool = useMemo(() => {
    // Count letters and allow one button per letter for as many times as occur
    const result: { ltr: string, idx: number }[] = [];
    mainWord.split("").forEach((ltr, idx) => {
      result.push({ ltr, idx });
    });
    return result;
  }, [mainWord]);

  // Only show the distinct letters, but button disables when used up for that session
  // For clarity and fair UX, show letters in shuffled order (but unique only)
  const uniqueShuffled = useMemo(() => {
    // E.g. shuffledLetters: ['L', 'A', 'P', 'Y'] => ['L', 'A', 'P', 'Y']
    return Array.from(new Set(shuffledLetters));
  }, [shuffledLetters]);

  return (
    <Card className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 animate-fade-in-up">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <span>Words from Letters</span>
          <Badge className="ml-2 bg-purple-600 text-white">{level}/100</Badge>
        </CardTitle>
        <div className="flex justify-center gap-6 mt-3 font-medium">
          <span>
            <Trophy className="inline w-4 h-4 text-yellow-500 mr-1" />
            Score: {score}
          </span>
          <span>
            <Check className="inline w-4 h-4 text-green-600 mr-1" />
            Words: {foundWords.length}
          </span>
        </div>
        <div className="mt-3 text-lg font-bold tracking-widest text-blue-800">
          {shuffledLetters.map((ltr, i) => (
            <span key={i} className="inline-block mx-1 px-3 py-2 bg-blue-100 rounded-md text-2xl font-mono select-none">{ltr}</span>
          ))}
        </div>
        <p className="mt-1 text-sm text-gray-700">Extract as many words as you can using only the given letters. Tap letters below to build words!</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row justify-center gap-2 my-4">
          {Array(mainWord.length).fill(null).map((_, idx) => (
            <div className="w-12 h-12 flex items-center justify-center rounded-md bg-gray-100 border text-2xl font-bold"
              key={idx}>
              {currentInput[idx] || ""}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 flex-wrap mb-4">
          {uniqueShuffled.map(ltr => {
            // Calculate usage for disabling the button
            const used = currentInput.filter(c => c === ltr).length;
            const allowed = mainWord.split("").filter(c => c === ltr).length;
            const disabled = used >= allowed;
            return (
              <Button key={ltr} size="sm" variant="secondary" className="w-12 h-12 text-xl font-bold"
                onClick={() => onKeyPress(ltr)} disabled={disabled}>{ltr}</Button>
            );
          })}
          <Button size="sm" className="w-20 h-12 font-bold" onClick={onDelete} disabled={currentInput.length === 0}>DEL</Button>
          <Button size="sm" className="w-20 h-12 font-bold bg-green-600 text-white"
            onClick={onSubmit} disabled={currentInput.length < 3}>
            ENTER
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-semibold text-gray-800 mb-1">Words found:</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {foundWords.length === 0
              ? <span className="text-gray-500 italic">None yet</span>
              : foundWords.map(word =>
                <Badge className="bg-green-200 text-green-800 px-3 py-1" key={word}>{word}</Badge>)
            }
          </div>
        </div>
        <div className="flex justify-center mt-5 space-x-2">
          <Button onClick={onSkip} className="bg-red-100 hover:bg-red-200 text-red-800">Skip</Button>
          <Button onClick={onNext} variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
            Next <ArrowRight className="ml-1" />
          </Button>
        </div>
        <div className="mt-6 text-xs text-gray-400 text-center">
          {possibleWords.length > 6 && (
            <span>{possibleWords.length} words possible</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WordleExtractGame;
