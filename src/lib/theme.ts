// Exact rendered colors from the teammate's Iteration 2, read November 7, 2026.
export const C = {
  ink: "#10243A",
  blue: "#50B3D9",
  coral: "#EE7752",
  amber: "#F0A13A",
  pale: "#E3F4FA",
  white: "#FFFFFF",
  muted: "#42576B",
  line: "#8495A5",
  soft: "#F3F7FA",
  green: "#1E7B4B",
  greenBg: "#DDF3E6",
  amberBg: "#FFF0D6",
  pink: "#FBE8E1",
  purple: "#9380C6",
};
export const F = {
  regular: "Jakarta",
  medium: "JakartaMedium",
  bold: "JakartaBold",
  extra: "JakartaExtra",
};
export const GAME_IDS = [
  "memory",
  "words",
  "voyage",
  "trivia",
  "switch",
] as const;
export type GameId = (typeof GAME_IDS)[number];
export const GAME_INFO: Record<
  GameId,
  {
    title: string;
    short: string;
    area: string;
    color: string;
    icon: string;
    duration: string;
    description: string;
    instructions: string[];
  }
> = {
  memory: {
    title: "Memory Mahjong",
    short: "Mahjong",
    area: "Memory",
    color: C.pale,
    icon: "albums-outline",
    duration: "2 min",
    description: "Turn over tiles. Remember their partners.",
    instructions: [
      "Look at the pictures.",
      "Turn over two tiles at a time.",
      "Find all four matching pairs.",
    ],
  },
  words: {
    title: "Daily Word",
    short: "Daily Word",
    area: "Language",
    color: C.coral,
    icon: "chatbubbles-outline",
    duration: "1 min",
    description: "Name as many different animals as you can in 60 seconds.",
    instructions: [
      "Name different animals.",
      "Type names separated by commas, or use your keyboard’s dictation microphone.",
      "Your count grows live. The round ends after 60 seconds.",
    ],
  },
  voyage: {
    title: "Voyage Home",
    short: "Voyage",
    area: "Visual & Spatial",
    color: C.blue,
    icon: "boat-outline",
    duration: "2 min",
    description: "Sail a route, then point back to port.",
    instructions: [
      "Remember the port and three numbered buoys.",
      "Sail to buoys 1, 2 and 3 in order.",
      "When the map hides, point back toward the port. North stays up.",
    ],
  },
  trivia: {
    title: "Teach-then-quiz Trivia",
    short: "Trivia",
    area: "Delayed recall",
    color: C.amber,
    icon: "book-outline",
    duration: "3 min",
    description: "Learn three facts. Play Mahjong. Remember them later.",
    instructions: [
      "Learn three facts about a fictional garden visit.",
      "Play a full Mahjong round while the facts stay hidden.",
      "Answer three questions about what you learned.",
    ],
  },
  switch: {
    title: "Match-3 Bonus Rounds",
    short: "Bonus rounds",
    area: "Attention & Speed",
    color: C.amber,
    icon: "shapes-outline",
    duration: "1 min",
    description: "Connect 1–A–2–B, or match a symbol to its key.",
    instructions: [
      "Choose a bonus round.",
      "Connect alternating numbers and letters, or use a symbol key.",
      "Tap your answers. No dragging needed.",
    ],
  },
};
export const CATEGORY_GROUPS = [
  {
    title: "Visual and Spatial",
    ids: ["voyage"] as GameId[],
    color: C.blue,
    icon: "compass-outline",
  },
  {
    title: "Language and Listening",
    ids: ["words"] as GameId[],
    color: C.coral,
    icon: "ear-outline",
  },
  {
    title: "Attention and Speed",
    ids: ["switch"] as GameId[],
    color: C.amber,
    icon: "flash-outline",
  },
  {
    title: "Memory",
    ids: ["memory", "trivia"] as GameId[],
    color: C.pale,
    icon: "layers-outline",
  },
];

// Apply alternate fills to controls without relying on color to convey meaning.
export function visionColor(color:string,vision:string){const maps:Record<string,Record<string,string>>={
 'Red-green friendly':{[C.coral]:'#DDAA5D',[C.amber]:'#E7C883',[C.greenBg]:'#E3F4FA'},
 'Blue-yellow friendly':{[C.blue]:'#A7C9BC',[C.pale]:'#E5F0EB',[C.amber]:'#EBA2A9'},
 'Grayscale':{[C.blue]:'#B3C2CE',[C.coral]:'#C6BFB8',[C.amber]:'#D2CDC6',[C.pale]:'#E9EDF0',[C.greenBg]:'#E8ECEE',[C.amberBg]:'#F0EFED'}
};return maps[vision]?.[color]||color;}
