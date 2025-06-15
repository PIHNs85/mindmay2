import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Lightbulb, Shuffle, Coins, Star, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Expanded word data for 50 levels
const LEVEL_DATA = [
  // Levels 1-10: Simple 3-4 letter words
  {
    level: 1,
    letters: ['C', 'A', 'T', 'R', 'E', 'S'],
    requiredWords: [
      { word: 'CAT', x: 0, y: 0, direction: 'across', clue: 'Feline pet' },
      { word: 'ART', x: 0, y: 2, direction: 'across', clue: 'Creative work' },
      { word: 'CAR', x: 0, y: 0, direction: 'down', clue: 'Vehicle' }
    ],
    bonusWords: ['RATE', 'TEAR', 'CARE', 'RACE', 'SCARE'],
    gridSize: { width: 5, height: 5 }
  },
  {
    level: 2,
    letters: ['H', 'O', 'U', 'S', 'E', 'M', 'T'],
    requiredWords: [
      { word: 'HOUSE', x: 0, y: 0, direction: 'across', clue: 'Place to live' },
      { word: 'MOUSE', x: 0, y: 2, direction: 'across', clue: 'Small rodent' },
      { word: 'HOME', x: 0, y: 4, direction: 'across', clue: 'Where heart is' }
    ],
    bonusWords: ['SOME', 'THEM', 'MOST', 'HOST', 'SHOT'],
    gridSize: { width: 6, height: 6 }
  },
  {
    level: 3,
    letters: ['W', 'A', 'T', 'E', 'R', 'S', 'N'],
    requiredWords: [
      { word: 'WATER', x: 0, y: 0, direction: 'across', clue: 'H2O liquid' },
      { word: 'STAR', x: 0, y: 2, direction: 'across', clue: 'Celestial body' },
      { word: 'WEST', x: 0, y: 4, direction: 'across', clue: 'Direction' }
    ],
    bonusWords: ['SWEAT', 'WASTE', 'STARE', 'TEARS', 'WEARS'],
    gridSize: { width: 6, height: 6 }
  },
  {
    level: 4,
    letters: ['F', 'I', 'R', 'E', 'S', 'T', 'N'],
    requiredWords: [
      { word: 'FIRE', x: 0, y: 0, direction: 'across', clue: 'Flame' },
      { word: 'FIRST', x: 0, y: 2, direction: 'across', clue: 'Number one' },
      { word: 'REST', x: 0, y: 4, direction: 'across', clue: 'Relax' }
    ],
    bonusWords: ['STERN', 'FERNS', 'RENTS', 'NESTS', 'TIRES'],
    gridSize: { width: 6, height: 6 }
  },
  {
    level: 5,
    letters: ['G', 'R', 'E', 'E', 'N', 'S', 'T'],
    requiredWords: [
      { word: 'GREEN', x: 0, y: 0, direction: 'across', clue: 'Color of grass' },
      { word: 'STERN', x: 0, y: 2, direction: 'across', clue: 'Strict' },
      { word: 'NEST', x: 0, y: 4, direction: 'across', clue: 'Bird home' }
    ],
    bonusWords: ['TEENS', 'GENRE', 'ENTER', 'TREES', 'GREET'],
    gridSize: { width: 6, height: 6 }
  },
  {
    level: 6,
    letters: ['B', 'L', 'U', 'E', 'S', 'K', 'Y'],
    requiredWords: [
      { word: 'BLUE', x: 0, y: 0, direction: 'across', clue: 'Ocean color' },
      { word: 'SKY', x: 0, y: 2, direction: 'across', clue: 'Above clouds' },
      { word: 'KEY', x: 0, y: 4, direction: 'across', clue: 'Opens locks' }
    ],
    bonusWords: ['YELL', 'BULK', 'SULK', 'YULE', 'BYES'],
    gridSize: { width: 6, height: 6 }
  },
  {
    level: 7,
    letters: ['M', 'O', 'N', 'E', 'Y', 'T', 'I'],
    requiredWords: [
      { word: 'MONEY', x: 0, y: 0, direction: 'across', clue: 'Currency' },
      { word: 'TIME', x: 0, y: 2, direction: 'across', clue: 'Clock shows this' },
      { word: 'TOY', x: 0, y: 4, direction: 'across', clue: 'Plaything' }
    ],
    bonusWords: ['ENEMY', 'ITEM', 'EMIT', 'MINE', 'TONE'],
    gridSize: { width: 6, height: 6 }
  },
  {
    level: 8,
    letters: ['S', 'P', 'A', 'C', 'E', 'R', 'T'],
    requiredWords: [
      { word: 'SPACE', x: 0, y: 0, direction: 'across', clue: 'Outer void' },
      { word: 'TRACE', x: 0, y: 2, direction: 'across', clue: 'Follow path' },
      { word: 'CARE', x: 0, y: 4, direction: 'across', clue: 'Show concern' }
    ],
    bonusWords: ['SPARE', 'CREST', 'REACT', 'CATER', 'ACRES'],
    gridSize: { width: 6, height: 6 }
  },
  {
    level: 9,
    letters: ['L', 'I', 'G', 'H', 'T', 'S', 'N'],
    requiredWords: [
      { word: 'LIGHT', x: 0, y: 0, direction: 'across', clue: 'Illumination' },
      { word: 'NIGHT', x: 0, y: 2, direction: 'across', clue: 'Dark time' },
      { word: 'SIGHT', x: 0, y: 4, direction: 'across', clue: 'Vision' }
    ],
    bonusWords: ['HINTS', 'SLING', 'THING', 'SLING', 'SLING'],
    gridSize: { width: 6, height: 6 }
  },
  {
    level: 10,
    letters: ['D', 'R', 'E', 'A', 'M', 'S', 'T'],
    requiredWords: [
      { word: 'DREAM', x: 0, y: 0, direction: 'across', clue: 'Sleep vision' },
      { word: 'STEAM', x: 0, y: 2, direction: 'across', clue: 'Hot vapor' },
      { word: 'TEAM', x: 0, y: 4, direction: 'across', clue: 'Group working together' }
    ],
    bonusWords: ['SMART', 'TERMS', 'DARTS', 'MATED', 'READS'],
    gridSize: { width: 6, height: 6 }
  },
  // Levels 11-20: Medium complexity
  {
    level: 11,
    letters: ['F', 'L', 'O', 'W', 'E', 'R', 'S'],
    requiredWords: [
      { word: 'FLOWER', x: 0, y: 0, direction: 'across', clue: 'Garden bloom' },
      { word: 'LOWER', x: 0, y: 2, direction: 'across', clue: 'Reduce height' },
      { word: 'SLOW', x: 0, y: 4, direction: 'across', clue: 'Not fast' }
    ],
    bonusWords: ['FLOWS', 'OWLER', 'FOWLS', 'ROWEL', 'SWORE'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 12,
    letters: ['B', 'R', 'I', 'G', 'H', 'T', 'S'],
    requiredWords: [
      { word: 'BRIGHT', x: 0, y: 0, direction: 'across', clue: 'Very light' },
      { word: 'RIGHT', x: 0, y: 2, direction: 'across', clue: 'Correct' },
      { word: 'SIGHT', x: 0, y: 4, direction: 'across', clue: 'Vision' }
    ],
    bonusWords: ['SHIRT', 'GRIST', 'BIRTH', 'GRITS', 'THROB'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 13,
    letters: ['C', 'L', 'O', 'U', 'D', 'S', 'Y'],
    requiredWords: [
      { word: 'CLOUDY', x: 0, y: 0, direction: 'across', clue: 'Overcast sky' },
      { word: 'COULD', x: 0, y: 2, direction: 'across', clue: 'Past tense of can' },
      { word: 'LOUD', x: 0, y: 4, direction: 'across', clue: 'High volume' }
    ],
    bonusWords: ['SCOLD', 'DOLUS', 'YODEL', 'CLODS', 'COYPU'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 14,
    letters: ['S', 'T', 'R', 'O', 'N', 'G', 'E'],
    requiredWords: [
      { word: 'STRONG', x: 0, y: 0, direction: 'across', clue: 'Powerful' },
      { word: 'STONE', x: 0, y: 2, direction: 'across', clue: 'Rock' },
      { word: 'STORE', x: 0, y: 4, direction: 'across', clue: 'Shop' }
    ],
    bonusWords: ['TONGS', 'GORSE', 'ERGOT', 'NEGRO', 'OGRES'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 15,
    letters: ['P', 'L', 'A', 'N', 'E', 'T', 'S'],
    requiredWords: [
      { word: 'PLANET', x: 0, y: 0, direction: 'across', clue: 'Celestial body' },
      { word: 'PLANT', x: 0, y: 2, direction: 'across', clue: 'Growing organism' },
      { word: 'PLANE', x: 0, y: 4, direction: 'across', clue: 'Aircraft' }
    ],
    bonusWords: ['PANEL', 'STEAL', 'TALES', 'LEAST', 'SLATE'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 16,
    letters: ['W', 'I', 'N', 'T', 'E', 'R', 'S'],
    requiredWords: [
      { word: 'WINTER', x: 0, y: 0, direction: 'across', clue: 'Cold season' },
      { word: 'WRITE', x: 0, y: 2, direction: 'across', clue: 'Put words on paper' },
      { word: 'STERN', x: 0, y: 4, direction: 'across', clue: 'Ship back' }
    ],
    bonusWords: ['TWINS', 'WRIST', 'SWINE', 'INERT', 'REINS'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 17,
    letters: ['G', 'A', 'R', 'D', 'E', 'N', 'S'],
    requiredWords: [
      { word: 'GARDEN', x: 0, y: 0, direction: 'across', clue: 'Plant growing area' },
      { word: 'DANGER', x: 0, y: 2, direction: 'across', clue: 'Risk' },
      { word: 'GRAND', x: 0, y: 4, direction: 'across', clue: 'Magnificent' }
    ],
    bonusWords: ['GRADES', 'RANGES', 'ANGERS', 'SANDER', 'SNARED'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 18,
    letters: ['O', 'C', 'E', 'A', 'N', 'S', 'T'],
    requiredWords: [
      { word: 'OCEAN', x: 0, y: 0, direction: 'across', clue: 'Large body of water' },
      { word: 'COAST', x: 0, y: 2, direction: 'across', clue: 'Shore line' },
      { word: 'STONE', x: 0, y: 4, direction: 'across', clue: 'Rock' }
    ],
    bonusWords: ['CANOE', 'SCANT', 'NOTES', 'ONSET', 'CANES'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 19,
    letters: ['M', 'A', 'G', 'I', 'C', 'S', 'T'],
    requiredWords: [
      { word: 'MAGIC', x: 0, y: 0, direction: 'across', clue: 'Supernatural power' },
      { word: 'MASTIC', x: 0, y: 2, direction: 'across', clue: 'Tree resin' },
      { word: 'CAST', x: 0, y: 4, direction: 'across', clue: 'Throw' }
    ],
    bonusWords: ['MIST', 'CATS', 'ACTS', 'SCAT', 'MACS'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 20,
    letters: ['F', 'R', 'I', 'E', 'N', 'D', 'S'],
    requiredWords: [
      { word: 'FRIEND', x: 0, y: 0, direction: 'across', clue: 'Close companion' },
      { word: 'FINDER', x: 0, y: 2, direction: 'across', clue: 'One who locates' },
      { word: 'FRIES', x: 0, y: 4, direction: 'across', clue: 'Potato strips' }
    ],
    bonusWords: ['FIRES', 'RIDES', 'DINER', 'REINS', 'SNIDE'],
    gridSize: { width: 7, height: 6 }
  },
  // Levels 21-30: Higher complexity
  {
    level: 21,
    letters: ['T', 'H', 'U', 'N', 'D', 'E', 'R'],
    requiredWords: [
      { word: 'THUNDER', x: 0, y: 0, direction: 'across', clue: 'Storm sound' },
      { word: 'UNDER', x: 0, y: 2, direction: 'across', clue: 'Below' },
      { word: 'HUNT', x: 0, y: 4, direction: 'across', clue: 'Search for' }
    ],
    bonusWords: ['TURNED', 'HURDEN', 'NURTURE', 'HUNTED', 'ENDURE'],
    gridSize: { width: 8, height: 6 }
  },
  {
    level: 22,
    letters: ['R', 'A', 'I', 'N', 'B', 'O', 'W'],
    requiredWords: [
      { word: 'RAINBOW', x: 0, y: 0, direction: 'across', clue: 'Colorful arc' },
      { word: 'BROWN', x: 0, y: 2, direction: 'across', clue: 'Earth color' },
      { word: 'RAIN', x: 0, y: 4, direction: 'across', clue: 'Water drops' }
    ],
    bonusWords: ['BRAWL', 'BRAWN', 'ARROW', 'ROWAN', 'BARON'],
    gridSize: { width: 8, height: 6 }
  },
  {
    level: 23,
    letters: ['S', 'U', 'N', 'S', 'H', 'I', 'N'],
    requiredWords: [
      { word: 'SUNSHINE', x: 0, y: 0, direction: 'across', clue: 'Bright daylight' },
      { word: 'SHINE', x: 0, y: 2, direction: 'across', clue: 'Emit light' },
      { word: 'HUNS', x: 0, y: 4, direction: 'across', clue: 'Ancient warriors' }
    ],
    bonusWords: ['SHINS', 'NUNS', 'SUNS', 'INNS', 'HISS'],
    gridSize: { width: 8, height: 6 }
  },
  {
    level: 24,
    letters: ['M', 'O', 'U', 'N', 'T', 'A', 'I'],
    requiredWords: [
      { word: 'MOUNTAIN', x: 0, y: 0, direction: 'across', clue: 'High peak' },
      { word: 'AMOUNT', x: 0, y: 2, direction: 'across', clue: 'Quantity' },
      { word: 'MOUNT', x: 0, y: 4, direction: 'across', clue: 'Climb up' }
    ],
    bonusWords: ['NATION', 'MOTION', 'MANIA', 'AMINO', 'TUNA'],
    gridSize: { width: 8, height: 6 }
  },
  {
    level: 25,
    letters: ['C', 'H', 'A', 'N', 'G', 'E', 'S'],
    requiredWords: [
      { word: 'CHANGES', x: 0, y: 0, direction: 'across', clue: 'Alterations' },
      { word: 'CHANGE', x: 0, y: 2, direction: 'across', clue: 'Modify' },
      { word: 'CAGE', x: 0, y: 4, direction: 'across', clue: 'Animal enclosure' }
    ],
    bonusWords: ['CHASE', 'SAGE', 'AGES', 'GENES', 'SCENE'],
    gridSize: { width: 8, height: 6 }
  },
  {
    level: 26,
    letters: ['B', 'E', 'A', 'U', 'T', 'I', 'F'],
    requiredWords: [
      { word: 'BEAUTIFUL', x: 0, y: 0, direction: 'across', clue: 'Very attractive' },
      { word: 'BEAT', x: 0, y: 2, direction: 'across', clue: 'Rhythm' },
      { word: 'FIT', x: 0, y: 4, direction: 'across', clue: 'In good shape' }
    ],
    bonusWords: ['FABLE', 'TABLE', 'FETAL', 'BLEAT', 'FLUTE'],
    gridSize: { width: 9, height: 6 }
  },
  {
    level: 27,
    letters: ['A', 'D', 'V', 'E', 'N', 'T', 'U'],
    requiredWords: [
      { word: 'ADVENTURE', x: 0, y: 0, direction: 'across', clue: 'Exciting journey' },
      { word: 'ADVENT', x: 0, y: 2, direction: 'across', clue: 'Arrival' },
      { word: 'TUNE', x: 0, y: 4, direction: 'across', clue: 'Melody' }
    ],
    bonusWords: ['VENUE', 'NUDE', 'DUNE', 'VEND', 'TEND'],
    gridSize: { width: 9, height: 6 }
  },
  {
    level: 28,
    letters: ['P', 'E', 'R', 'F', 'E', 'C', 'T'],
    requiredWords: [
      { word: 'PERFECT', x: 0, y: 0, direction: 'across', clue: 'Flawless' },
      { word: 'EFFECT', x: 0, y: 2, direction: 'across', clue: 'Result' },
      { word: 'PET', x: 0, y: 4, direction: 'across', clue: 'Domestic animal' }
    ],
    bonusWords: ['CREEP', 'ERECT', 'TREE', 'FEET', 'REEF'],
    gridSize: { width: 8, height: 6 }
  },
  {
    level: 29,
    letters: ['W', 'O', 'N', 'D', 'E', 'R', 'F'],
    requiredWords: [
      { word: 'WONDERFUL', x: 0, y: 0, direction: 'across', clue: 'Amazing' },
      { word: 'WONDER', x: 0, y: 2, direction: 'across', clue: 'Think about' },
      { word: 'FORD', x: 0, y: 4, direction: 'across', clue: 'River crossing' }
    ],
    bonusWords: ['FROWN', 'DROWN', 'OWNER', 'LOWER', 'FLOWER'],
    gridSize: { width: 9, height: 6 }
  },
  {
    level: 30,
    letters: ['H', 'A', 'P', 'P', 'I', 'N', 'E'],
    requiredWords: [
      { word: 'HAPPINESS', x: 0, y: 0, direction: 'across', clue: 'Joy' },
      { word: 'HAPPEN', x: 0, y: 2, direction: 'across', clue: 'Occur' },
      { word: 'PINE', x: 0, y: 4, direction: 'across', clue: 'Evergreen tree' }
    ],
    bonusWords: ['NAPE', 'HEAP', 'PANE', 'PAIN', 'NINE'],
    gridSize: { width: 9, height: 6 }
  },
  // Levels 31-40: Advanced complexity
  {
    level: 31,
    letters: ['I', 'M', 'P', 'O', 'R', 'T', 'A'],
    requiredWords: [
      { word: 'IMPORTANT', x: 0, y: 0, direction: 'across', clue: 'Significant' },
      { word: 'IMPORT', x: 0, y: 2, direction: 'across', clue: 'Bring in goods' },
      { word: 'PORT', x: 0, y: 4, direction: 'across', clue: 'Harbor' }
    ],
    bonusWords: ['RATIO', 'PATIO', 'APORT', 'TRAMP', 'PRIMO'],
    gridSize: { width: 9, height: 6 }
  },
  {
    level: 32,
    letters: ['E', 'D', 'U', 'C', 'A', 'T', 'I'],
    requiredWords: [
      { word: 'EDUCATION', x: 0, y: 0, direction: 'across', clue: 'Learning process' },
      { word: 'EDUCATE', x: 0, y: 2, direction: 'across', clue: 'Teach' },
      { word: 'CUTE', x: 0, y: 4, direction: 'across', clue: 'Adorable' }
    ],
    bonusWords: ['CADET', 'ACUTE', 'CITED', 'ACTED', 'DUCAT'],
    gridSize: { width: 9, height: 6 }
  },
  {
    level: 33,
    letters: ['C', 'R', 'E', 'A', 'T', 'I', 'V'],
    requiredWords: [
      { word: 'CREATIVE', x: 0, y: 0, direction: 'across', clue: 'Imaginative' },
      { word: 'CREATE', x: 0, y: 2, direction: 'across', clue: 'Make something' },
      { word: 'CARE', x: 0, y: 4, direction: 'across', clue: 'Show concern' }
    ],
    bonusWords: ['ACTIVE', 'REACT', 'TRACE', 'CRAVE', 'CARVE'],
    gridSize: { width: 8, height: 6 }
  },
  {
    level: 34,
    letters: ['D', 'I', 'F', 'F', 'E', 'R', 'N'],
    requiredWords: [
      { word: 'DIFFERENT', x: 0, y: 0, direction: 'across', clue: 'Not the same' },
      { word: 'DIFFER', x: 0, y: 2, direction: 'across', clue: 'Be unlike' },
      { word: 'FIRE', x: 0, y: 4, direction: 'across', clue: 'Flame' }
    ],
    bonusWords: ['FRIEND', 'FINDER', 'REFINED', 'FENDER', 'RENDER'],
    gridSize: { width: 9, height: 6 }
  },
  {
    level: 35,
    letters: ['P', 'O', 'S', 'S', 'I', 'B', 'L'],
    requiredWords: [
      { word: 'POSSIBLE', x: 0, y: 0, direction: 'across', clue: 'Can be done' },
      { word: 'BOSS', x: 0, y: 2, direction: 'across', clue: 'Manager' },
      { word: 'SLIP', x: 0, y: 4, direction: 'across', clue: 'Slide' }
    ],
    bonusWords: ['BLISS', 'SPILL', 'BILLS', 'PILLS', 'SPOOL'],
    gridSize: { width: 8, height: 6 }
  },
  {
    level: 36,
    letters: ['M', 'E', 'M', 'O', 'R', 'Y', 'S'],
    requiredWords: [
      { word: 'MEMORY', x: 0, y: 0, direction: 'across', clue: 'Recollection' },
      { word: 'MORE', x: 0, y: 2, direction: 'across', clue: 'Additional' },
      { word: 'SOME', x: 0, y: 4, direction: 'across', clue: 'A few' }
    ],
    bonusWords: ['MORSE', 'ROSY', 'YORE', 'RYES', 'SORE'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 37,
    letters: ['S', 'U', 'C', 'C', 'E', 'S', 'S'],
    requiredWords: [
      { word: 'SUCCESS', x: 0, y: 0, direction: 'across', clue: 'Achievement' },
      { word: 'EXCESS', x: 0, y: 2, direction: 'across', clue: 'Too much' },
      { word: 'CUE', x: 0, y: 4, direction: 'across', clue: 'Signal' }
    ],
    bonusWords: ['CUES', 'SUES', 'USES', 'SEES', 'CESS'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 38,
    letters: ['C', 'H', 'A', 'L', 'L', 'E', 'N'],
    requiredWords: [
      { word: 'CHALLENGE', x: 0, y: 0, direction: 'across', clue: 'Difficult task' },
      { word: 'CHANCE', x: 0, y: 2, direction: 'across', clue: 'Opportunity' },
      { word: 'LANE', x: 0, y: 4, direction: 'across', clue: 'Narrow road' }
    ],
    bonusWords: ['LANCE', 'CLEAN', 'ANGEL', 'GLEAN', 'CANOE'],
    gridSize: { width: 9, height: 6 }
  },
  {
    level: 39,
    letters: ['A', 'M', 'A', 'Z', 'I', 'N', 'G'],
    requiredWords: [
      { word: 'AMAZING', x: 0, y: 0, direction: 'across', clue: 'Incredible' },
      { word: 'MAGIC', x: 0, y: 2, direction: 'across', clue: 'Supernatural' },
      { word: 'GAIN', x: 0, y: 4, direction: 'across', clue: 'Acquire' }
    ],
    bonusWords: ['MANGA', 'AGING', 'ZING', 'MAIN', 'MAGI'],
    gridSize: { width: 7, height: 6 }
  },
  {
    level: 40,
    letters: ['F', 'A', 'N', 'T', 'A', 'S', 'T'],
    requiredWords: [
      { word: 'FANTASTIC', x: 0, y: 0, direction: 'across', clue: 'Wonderful' },
      { word: 'FAST', x: 0, y: 2, direction: 'across', clue: 'Quick' },
      { word: 'ANTS', x: 0, y: 4, direction: 'across', clue: 'Insects' }
    ],
    bonusWords: ['FANS', 'TANS', 'SAFT', 'FATS', 'STAT'],
    gridSize: { width: 9, height: 6 }
  },
  // Levels 41-50: Expert level
  {
    level: 41,
    letters: ['E', 'X', 'C', 'E', 'L', 'L', 'E'],
    requiredWords: [
      { word: 'EXCELLENT', x: 0, y: 0, direction: 'across', clue: 'Outstanding' },
      { word: 'EXCEL', x: 0, y: 2, direction: 'across', clue: 'Be superior' },
      { word: 'CELL', x: 0, y: 4, direction: 'across', clue: 'Basic unit' }
    ],
    bonusWords: ['LENT', 'TELL', 'WELL', 'FELL', 'HELL'],
    gridSize: { width: 9, height: 6 }
  },
  {
    level: 42,
    letters: ['I', 'N', 'C', 'R', 'E', 'D', 'I'],
    requiredWords: [
      { word: 'INCREDIBLE', x: 0, y: 0, direction: 'across', clue: 'Unbelievable' },
      { word: 'CREDIT', x: 0, y: 2, direction: 'across', clue: 'Recognition' },
      { word: 'DICE', x: 0, y: 4, direction: 'across', clue: 'Gaming cubes' }
    ],
    bonusWords: ['CRIED', 'BRIDE', 'RIDER', 'CIDER', 'RICED'],
    gridSize: { width: 10, height: 6 }
  },
  {
    level: 43,
    letters: ['M', 'A', 'G', 'N', 'I', 'F', 'I'],
    requiredWords: [
      { word: 'MAGNIFICENT', x: 0, y: 0, direction: 'across', clue: 'Splendid' },
      { word: 'MAGIC', x: 0, y: 2, direction: 'across', clue: 'Supernatural' },
      { word: 'GAIN', x: 0, y: 4, direction: 'across', clue: 'Obtain' }
    ],
    bonusWords: ['FANG', 'MAIN', 'MAGI', 'FAIN', 'GAMIN'],
    gridSize: { width: 11, height: 6 }
  },
  {
    level: 44,
    letters: ['S', 'P', 'E', 'C', 'T', 'A', 'C'],
    requiredWords: [
      { word: 'SPECTACULAR', x: 0, y: 0, direction: 'across', clue: 'Impressive show' },
      { word: 'ASPECT', x: 0, y: 2, direction: 'across', clue: 'Feature' },
      { word: 'PACE', x: 0, y: 4, direction: 'across', clue: 'Speed' }
    ],
    bonusWords: ['SPACE', 'PLACE', 'TRACE', 'CASTE', 'PASTE'],
    gridSize: { width: 11, height: 6 }
  },
  {
    level: 45,
    letters: ['E', 'X', 'T', 'R', 'A', 'O', 'R'],
    requiredWords: [
      { word: 'EXTRAORDINARY', x: 0, y: 0, direction: 'across', clue: 'Remarkable' },
      { word: 'EXTRA', x: 0, y: 2, direction: 'across', clue: 'Additional' },
      { word: 'RATE', x: 0, y: 4, direction: 'across', clue: 'Speed' }
    ],
    bonusWords: ['ROAR', 'RARE', 'TEAR', 'REAR', 'AREA'],
    gridSize: { width: 13, height: 6 }
  },
  {
    level: 46,
    letters: ['U', 'N', 'B', 'E', 'L', 'I', 'E'],
    requiredWords: [
      { word: 'UNBELIEVABLE', x: 0, y: 0, direction: 'across', clue: 'Hard to believe' },
      { word: 'BELIEVE', x: 0, y: 2, direction: 'across', clue: 'Have faith' },
      { word: 'BLUE', x: 0, y: 4, direction: 'across', clue: 'Sky color' }
    ],
    bonusWords: ['BIBLE', 'NOBLE', 'BILE', 'VEIL', 'LIVE'],
    gridSize: { width: 12, height: 6 }
  },
  {
    level: 47,
    letters: ['P', 'H', 'E', 'N', 'O', 'M', 'E'],
    requiredWords: [
      { word: 'PHENOMENAL', x: 0, y: 0, direction: 'across', clue: 'Exceptional' },
      { word: 'PHONE', x: 0, y: 2, direction: 'across', clue: 'Communication device' },
      { word: 'HOME', x: 0, y: 4, direction: 'across', clue: 'Residence' }
    ],
    bonusWords: ['POEM', 'HOPE', 'MOPE', 'HEMP', 'NOME'],
    gridSize: { width: 10, height: 6 }
  },
  {
    level: 48,
    letters: ['O', 'U', 'T', 'S', 'T', 'A', 'N'],
    requiredWords: [
      { word: 'OUTSTANDING', x: 0, y: 0, direction: 'across', clue: 'Excellent' },
      { word: 'STAND', x: 0, y: 2, direction: 'across', clue: 'Be upright' },
      { word: 'NUTS', x: 0, y: 4, direction: 'across', clue: 'Tree seeds' }
    ],
    bonusWords: ['STOUT', 'SNOUT', 'TAUNT', 'DAUNT', 'GAUNT'],
    gridSize: { width: 11, height: 6 }
  },
  {
    level: 49,
    letters: ['R', 'E', 'M', 'A', 'R', 'K', 'A'],
    requiredWords: [
      { word: 'REMARKABLE', x: 0, y: 0, direction: 'across', clue: 'Notable' },
      { word: 'REMARK', x: 0, y: 2, direction: 'across', clue: 'Comment' },
      { word: 'MARK', x: 0, y: 4, direction: 'across', clue: 'Sign' }
    ],
    bonusWords: ['MAKER', 'BRAKE', 'RAKE', 'MARE', 'RARE'],
    gridSize: { width: 10, height: 6 }
  },
  {
    level: 50,
    letters: ['M', 'A', 'S', 'T', 'E', 'R', 'P'],
    requiredWords: [
      { word: 'MASTERPIECE', x: 0, y: 0, direction: 'across', clue: 'Greatest work' },
      { word: 'MASTER', x: 0, y: 2, direction: 'across', clue: 'Expert' },
      { word: 'STEAM', x: 0, y: 4, direction: 'across', clue: 'Water vapor' }
    ],
    bonusWords: ['STREAM', 'TAMPER', 'TEMPER', 'REPEAT', 'CARPET'],
    gridSize: { width: 11, height: 6 }
  }
];

interface WordMakerProps {}

const WordMaker: React.FC<WordMakerProps> = () => {
  const { toast } = useToast();
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [bonusWords, setBonusWords] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [coins, setCoins] = useState(100);
  const [hints, setHints] = useState(3);
  const [score, setScore] = useState(0);
  const [shuffleCount, setShuffleCount] = useState(0);

  const currentLevelData = LEVEL_DATA[Math.min(level - 1, LEVEL_DATA.length - 1)];
  const shuffledLetters = useMemo(() => {
    const letters = [...currentLevelData.letters];
    for (let i = 0; i < shuffleCount; i++) {
      for (let j = letters.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [letters[j], letters[k]] = [letters[k], letters[j]];
      }
    }
    return letters;
  }, [currentLevelData.letters, shuffleCount]);

  const allPossibleWords = [...currentLevelData.requiredWords.map(w => w.word), ...currentLevelData.bonusWords];

  // Reset when level changes
  useEffect(() => {
    setFoundWords([]);
    setBonusWords([]);
    setCurrentWord('');
    setSelectedLetters([]);
    setScore(0);
  }, [level]);

  const handleLetterClick = (index: number) => {
    if (selectedLetters.includes(index)) {
      // Deselect if already selected
      const newSelected = selectedLetters.filter(i => i !== index);
      setSelectedLetters(newSelected);
      setCurrentWord(newSelected.map(i => shuffledLetters[i]).join(''));
    } else {
      // Add to selection
      const newSelected = [...selectedLetters, index];
      setSelectedLetters(newSelected);
      setCurrentWord(newSelected.map(i => shuffledLetters[i]).join(''));
    }
  };

  const submitWord = () => {
    if (currentWord.length < 3) {
      toast({ title: "Too short", description: "Words must be at least 3 letters long.", variant: "destructive" });
      return;
    }

    const requiredWord = currentLevelData.requiredWords.find(w => w.word === currentWord);
    const isBonusWord = currentLevelData.bonusWords.includes(currentWord);

    if (requiredWord && !foundWords.includes(currentWord)) {
      setFoundWords([...foundWords, currentWord]);
      setScore(score + currentWord.length * 10);
      setCoins(coins + 5);
      toast({ title: "Great!", description: `Found required word: ${currentWord}`, variant: "default" });
    } else if (isBonusWord && !bonusWords.includes(currentWord)) {
      setBonusWords([...bonusWords, currentWord]);
      setScore(score + currentWord.length * 15);
      setCoins(coins + 10);
      toast({ title: "Bonus!", description: `Found bonus word: ${currentWord}`, variant: "default" });
    } else if (foundWords.includes(currentWord) || bonusWords.includes(currentWord)) {
      toast({ title: "Already found", description: "You've already found this word.", variant: "destructive" });
    } else {
      toast({ title: "Not a valid word", description: "This word is not in the puzzle.", variant: "destructive" });
    }

    setCurrentWord('');
    setSelectedLetters([]);
  };

  const shuffleLetters = () => {
    if (coins >= 10) {
      setShuffleCount(shuffleCount + 1);
      setCoins(coins - 10);
      toast({ title: "Letters shuffled!", description: "Spent 10 coins", variant: "default" });
    } else {
      toast({ title: "Not enough coins", description: "Need 10 coins to shuffle", variant: "destructive" });
    }
  };

  const useHint = () => {
    if (hints > 0) {
      const unFoundRequired = currentLevelData.requiredWords.filter(w => !foundWords.includes(w.word));
      if (unFoundRequired.length > 0) {
        const hintWord = unFoundRequired[0];
        toast({ title: "Hint", description: `Try: ${hintWord.clue}`, variant: "default" });
        setHints(hints - 1);
      }
    } else {
      toast({ title: "No hints left", description: "Use coins to buy more hints", variant: "destructive" });
    }
  };

  const nextLevel = () => {
    if (level < 50) {
      setLevel(level + 1);
    } else {
      toast({ title: "Congratulations!", description: "You've completed all 50 levels!", variant: "default" });
    }
  };

  const isLevelComplete = foundWords.length === currentLevelData.requiredWords.length;
  const progressPercentage = (foundWords.length / currentLevelData.requiredWords.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20 animate-fade-in-up">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <span>Word Maker</span>
          <Badge className="ml-2 bg-purple-600 text-white">Level {level}/50</Badge>
        </CardTitle>
        
        <div className="flex justify-center gap-6 mt-3 font-medium">
          <span>
            <Coins className="inline w-4 h-4 text-yellow-500 mr-1" />
            {coins}
          </span>
          <span>
            <Lightbulb className="inline w-4 h-4 text-blue-500 mr-1" />
            {hints}
          </span>
          <span>
            <Star className="inline w-4 h-4 text-purple-500 mr-1" />
            {score}
          </span>
        </div>

        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {foundWords.length}/{currentLevelData.requiredWords.length} required words found
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Word Display */}
        <div className="text-center">
          <div className="text-2xl font-bold tracking-wider min-h-[2rem] p-3 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            {currentWord || 'Select letters to form words...'}
          </div>
        </div>

        {/* Letter Circle */}
        <div className="relative mx-auto" style={{ width: '280px', height: '280px' }}>
          <div className="absolute inset-0 rounded-full border-4 border-purple-200 bg-purple-50">
            {shuffledLetters.map((letter, index) => {
              const angle = (index * 360) / shuffledLetters.length;
              const radian = (angle * Math.PI) / 180;
              const radius = 110;
              const x = Math.cos(radian) * radius + 140;
              const y = Math.sin(radian) * radius + 140;
              
              return (
                <button
                  key={index}
                  className={`absolute w-12 h-12 rounded-full font-bold text-lg transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedLetters.includes(index)
                      ? 'bg-purple-600 text-white scale-110 shadow-lg'
                      : 'bg-white text-purple-900 hover:bg-purple-100 shadow-md hover:scale-105'
                  }`}
                  style={{ left: x, top: y }}
                  onClick={() => handleLetterClick(index)}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2 flex-wrap">
          <Button onClick={submitWord} disabled={currentWord.length < 3} className="bg-green-600 hover:bg-green-700">
            Submit Word
          </Button>
          <Button onClick={() => { setCurrentWord(''); setSelectedLetters([]); }} variant="outline">
            Clear
          </Button>
          <Button onClick={shuffleLetters} variant="outline" className="flex items-center gap-1">
            <Shuffle className="w-4 h-4" />
            Shuffle (10 coins)
          </Button>
          <Button onClick={useHint} variant="outline" className="flex items-center gap-1">
            <Lightbulb className="w-4 h-4" />
            Hint ({hints})
          </Button>
        </div>

        {/* Found Words */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Required Words ({foundWords.length}/{currentLevelData.requiredWords.length})</h3>
            <div className="space-y-1">
              {currentLevelData.requiredWords.map((wordData, index) => (
                <div key={index} className={`p-2 rounded text-sm ${
                  foundWords.includes(wordData.word) 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {foundWords.includes(wordData.word) ? wordData.word : '???'} - {wordData.clue}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Bonus Words ({bonusWords.length})</h3>
            <div className="flex flex-wrap gap-1">
              {bonusWords.map((word, index) => (
                <Badge key={index} className="bg-yellow-200 text-yellow-800">
                  {word}
                </Badge>
              ))}
              {bonusWords.length === 0 && (
                <span className="text-gray-500 italic text-sm">Find extra words for bonus points!</span>
              )}
            </div>
          </div>
        </div>

        {/* Level Complete */}
        {isLevelComplete && (
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-2">Level Complete! 🎉</h3>
            <p className="text-green-700 mb-3">
              Bonus words found: {bonusWords.length} | Total score: {score}
            </p>
            <Button onClick={nextLevel} className="bg-green-600 hover:bg-green-700">
              {level < 50 ? `Next Level (${level + 1})` : 'Game Complete!'} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Daily Challenge Hint */}
        <div className="text-center text-xs text-gray-500 border-t pt-4">
          🎯 50 challenging levels to master!
        </div>
      </CardContent>
    </Card>
  );
};

export default WordMaker;