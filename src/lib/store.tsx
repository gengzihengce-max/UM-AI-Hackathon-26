import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GameId } from "./theme";
import yearFile from "../../assets/data/year.json";
export const YEAR = yearFile;
export type Prefs = {
  demo: boolean;
  name: string;
  email: string;
  onboarded: boolean;
  language: string;
  age: string;
  sex: string;
  role: string;
  backgrounds: string[];
  schooling: string;
  textSize: number;
  vision: string;
  contrast: boolean;
  readAloud: boolean;
  reducedMotion: boolean;
  hand: string;
  reminders: boolean;
  days: number[];
  time: string;
  research: boolean;
  hidden: GameId[];
  ratings: Partial<Record<GameId, "liked" | "hidden">>;
};
export type Round = {
  id: string;
  game: GameId;
  score: number;
  metrics: { label: string; value: number; unit: string }[];
  trials: Record<string, unknown>[];
  at: string;
  practice: boolean;
  paused: boolean;
  note: string;
  protocol: string;
  origin: "interactive-pitch-demo";
};
export type Plan = { games: GameId[]; done: GameId[]; started: boolean };
const initial: Prefs = {
  demo: false,
  name: "",
  email: "",
  onboarded: false,
  language: "English",
  age: "65–74",
  sex: "Female",
  role: "Me",
  backgrounds: [],
  schooling: "Prefer not to say",
  textSize: 1,
  vision: "Standard",
  contrast: false,
  readAloud: false,
  reducedMotion: false,
  hand: "Right",
  reminders: true,
  days: [0, 2, 4],
  time: "10:00 AM",
  research: false,
  hidden: [],
  ratings: {},
};
const defaultPlan: Plan = {
  games: ["memory", "words", "voyage"],
  done: [],
  started: false,
};
type Store = {
  prefs: Prefs;
  patch: (p: Partial<Prefs>) => void;
  plan: Plan;
  setPlan: React.Dispatch<React.SetStateAction<Plan>>;
  start: () => void;
  rounds: Round[];
  result: Round | null;
  finish: (
    r: Omit<Round, "id" | "at" | "protocol" | "origin">,
    inPlan: boolean,
  ) => void;
  practice: boolean;
  setPractice: (v: boolean) => void;
  month: number;
  setMonth: (n: number) => void;
  resetPitch: () => void;
  ready: boolean;
};
const Context = createContext<Store | null>(null);
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState(initial),
    [plan, setPlan] = useState(defaultPlan),
    [rounds, setRounds] = useState<Round[]>([]),
    [result, setResult] = useState<Round | null>(null),
    [practice, setPractice] = useState(false),
    [month, setMonth] = useState(7),
    [ready, setReady] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("memory-garden-web-v2")
      .then((raw) => {
        if (raw) {
          const x = JSON.parse(raw);
          setPrefs({ ...initial, ...x.prefs });
          setPlan(x.plan || defaultPlan);
          setRounds(x.rounds || []);
          setMonth(x.month ?? 7);
        }
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);
  useEffect(() => {
    if (ready)
      void AsyncStorage.setItem(
        "memory-garden-web-v2",
        JSON.stringify({ prefs, plan, rounds, month }),
      ).catch(() => {});
  }, [prefs, plan, rounds, month, ready]);
  function start() {
    setPlan((p) => {
      if (p.done.length === p.games.length)
        return { ...defaultPlan, started: true };
      const games = p.games.filter((g) => !prefs.hidden.includes(g));
      return {
        games: games.length ? games : defaultPlan.games,
        done: p.done.filter((g) => games.includes(g)),
        started: true,
      };
    });
  }
  function finish(
    input: Omit<Round, "id" | "at" | "protocol" | "origin">,
    inPlan: boolean,
  ) {
    const round: Round = {
      ...input,
      id: `pitch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      at: new Date().toISOString(),
      origin: "interactive-pitch-demo",
      protocol: `native-1|text:${prefs.textSize}|vision:${prefs.vision}|motion:${prefs.reducedMotion}|hand:${prefs.hand}|contrast:${prefs.contrast}`,
    };
    setResult(round);
    setRounds((prev) => [...prev, round]);
    if (inPlan && !round.practice)
      setPlan((p) =>
        p.games.find((g) => !p.done.includes(g)) === round.game
          ? { ...p, done: [...p.done, round.game] }
          : p,
      );
  }
  function resetPitch() {
    setPrefs(initial);
    setPlan(defaultPlan);
    setRounds([]);
    setResult(null);
    setMonth(7);
    setPractice(false);
  }
  return (
    <Context.Provider
      value={{
        prefs,
        patch: (p) => setPrefs((x) => ({ ...x, ...p })),
        plan,
        setPlan,
        start,
        rounds,
        result,
        finish,
        practice,
        setPractice,
        month,
        setMonth,
        resetPitch,
        ready,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useApp() {
  const c = useContext(Context);
  if (!c) throw Error("Missing app provider");
  return c;
}
// The fictional demo profile (Evelyn) uses the synthetic year.
export const DEMO_PROFILE: Partial<Prefs> = {
  demo: true,
  onboarded: true,
  name: "Evelyn",
  email: "evelyn@example.com",
  age: "65–74",
  sex: "Female",
};
export type TrendPoint = { score: number; raw: number } | null;
export type TrendData = {
  months: { key: string; label: string; short: string }[];
  series: { id: string; points: TrendPoint[] }[];
};
// A registered user's own check-ins, grouped by day (practice rounds excluded).
export function userTrend(rounds: Round[]): TrendData {
  const scored = rounds.filter((r) => !r.practice && !r.paused);
  const days = [...new Set(scored.map((r) => r.at.slice(0, 10)))].sort();
  const months = days.map((d) => {
    const dt = new Date(d + "T12:00:00");
    const short = dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return { key: d, label: short, short };
  });
  const ids = [...new Set(scored.map((r) => r.game))];
  const series = ids.map((id) => ({
    id,
    points: days.map((d) => {
      const xs = scored.filter((r) => r.game === id && r.at.startsWith(d));
      if (!xs.length) return null;
      const m = avg(xs.map((r) => r.score));
      return { score: m, raw: m };
    }),
  }));
  return { months, series };
}
export function gameSeries(game: GameId) {
  return YEAR.series.find((s) => s.id === game)!;
}
export function avg(a: number[]) {
  return a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0;
}
export function number(v: number | null | undefined, decimals = 1) {
  return v == null ? "—" : v.toFixed(decimals);
}
