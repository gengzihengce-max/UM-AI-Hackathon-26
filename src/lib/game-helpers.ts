export function seedRandom(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function shuffled<T>(a: T[], rng: () => number = Math.random): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
export const MAPS = [
  { start: 30, targets: [8, 21, 4], blocked: [7, 13, 19, 22, 28] },
  { start: 30, targets: [10, 20, 3], blocked: [8, 14, 26, 27, 15] },
  { start: 30, targets: [9, 23, 2], blocked: [7, 13, 19, 25, 16] },
];
export function shortestPath(
  start: number,
  end: number,
  blocked: number[],
  size = 6,
) {
  const queue: [number, number][] = [[start, 0]],
    seen = new Set([start]);
  while (queue.length) {
    const [p, d] = queue.shift()!;
    if (p === end) return d;
    for (const q of [
      p - size,
      p + size,
      p % size ? p - 1 : -1,
      p % size < size - 1 ? p + 1 : -1,
    ])
      if (q >= 0 && q < size * size && !blocked.includes(q) && !seen.has(q)) {
        seen.add(q);
        queue.push([q, d + 1]);
      }
  }
  return Infinity;
}

// Deliberately finite, inspectable vocabulary. These counts are a demo proxy.
const ANIMALS = [
  "cat",
  "dog",
  "horse",
  "cow",
  "sheep",
  "goat",
  "pig",
  "chicken",
  "duck",
  "goose",
  "turkey",
  "donkey",
  "mule",
  "rabbit",
  "mouse",
  "rat",
  "hamster",
  "guinea pig",
  "gerbil",
  "ferret",
  "hedgehog",
  "squirrel",
  "chipmunk",
  "beaver",
  "otter",
  "raccoon",
  "badger",
  "skunk",
  "fox",
  "wolf",
  "coyote",
  "bear",
  "polar bear",
  "panda",
  "lion",
  "tiger",
  "leopard",
  "cheetah",
  "jaguar",
  "cougar",
  "lynx",
  "bobcat",
  "elephant",
  "giraffe",
  "zebra",
  "hippopotamus",
  "rhinoceros",
  "deer",
  "moose",
  "elk",
  "antelope",
  "gazelle",
  "bison",
  "buffalo",
  "camel",
  "llama",
  "alpaca",
  "kangaroo",
  "koala",
  "wombat",
  "sloth",
  "armadillo",
  "anteater",
  "monkey",
  "gorilla",
  "chimpanzee",
  "orangutan",
  "baboon",
  "lemur",
  "bat",
  "whale",
  "dolphin",
  "porpoise",
  "seal",
  "sea lion",
  "walrus",
  "manatee",
  "shark",
  "fish",
  "salmon",
  "trout",
  "tuna",
  "goldfish",
  "eel",
  "seahorse",
  "ray",
  "stingray",
  "octopus",
  "squid",
  "jellyfish",
  "crab",
  "lobster",
  "shrimp",
  "clam",
  "oyster",
  "snail",
  "slug",
  "worm",
  "starfish",
  "turtle",
  "tortoise",
  "crocodile",
  "alligator",
  "lizard",
  "gecko",
  "iguana",
  "snake",
  "python",
  "cobra",
  "frog",
  "toad",
  "salamander",
  "newt",
  "bird",
  "eagle",
  "hawk",
  "falcon",
  "owl",
  "crow",
  "raven",
  "robin",
  "sparrow",
  "pigeon",
  "dove",
  "swan",
  "flamingo",
  "penguin",
  "ostrich",
  "emu",
  "peacock",
  "parrot",
  "pelican",
  "woodpecker",
  "hummingbird",
  "kingfisher",
  "puffin",
  "stork",
  "heron",
  "crane",
  "seagull",
  "ant",
  "bee",
  "wasp",
  "butterfly",
  "moth",
  "beetle",
  "ladybug",
  "grasshopper",
  "cricket",
  "dragonfly",
  "mosquito",
  "fly",
  "spider",
  "scorpion",
  "centipede",
  "millipede",
];
const aliases: Record<string, string> = {
  mice: "mouse",
  geese: "goose",
  ox: "cow",
  oxen: "cow",
  calf: "cow",
  calves: "cow",
  kitten: "cat",
  kittens: "cat",
  puppy: "dog",
  puppies: "dog",
  bunny: "rabbit",
  bunnies: "rabbit",
  hippo: "hippopotamus",
  hippos: "hippopotamus",
  rhino: "rhinoceros",
  rhinos: "rhinoceros",
  deers: "deer",
  fishes: "fish",
  wolves: "wolf",
  foxes: "fox",
  butterflies: "butterfly",
  flies: "fly",
  jellyfishes: "jellyfish",
  octopi: "octopus",
  octopuses: "octopus",
};
const vocabulary = new Map<string, string>();
for (const name of ANIMALS) {
  vocabulary.set(name, name);
  vocabulary.set(name + "s", name);
}
for (const [word, name] of Object.entries(aliases)) vocabulary.set(word, name);
export type AnimalEntry = {
  raw: string;
  animal: string | null;
  repeated: boolean;
};
export function countAnimals(
  text: string,
  source: "typed" | "voice" = "typed",
) {
  const clean = text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z\s,;\n-]/g, " ")
    .replace(/-/g, " ");
  let tokens: string[] = [];
  if (source === "typed")
    tokens = clean
      .split(/[,;\n]+/)
      .map((s) => s.replace(/\s+/g, " ").trim())
      .filter(Boolean);
  else {
    const words = clean.split(/[\s,;]+/).filter(Boolean);
    for (let i = 0; i < words.length; i++) {
      const phrase = words.slice(i, i + 2).join(" ");
      if (vocabulary.has(phrase)) {
        tokens.push(phrase);
        i++;
      } else if (
        !["and", "a", "an", "the", "um", "uh", "then"].includes(words[i])
      )
        tokens.push(words[i]);
    }
  }
  const seen = new Set<string>();
  const entries: AnimalEntry[] = tokens.map((raw) => {
    const animal = vocabulary.get(raw) || null,
      repeated = !!animal && seen.has(animal);
    if (animal) seen.add(animal);
    return { raw, animal, repeated };
  });
  return {
    entries,
    unique: seen.size,
    repeats: entries.filter((e) => e.repeated).length,
    unrecognized: entries.filter((e) => !e.animal).length,
  };
}
export function circularError(a: number, b: number) {
  return Math.abs(((a - b + 540) % 360) - 180);
}
export function bearingToPort(from: number, port: number, size = 6) {
  const dx = (port % size) - (from % size),
    dy = Math.floor(from / size) - Math.floor(port / size);
  return ((Math.atan2(dx, dy) * 180) / Math.PI + 360) % 360;
}
export function voyageMap(seed: number) {
  const original = MAPS[seed % MAPS.length],
    rotation = Math.floor(seed / MAPS.length) % 4;
  const rotate = (cell: number) => {
    let x = cell % 6,
      y = Math.floor(cell / 6);
    for (let i = 0; i < rotation; i++) [x, y] = [5 - y, x];
    return y * 6 + x;
  };
  return {
    start: rotate(original.start),
    targets: original.targets.map(rotate),
    blocked: original.blocked.map(rotate),
  };
}
export function routeOptimum(map: ReturnType<typeof voyageMap>) {
  const route = [map.start, ...map.targets];
  return map.targets.reduce(
    (sum, _, i) => sum + shortestPath(route[i], route[i + 1], map.blocked),
    0,
  );
}
export const COMPASS = [
  { label: "North", arrow: "↑", degrees: 0 },
  { label: "Northeast", arrow: "↗", degrees: 45 },
  { label: "East", arrow: "→", degrees: 90 },
  { label: "Southeast", arrow: "↘", degrees: 135 },
  { label: "South", arrow: "↓", degrees: 180 },
  { label: "Southwest", arrow: "↙", degrees: 225 },
  { label: "West", arrow: "←", degrees: 270 },
  { label: "Northwest", arrow: "↖", degrees: 315 },
];
const STORIES = [
  {
    place: "Willow Garden",
    person: "Maya",
    flower: "tulips",
    object: "a blue watering can",
  },
  {
    place: "Cedar Garden",
    person: "Noah",
    flower: "daisies",
    object: "a red picnic basket",
  },
  {
    place: "Maple Garden",
    person: "Rose",
    flower: "sunflowers",
    object: "a green notebook",
  },
  {
    place: "Fern Garden",
    person: "Leo",
    flower: "roses",
    object: "a yellow umbrella",
  },
  {
    place: "Oak Garden",
    person: "Lily",
    flower: "lilies",
    object: "a purple scarf",
  },
  {
    place: "Birch Garden",
    person: "Ben",
    flower: "poppies",
    object: "an orange backpack",
  },
];
export function triviaSet(seed: number) {
  const rng = seedRandom(seed),
    s = STORIES[seed % STORIES.length];
  return {
    place: s.place,
    facts: [
      `${s.person} visited ${s.place}.`,
      `${s.person} planted ${s.flower}.`,
      `${s.person} brought ${s.object}.`,
    ],
    questions: shuffled(
      [
        {
          prompt: "Who visited the garden?",
          answer: s.person,
          options: shuffled(
            STORIES.map((x) => x.person).filter((x) => x !== s.person),
            rng,
          )
            .slice(0, 2)
            .concat(s.person),
        },
        {
          prompt: "Which flowers were planted?",
          answer: s.flower,
          options: shuffled(
            STORIES.map((x) => x.flower).filter((x) => x !== s.flower),
            rng,
          )
            .slice(0, 2)
            .concat(s.flower),
        },
        {
          prompt: "What did the visitor bring?",
          answer: s.object,
          options: shuffled(
            STORIES.map((x) => x.object).filter((x) => x !== s.object),
            rng,
          )
            .slice(0, 2)
            .concat(s.object),
        },
      ],
      rng,
    ).map((q) => ({ ...q, options: shuffled(q.options, rng) })),
  };
}
export const TRAIL_ORDER = ["1", "A", "2", "B", "3", "C", "4", "D"];
export function trailLayout(seed: number) {
  return shuffled(TRAIL_ORDER, seedRandom(seed)).map((label, i) => ({
    label,
    x: [16, 50, 84, 16, 84, 16, 50, 84][i],
    y: [16, 16, 16, 50, 50, 84, 84, 84][i],
  }));
}
