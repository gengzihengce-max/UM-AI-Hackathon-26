import React, { useEffect, useRef, useState } from "react";
import { View, Pressable, TextInput } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { Txt, Row, Button, Card, Chips, Icon, space } from "./ui";
import { C, F } from "../lib/theme";
import {
  shuffled,
  seedRandom,
  countAnimals,
  voyageMap,
  routeOptimum,
  circularError,
  bearingToPort,
  COMPASS,
  triviaSet,
  TRAIL_ORDER,
  trailLayout,
} from "../lib/game-helpers";
export type Payload = {
  endedAt?: number;
  score: number;
  metrics: { label: string; value: number; unit: string }[];
  trials: Record<string, unknown>[];
  note: string;
  early?: boolean;
};
export type EngineProps = {
  paused: boolean;
  onFinish: (x: Payload) => void;
  seed: number;
};
const clamp = (n: number) => Math.min(100, Math.max(0, n));
export function Mahjong({ paused, onFinish, seed }: EngineProps) {
  const [cards] = useState(() =>
      shuffled(["✿", "◆", "☾", "♣", "✿", "◆", "☾", "♣"], seedRandom(seed)),
    ),
    [open, setOpen] = useState<number[]>([]),
    [found, setFound] = useState<number[]>([]),
    [attempts, setAttempts] = useState(0);
  const rows = useRef<Record<string, unknown>[]>([]),
    lock = useRef(false),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function tap(i: number) {
    if (paused || lock.current || open.includes(i) || found.includes(i)) return;
    if (!open.length) {
      setOpen([i]);
      return;
    }
    const a = open[0],
      correct = cards[a] === cards[i],
      n = attempts + 1;
    rows.current.push({ kind: "pair", first: a, second: i, correct });
    setAttempts(n);
    if (correct) {
      const next = [...found, a, i];
      setFound(next);
      setOpen([]);
      if (next.length === 8)
        onFinish({
          score: clamp(400 / n),
          // eslint-disable-next-line react-hooks/purity -- Evaluated only after the final tile tap to measure the actual delay.
          endedAt: Date.now(),
          metrics: [
            { label: "Pairs found", value: 4, unit: "of 4" },
            { label: "Pair attempts", value: n, unit: "attempts" },
          ],
          trials: rows.current,
          note: "Matching game performance. Temporary demo points; no clinical interpretation.",
        });
    } else {
      lock.current = true;
      setOpen([a, i]);
      timer.current = setTimeout(() => {
        setOpen([]);
        lock.current = false;
      }, 850);
    }
  }
  return (
    <View style={{ gap: 18 }}>
      <Txt size={20} weight="extra">
        Tap two pictures that match.
      </Txt>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {cards.map((c, i) => {
          const visible = found.includes(i) || open.includes(i);
          return (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={
                visible ? `Tile ${i + 1}, ${c}` : `Face-down tile ${i + 1}`
              }
              disabled={paused || found.includes(i)}
              onPress={() => tap(i)}
              style={{
                width: "47%",
                height: 100,
                borderRadius: 24,
                backgroundColor: found.includes(i)
                  ? C.pale
                  : visible
                    ? C.amber
                    : C.blue,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Txt size={38} weight="extra">
                {visible ? c : "?"}
              </Txt>
            </Pressable>
          );
        })}
      </View>
      <Txt style={{ textAlign: "center" }}>
        Found {found.length / 2} of 4 pairs
      </Txt>
    </View>
  );
}
export function Animals({ paused, onFinish }: EngineProps) {
  const [text, setText] = useState(""),
    [started, setStarted] = useState(false),
    [done, setDone] = useState(false);
  const value = useRef(""),
    remaining = useRef(60000),
    began = useRef(0),
    ref = useRef(onFinish);
  useEffect(()=>{ref.current=onFinish;},[onFinish]);
  function end(early = false) {
    if (done) return;
    setDone(true);
    const counts = countAnimals(
      value.current,
      value.current.includes(",") || value.current.includes("\n")
        ? "typed"
        : "voice",
    );
    ref.current({
      score: clamp(
        (counts.unique / 26) * 80 +
          (counts.unique + counts.repeats
            ? 20 * (1 - counts.repeats / (counts.unique + counts.repeats))
            : 0),
      ),
      metrics: [
        {
          label: "Unique recognized animals",
          value: counts.unique,
          unit: "animals",
        },
        { label: "Repeated animals", value: counts.repeats, unit: "repeats" },
        {
          label: "Unrecognized entries",
          value: counts.unrecognized,
          unit: "entries",
        },
      ],
      trials: counts.entries,
      note: early
        ? "Round ended early; outside comparable check-ins."
        : "60-second dictionary proxy. Keyboard dictation is provided by your device; valid animals may be missed. No acoustic features measured.",
      early,
    });
  }
  useEffect(() => {
    if (!started || paused || done) return;
    began.current = Date.now();
    const timer = setTimeout(() => end(), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(
        0,
        remaining.current - (Date.now() - began.current),
      );
    };
  }, [started, paused, done]);
  const counts = countAnimals(
    text,
    text.includes(",") || text.includes("\n") ? "typed" : "voice",
  );
  return (
    <View style={{ gap: 20 }}>
      <View
        style={{
          alignItems: "center",
          padding: 22,
          backgroundColor: C.pale,
          borderRadius: 32,
        }}
      >
        <Txt size={78} weight="extra">
          {counts.unique}
        </Txt>
        <Txt weight="bold">different animals</Txt>
        <Txt size={12}>
          {counts.repeats} repeats · {counts.unrecognized} unrecognized
        </Txt>
      </View>
      <Txt size={21} weight="extra">
        Animals, big and small.
      </Txt>
      <Txt>
        Type names with commas, or tap the dictation microphone on your phone
        keyboard to speak.
      </Txt>
      {!started ? (
        <Button tone="coral" onPress={() => setStarted(true)}>
          Begin 60-second round
        </Button>
      ) : (
        <>
          <TextInput
            accessibilityLabel="Animal names"
            autoFocus
            multiline
            editable={!paused}
            value={text}
            onChangeText={(t) => {
              setText(t);
              value.current = t;
            }}
            placeholder="cat, elephant, owl…"
            style={{
              minHeight: 130,
              borderRadius: 24,
              borderWidth: 1.5,
              borderColor: C.line,
              padding: 18,
              fontSize: 20,
              fontFamily: F.regular,
              color: C.ink,
              textAlignVertical: "top",
            }}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 7 }}>
            {counts.entries.map((e, i) => (
              <View
                key={i}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 16,
                  backgroundColor: !e.animal
                    ? C.soft
                    : e.repeated
                      ? C.amberBg
                      : C.pale,
                }}
              >
                <Txt size={12}>
                  {e.animal || e.raw} {e.repeated ? "↻" : e.animal ? "✓" : "?"}
                </Txt>
              </View>
            ))}
          </View>
          <Txt size={12} color={C.muted}>
            The round ends automatically. No visible countdown, as in Iteration
            2.
          </Txt>
          <Button small tone="ghost" onPress={() => end(true)}>
            End round for now
          </Button>
        </>
      )}
    </View>
  );
}
export function Voyage({ paused, onFinish, seed }: EngineProps) {
  const [map] = useState(() => voyageMap(seed)),
    [phase, setPhase] = useState("study"),
    [pos, setPos] = useState(map.start),
    [stop, setStop] = useState(0),
    [moves, setMoves] = useState(0);
  const rows = useRef<Record<string, unknown>[]>([]);
  useEffect(() => {
    if (phase !== "study" || paused) return;
    const t = setTimeout(() => setPhase("sail"), 8000);
    return () => clearTimeout(t);
  }, [phase, paused]);
  function move(d: number) {
    if (paused) return;
    const n = pos + d;
    if (
      n < 0 ||
      n > 35 ||
      map.blocked.includes(n) ||
      (d === 1 && pos % 6 === 5) ||
      (d === -1 && pos % 6 === 0)
    )
      return;
    setPos(n);
    setMoves(moves + 1);
    rows.current.push({ kind: "move", from: pos, to: n });
    if (n === map.targets[stop]) {
      if (stop === 2) setPhase("point");
      else setStop(stop + 1);
    }
  }
  if (phase === "point")
    return (
      <View style={{ gap: 20 }}>
        <Txt size={25} weight="extra">
          Which way is your home port?
        </Txt>
        <Txt>
          The map is hidden. North stays up. Point directly toward where you
          began.
        </Txt>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {COMPASS.map((c) => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={"Point " + c.label}
              key={c.label}
              disabled={paused}
              onPress={() => {
                const error = circularError(
                    c.degrees,
                    bearingToPort(pos, map.start),
                  ),
                  efficiency = (100 * routeOptimum(map)) / moves;
                onFinish({
                  score: clamp(efficiency * 0.5 + (1 - error / 180) * 50),
                  metrics: [
                    { label: "Route efficiency", value: efficiency, unit: "%" },
                    { label: "Pointing error", value: error, unit: "degrees" },
                    {
                      label: "Extra moves",
                      value: moves - routeOptimum(map),
                      unit: "moves",
                    },
                  ],
                  trials: [
                    ...rows.current,
                    { kind: "pointing", selected: c.degrees, error },
                  ],
                  note: "Eight compass choices on a north-up grid. Angular error includes quantization. This is a game proxy, not a validated navigation assessment.",
                });
              }}
              style={{
                width: "48%",
                minHeight: 86,
                borderRadius: 25,
                backgroundColor: C.pale,
                padding: 13,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Txt size={28}>{c.arrow}</Txt>
              <Txt size={13} weight="bold">
                {c.label}
              </Txt>
            </Pressable>
          ))}
        </View>
      </View>
    );
  return (
    <View style={{ gap: 20 }}>
      <Txt size={20} weight="extra">
        {phase === "study"
          ? "Remember the port and the route."
          : `Find buoy ${stop + 1}`}
      </Txt>
      <Txt size={12}>
        North ↑ · {phase === "study" ? "Port ⚑ → 1 → 2 → 3" : `${moves} moves`}
      </Txt>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 4,
          backgroundColor: C.pale,
          borderRadius: 24,
          padding: 10,
        }}
      >
        {Array.from({ length: 36 }, (_, i) => (
          <View
            key={i}
            style={{
              width: "15.2%",
              aspectRatio: 1,
              borderRadius: 10,
              backgroundColor: map.blocked.includes(i)
                ? "#8FAE91"
                : i === pos
                  ? C.amber
                  : "#CBE9F3",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Txt weight="extra" size={18}>
              {map.blocked.includes(i)
                ? "▲"
                : phase === "study" && i === map.start
                  ? "⚑"
                  : i === pos
                    ? "⛵"
                    : phase === "study" && map.targets.includes(i)
                      ? map.targets.indexOf(i) + 1
                      : "·"}
            </Txt>
          </View>
        ))}
      </View>
      {phase === "sail" && (
        <View style={{ alignItems: "center", gap: 8 }}>
          <Button
            small
            tone="blue"
            onPress={() => move(-6)}
            accessibilityLabel="Sail north"
          >
            ↑
          </Button>
          <Row>
            <Button
              small
              tone="blue"
              onPress={() => move(-1)}
              accessibilityLabel="Sail west"
            >
              ←
            </Button>
            <Button
              small
              tone="blue"
              onPress={() => move(6)}
              accessibilityLabel="Sail south"
            >
              ↓
            </Button>
            <Button
              small
              tone="blue"
              onPress={() => move(1)}
              accessibilityLabel="Sail east"
            >
              →
            </Button>
          </Row>
        </View>
      )}
      <Txt color={C.muted} size={12}>
        {phase === "study"
          ? "The labels will hide in a moment."
          : "The port and buoy labels are hidden. Remember where they were."}
      </Txt>
    </View>
  );
}
export function Trivia({ paused, onFinish, seed }: EngineProps) {
  const [story] = useState(() => triviaSet(seed)),
    [phase, setPhase] = useState("learn"),
    [q, setQ] = useState(0);
  const rows = useRef<Record<string, unknown>[]>([]),
    learned = useRef(0),
    delay = useRef(0);
  function handleDelayFinish(r:Payload){
    delay.current = (r.endedAt! - learned.current)/1000;
    rows.current.push(...r.trials.map(t=>({...t,kind:'delay-pair'})));
    setPhase('quiz');
  }
  if (phase === "learn")
    return (
      <View style={{ gap: 18 }}>
        <Txt weight="extra" size={23}>
          A visit to {story.place}.
        </Txt>
        <Txt>Learn these three facts. We’ll ask about them after Mahjong.</Txt>
        {story.facts.map((f, i) => (
          <Card key={f} color={C.amberBg}>
            <Txt weight="bold">
              {i + 1}. {f}
            </Txt>
          </Card>
        ))}
        <Button
          tone="coral"
          onPress={() => {
            learned.current = Date.now();
            setPhase("delay");
          }}
        >
          I’ve learned the facts
        </Button>
      </View>
    );
  if (phase === "delay")
    return (
      <View style={{ gap: 18 }}>
        <Card color={C.amberBg}>
          <Txt weight="extra">Mahjong comes before the quiz.</Txt>
          <Txt size={13}>The facts stay hidden while you play.</Txt>
        </Card>
        <Mahjong
          seed={seed + 19}
          paused={paused}
          onFinish={handleDelayFinish}
        />
      </View>
    );
  const item = story.questions[q];
  return (
    <View style={{ gap: 22 }}>
      <Txt size={12}>Recall · question {q + 1} of 3</Txt>
      <Txt size={25} weight="extra">
        {item.prompt}
      </Txt>
      {item.options.map((option) => (
        <Button
          key={option}
          tone="pale"
          disabled={paused}
          onPress={() => {
            rows.current.push({
              kind: "quiz",
              response: option,
              expected: item.answer,
              correct: option === item.answer,
            });
            if (q < 2) setQ(q + 1);
            else {
              const correct = rows.current.filter(
                (t) => t.kind === "quiz" && t.correct,
              ).length;
              onFinish({
                score: (100 * correct) / 3,
                metrics: [
                  {
                    label: "Delayed quiz accuracy",
                    value: (100 * correct) / 3,
                    unit: "%",
                  },
                  {
                    label: "Actual recall delay",
                    value: delay.current,
                    unit: "seconds",
                  },
                ],
                trials: rows.current,
                note: "Three taught facts tested after an actual Mahjong round. Multiple-choice delayed recognition, not free recall. Different delay lengths can affect results.",
              });
            }
          }}
        >
          {option}
        </Button>
      ))}
    </View>
  );
}
export function Bonus({ paused, onFinish, seed }: EngineProps) {
  const [mode, setMode] = useState(""),
    [layout] = useState(() => trailLayout(seed)),
    [next, setNext] = useState(0),
    [path, setPath] = useState<string[]>([]),
    [message, setMessage] = useState(""),
    [symbolQ, setSymbolQ] = useState(0);
  const started = useRef(0),
    rows = useRef<Record<string, unknown>[]>([]);
  const shapes = ["✿", "◆", "☾", "♣"],
    targets = [0, 2, 1, 3, 2, 0, 3, 1];
  if (!mode)
    return (
      <View style={{ gap: 20 }}>
        <Txt size={24} weight="extra">
          Choose your bonus round.
        </Txt>
        <Button
          tone="blue"
          onPress={() => {
            started.current = Date.now();
            setMode("trail");
          }}
        >
          Connect 1–A–2–B
        </Button>
        <Button
          tone="amber"
          onPress={() => {
            started.current = Date.now();
            setMode("symbol");
          }}
        >
          Match symbols to a key
        </Button>
        <Txt size={12}>
          Only the bonus rounds are included in this prototype.
        </Txt>
      </View>
    );
  if (mode === "symbol")
    return (
      <View style={{ gap: 25 }}>
        <Txt size={20} weight="extra">
          Use the key · {symbolQ + 1} of 8
        </Txt>
        <Row style={{ justifyContent: "space-between" }}>
          {shapes.map((s, i) => (
            <Card
              key={s}
              color={C.pale}
              style={{ padding: 12, alignItems: "center", minWidth: 58 }}
            >
              <Txt size={29}>{s}</Txt>
              <Txt weight="bold">{i + 1}</Txt>
            </Card>
          ))}
        </Row>
        <Txt size={75} style={{ textAlign: "center", marginVertical: 25 }}>
          {shapes[targets[symbolQ]]}
        </Txt>
        <Row style={{ flexWrap: "wrap" }}>
          {shapes.map((_, i) => (
            <Button
              key={i}
              disabled={paused}
              tone="pale"
              style={{ width: "47%" }}
              onPress={() => {
                rows.current.push({
                  kind: "symbol",
                  response: i,
                  correct: i === targets[symbolQ],
                });
                if (symbolQ < 7) setSymbolQ(symbolQ + 1);
                else {
                  const accuracy =
                    (100 * rows.current.filter((t) => t.correct).length) / 8;
                  onFinish({
                    score: accuracy,
                    metrics: [
                      { label: "Symbol accuracy", value: accuracy, unit: "%" },
                      {
                        label: "Completion time",
                        value: (Date.now() - started.current) / 1000,
                        unit: "seconds",
                      },
                    ],
                    trials: rows.current,
                    note: "Visible-key symbol matching. Temporary game score; no clinical norms.",
                  });
                }
              }}
            >
              {i + 1}
            </Button>
          ))}
        </Row>
      </View>
    );
  return (
    <View style={{ gap: 18 }}>
      <Txt size={22} weight="extra">
        Next: {TRAIL_ORDER[next]}
      </Txt>
      <Txt>1 → A → 2 → B → 3 → C → 4 → D</Txt>
      <View
        style={{
          width: "100%",
          aspectRatio: 1,
          borderRadius: 30,
          backgroundColor: C.pale,
        }}
      >
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          style={{ position: "absolute" }}
        >
          <Polyline
            fill="none"
            stroke={C.ink}
            strokeWidth="1.2"
            points={path
              .map((label) => {
                const n = layout.find((p) => p.label === label)!;
                return `${n.x},${n.y}`;
              })
              .join(" ")}
          />
        </Svg>
        {layout.map((n) => (
          <Pressable
            key={n.label}
            accessibilityRole="button"
            accessibilityLabel={"Trail target " + n.label}
            disabled={paused || path.includes(n.label)}
            onPress={() => {
              const correct = n.label === TRAIL_ORDER[next];
              rows.current.push({
                kind: "trail",
                response: n.label,
                expected: TRAIL_ORDER[next],
                correct,
              });
              if (!correct) {
                setMessage(`Next is ${TRAIL_ORDER[next]}. Try again.`);
                return;
              }
              setPath([...path, n.label]);
              setMessage("");
              if (next === 7) {
                const seconds = (Date.now() - started.current) / 1000,
                  errors = rows.current.filter((t) => !t.correct).length;
                onFinish({
                  score:
                    clamp(((90 - seconds) / 82) * 100) * 0.6 +
                    clamp(((8 - errors) / 8) * 100) * 0.4,
                  metrics: [
                    {
                      label: "Trail completion time",
                      value: seconds,
                      unit: "seconds",
                    },
                    {
                      label: "Wrong selections",
                      value: errors,
                      unit: "errors",
                    },
                  ],
                  trials: rows.current,
                  note: "Eight guided alternating targets with tap input. Not a standardized Trail Making Test.",
                });
              } else setNext(next + 1);
            }}
            style={{
              position: "absolute",
              left: `${n.x}%`,
              top: `${n.y}%`,
              transform: [{ translateX: -26 }, { translateY: -26 }],
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: path.includes(n.label) ? C.blue : C.white,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Txt size={23} weight="extra">
              {n.label}
            </Txt>
          </Pressable>
        ))}
      </View>
      <Txt color={C.muted} size={13}>
        {message || "Tap the next target. No dragging needed."}
      </Txt>
    </View>
  );
}
