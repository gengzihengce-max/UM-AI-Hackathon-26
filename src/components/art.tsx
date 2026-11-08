import React, { useState } from "react";
import { View, Pressable } from "react-native";
import Svg, {
  Circle,
  Path,
  Rect,
  Line,
  Text as SvgText,
  G,
  Polyline,
  Polygon,
  Defs,
  LinearGradient,
  Stop,
  TSpan,
} from "react-native-svg";
import { C, F, GAME_INFO, GameId } from "../lib/theme";
import { YEAR, TrendData } from "../lib/store";
import { Row, Txt, Icon } from "./ui";
export function Cloud({
  size = 112,
  thinking = false,
}: {
  size?: number;
  thinking?: boolean;
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      accessibilityLabel={
        thinking ? "Your helper, thinking" : "Your garden helper"
      }
    >
      <Path
        d="M27 96C7 94 8 65 25 61C19 37 45 24 59 37C73 12 111 23 111 49C138 47 144 80 123 91C118 113 93 119 78 107C61 124 37 118 35 103Z"
        fill={C.pale}
        stroke={C.ink}
        strokeWidth="2.5"
      />
      {thinking ? (
        <>
          <Path
            d="M29 49Q68 21 109 46L99 30Q61 8 31 31Z"
            fill={C.blue}
            stroke={C.ink}
            strokeWidth="2"
          />
          <G stroke={C.ink} strokeWidth="2">
            <Circle cx="58" cy="50" r="14" fill={C.amber} />
            <Circle cx="87" cy="43" r="11" fill={C.coral} />
            <Path d="M58 30V36M58 64V70M38 50H44M72 50H78M44 36L48 40M68 60L73 65M87 27V32M87 54V59M72 43H77M97 43H102" />
          </G>
        </>
      ) : (
        <Path
          d="M48 36Q62 23 77 31"
          fill="none"
          stroke={C.white}
          strokeWidth="7"
          strokeLinecap="round"
        />
      )}
      <Circle cx="51" cy="79" r="4" fill={C.ink} />
      <Circle cx="91" cy="79" r="4" fill={C.ink} />
      <Path
        d="M62 94Q71 102 81 93"
        fill="none"
        stroke={C.ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Circle cx="36" cy="89" r="7" fill={C.coral} opacity=".6" />
      <Circle cx="108" cy="89" r="7" fill={C.coral} opacity=".6" />
    </Svg>
  );
}
export function GamePicture({
  game,
  height = 130,
}: {
  game: GameId;
  height?: number;
}) {
  const g = GAME_INFO[game];
  return (
    <Svg
      height={height}
      width="100%"
      viewBox="0 0 320 140"
      accessibilityLabel={g.title + " illustration"}
    >
      <Rect width="320" height="140" rx="25" fill={g.color} />
      {game === "memory" ? (
        <>
          {[0, 1, 2].map((n) => (
            <G key={n} transform={`rotate(${(n - 1) * 8} ${95 + n * 62} 70)`}>
              <Rect
                x={65 + n * 62}
                y="30"
                width="59"
                height="82"
                rx="14"
                fill={C.white}
              />
              <SvgText
                x={94 + n * 62}
                y="84"
                textAnchor="middle"
                fontSize="35"
                fill={C.ink}
              >
                {["✿", "◆", "✿"][n]}
              </SvgText>
            </G>
          ))}
        </>
      ) : game === "voyage" ? (
        <>
          <Path
            d="M0 105Q45 87 90 105T180 105T270 105T350 105V140H0Z"
            fill={C.white}
            opacity=".35"
          />
          <Path d="M110 98H205L187 116H129Z" fill={C.ink} />
          <Path d="M155 28V94H111Z" fill={C.white} />
          <Path d="M161 37V94H201Z" fill={C.amber} />
          <Circle cx="250" cy="37" r="20" fill={C.amber} />
          <Path
            d="M42 116V59L66 68L42 78"
            fill={C.coral}
            stroke={C.ink}
            strokeWidth="3"
          />
        </>
      ) : game === "words" ? (
        <>
          <Rect x="55" y="27" width="104" height="81" rx="23" fill={C.white} />
          <Path d="M83 106L70 122L72 102" fill={C.white} />
          <SvgText
            x="106"
            y="80"
            textAnchor="middle"
            fontSize="36"
            fill={C.ink}
          >
            cat
          </SvgText>
          <Circle cx="218" cy="72" r="43" fill={C.amber} />
          <SvgText
            x="218"
            y="85"
            textAnchor="middle"
            fontSize="38"
            fontWeight="bold"
            fill={C.ink}
          >
            +1
          </SvgText>
        </>
      ) : game === "trivia" ? (
        <>
          <Path
            d="M66 106V34Q113 20 158 40Q201 20 252 34V106Q203 94 158 115Q113 94 66 106Z"
            fill={C.white}
          />
          <Path
            d="M158 40V115M86 51H132M86 68H132M86 85H122M181 51H229M181 68H229M181 85H218"
            stroke={C.ink}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          {["1", "A", "2", "B"].map((t, i) => (
            <G key={t}>
              <Circle
                cx={60 + i * 65}
                cy={i % 2 ? 88 : 50}
                r="26"
                fill={C.white}
              />
              <SvgText
                x={60 + i * 65}
                y={(i % 2 ? 88 : 50) + 9}
                textAnchor="middle"
                fontWeight="bold"
                fontSize="26"
                fill={C.ink}
              >
                {t}
              </SvgText>
            </G>
          ))}
          <Path
            d="M79 63L106 76M145 76L169 63M209 63L232 76"
            stroke={C.ink}
            strokeWidth="3"
            fill="none"
          />
        </>
      )}
    </Svg>
  );
}
export function Ring({
  value,
  label = "demo points",
  range = false,
}: {
  value: number;
  label?: string;
  range?: boolean;
}) {
  const circumference = 2 * Math.PI * 67;
  return (
    <Svg
      width="190"
      height="190"
      viewBox="0 0 190 190"
      accessibilityLabel={`${Math.round(value)} ${label}${range ? "; outer arc shows illustrative usual range" : ""}`}
    >
      <Circle
        cx="95"
        cy="95"
        r="82"
        stroke={C.pale}
        strokeWidth="6"
        fill="none"
      />
      {range && (
        <Circle
          cx="95"
          cy="95"
          r="82"
          stroke={C.amber}
          strokeWidth="7"
          strokeDasharray="100 416"
          transform="rotate(130 95 95)"
          fill="none"
        />
      )}
      <Circle
        cx="95"
        cy="95"
        r="67"
        stroke={C.pale}
        strokeWidth="17"
        fill="none"
      />
      <Circle
        cx="95"
        cy="95"
        r="67"
        stroke={C.blue}
        strokeWidth="17"
        strokeLinecap="round"
        fill="none"
        strokeDasharray={`${(circumference * Math.max(0, Math.min(100, value))) / 100} ${circumference}`}
        transform="rotate(-90 95 95)"
      />
      <SvgText
        x="95"
        y="101"
        fontSize="39"
        fontWeight="800"
        textAnchor="middle"
        fill={C.ink}
      >
        {Math.round(value)}
      </SvgText>
      <SvgText x="95" y="124" fontSize="12" textAnchor="middle" fill={C.muted}>
        {label}
      </SvgText>
    </Svg>
  );
}
export const SERIES_COLORS: Record<string, string> = {
  memory: C.blue,
  words: C.coral,
  voyage: C.green,
  trivia: C.purple,
  switch: C.amber,
};
const SHORT: Record<string, string> = {
  memory: "Mahjong",
  words: "Daily Word",
  voyage: "Voyage",
  trivia: "Trivia",
  switch: "Bonus",
};
type Pt = { x: number; y: number };
// Monotone cubic curve (Fritsch–Carlson): smooth, but never overshoots the data.
function smoothPath(pts: Pt[]) {
  if (!pts.length) return "";
  if (pts.length === 1) return `M${pts[0].x},${pts[0].y}`;
  const n = pts.length,
    m: number[] = [],
    t: number[] = [];
  for (let i = 0; i < n - 1; i++)
    m.push((pts[i + 1].y - pts[i].y) / (pts[i + 1].x - pts[i].x || 1));
  t[0] = m[0];
  t[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++)
    t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
      continue;
    }
    const a = t[i] / m[i],
      b = t[i + 1] / m[i],
      s = a * a + b * b;
    if (s > 9) {
      const k = 3 / Math.sqrt(s);
      t[i] = k * a * m[i];
      t[i + 1] = k * b * m[i];
    }
  }
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const dx = (pts[i + 1].x - pts[i].x) / 3;
    d += ` C${pts[i].x + dx},${pts[i].y + t[i] * dx} ${pts[i + 1].x - dx},${pts[i + 1].y - t[i + 1] * dx} ${pts[i + 1].x},${pts[i + 1].y}`;
  }
  return d;
}
function niceStep(range: number) {
  const raw = range / 4,
    p = Math.pow(10, Math.floor(Math.log10(raw || 1))),
    f = raw / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
}
const fmt = (v: number) =>
  Math.abs(v) >= 20 ? String(Math.round(v)) : String(Math.round(v * 10) / 10);
export function TrendChart({
  month = 11,
  game,
  raw = false,
  height = 250,
  data,
}: {
  month?: number;
  game?: GameId;
  raw?: boolean;
  height?: number;
  data?: TrendData;
}) {
  const [focus, setFocus] = useState<string | null>(null);
  const daily = !!data,
    src: TrendData = data || (YEAR as unknown as TrendData);
  month = Math.min(month, src.months.length - 1);
  const single = !!game,
    series = src.series.filter((s) => !game || s.id === game),
    val = (p: { score: number; raw: number }) => (raw ? p.raw : p.score),
    ptsOf = (s: TrendData["series"][number]) =>
      s.points
        .slice(0, month + 1)
        .map((p, i) => (p ? { i, v: val(p) } : null))
        .filter((p): p is { i: number; v: number } => !!p && p.v != null),
    fact = single && !daily ? YEAR.facts.find((f) => f.id === game) : undefined,
    base = fact ? (raw ? fact.baseline.raw : fact.baseline.score) : null,
    values = series.flatMap((s) => ptsOf(s).map((p) => p.v));
  if (month < 0 || !values.length)
    return (
      <View style={{ paddingVertical: 28, alignItems: "center", gap: 6 }}>
        <Icon name="analytics-outline" size={30} color={C.muted} />
        <Txt size={13} color={C.muted} style={{ textAlign: "center" }}>
          Your trend lines appear here after your first check-in.
        </Txt>
      </View>
    );
  if (base != null) values.push(base);
  // Y domain: zoom to where the data is, on round numbers.
  const vMin = Math.min(...values),
    vMax = Math.max(...values),
    step = niceStep(Math.max(vMax - vMin, raw ? 1 : 20)),
    lo = Math.max(0, Math.floor((vMin - step * 0.4) / step) * step),
    hi = raw
      ? Math.ceil((vMax + step * 0.4) / step) * step
      : Math.min(100, Math.ceil((vMax + step * 0.2) / step) * step);
  const ticks: number[] = [];
  for (let v = lo; v <= hi + 1e-9; v += step) ticks.push(v);
  // Geometry: room on the right for direct end labels.
  const w = 340,
    h = height,
    left = 30,
    right = single ? 300 : 258,
    top = raw ? 26 : 14,
    bottom = h - 42,
    span = Math.max(1, month),
    x = (i: number) =>
      month === 0 ? (left + right) / 2 : left + (i / span) * (right - left),
    y = (v: number) => bottom - ((v - lo) / (hi - lo || 1)) * (bottom - top);
  const direction = single && raw && !daily
    ? (YEAR.sessions as any[])
        .find((s) => s.game === game)
        ?.metrics.find((mm: any) => mm.key === fact?.key)?.direction
    : null;
  // End labels, nudged apart so they never overlap.
  const ends = series
    .map((s) => {
      const p = ptsOf(s).at(-1);
      return p ? { id: s.id, i: p.i, v: p.v, y: y(p.v), ly: y(p.v) } : null;
    })
    .filter((e): e is NonNullable<typeof e> => !!e)
    .sort((a, b) => a.ly - b.ly);
  const gap = 13;
  for (let i = 1; i < ends.length; i++)
    if (ends[i].ly < ends[i - 1].ly + gap) ends[i].ly = ends[i - 1].ly + gap;
  for (let i = ends.length - 1; i >= 0; i--) {
    const max = i === ends.length - 1 ? bottom + 4 : ends[i + 1].ly - gap;
    if (ends[i].ly > max) ends[i].ly = max;
  }
  const months = src.months.slice(0, month + 1),
    initials = !daily && months.length > 7,
    showLabel = (i: number) =>
      !daily ||
      months.length <= 4 ||
      i === 0 ||
      i === month ||
      i === Math.round(month / 2);
  const dim = (id: string) => focus !== null && focus !== id;
  const order = [...series].sort(
    (a, b) => (a.id === focus ? 1 : 0) - (b.id === focus ? 1 : 0),
  );
  return (
    <View
      accessible
      accessibilityLabel={
        daily
          ? `Your check-in scores by day, through ${src.months[month].label}.`
          : `${raw ? "Raw measurements" : "Monthly mean placeholder game score"}, through ${YEAR.months[month].label}. Synthetic data.`
      }
      style={{ paddingTop: 6 }}
    >
      <Svg
        height={h}
        width="100%"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <Defs>
          {series.map((s) => (
            <LinearGradient
              key={s.id}
              id={`fill-${s.id}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <Stop offset="0" stopColor={SERIES_COLORS[s.id]} stopOpacity="0.35" />
              <Stop offset="1" stopColor={SERIES_COLORS[s.id]} stopOpacity="0" />
            </LinearGradient>
          ))}
        </Defs>
        {direction && direction !== "neutral" && (
          <SvgText x={left} y="12" fontSize="10" fontFamily={F.bold} fill={C.muted}>
            {direction === "lower" ? "↓ Lower is better" : "↑ Higher is better"}
          </SvgText>
        )}
        {ticks.map((v) => (
          <G key={v}>
            <Line
              x1={left}
              x2={right}
              y1={y(v)}
              y2={y(v)}
              stroke={v === lo ? "#C9D6DF" : "#E8EEF2"}
              strokeWidth={v === lo ? 1.2 : 1}
            />
            <SvgText
              x={left - 6}
              y={y(v) + 3.5}
              textAnchor="end"
              fontSize="10"
              fontFamily={F.medium}
              fill={C.muted}
            >
              {fmt(v)}
            </SvgText>
          </G>
        ))}
        {base != null && (
          <G>
            <Line
              x1={left}
              x2={right}
              y1={y(base)}
              y2={y(base)}
              stroke={C.ink}
              strokeOpacity="0.55"
              strokeDasharray="5 4"
              strokeWidth="1.4"
            />
            <SvgText
              x={right + 6}
              y={y(base) - 2}
              fontSize="9"
              fontFamily={F.medium}
              fill={C.muted}
            >
              Baseline
            </SvgText>
            <SvgText
              x={right + 6}
              y={y(base) + 10}
              fontSize="11"
              fontFamily={F.extra}
              fill={C.ink}
            >
              {fmt(base)}
            </SvgText>
          </G>
        )}
        {order.map((s) => {
          const pts = ptsOf(s).map((p) => ({ x: x(p.i), y: y(p.v) }));
          if (!pts.length) return null;
          const d = smoothPath(pts),
            color = SERIES_COLORS[s.id],
            focused = focus === s.id,
            faded = dim(s.id),
            last = pts[pts.length - 1];
          return (
            <G key={s.id} opacity={faded ? 0.16 : 1}>
              {(single || focused) && pts.length > 1 && (
                <Path
                  d={`${d} L${last.x},${bottom} L${pts[0].x},${bottom} Z`}
                  fill={`url(#fill-${s.id})`}
                />
              )}
              <Path
                d={d}
                stroke={color}
                strokeWidth={single || focused ? 3.6 : 2.6}
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {(single || focused) &&
                pts.slice(0, -1).map((p, i) => (
                  <Circle key={i} cx={p.x} cy={p.y} r="2.8" fill="#FFFFFF" stroke={color} strokeWidth="1.8" />
                ))}
              <Circle cx={last.x} cy={last.y} r="5.5" fill={color} stroke="#FFFFFF" strokeWidth="2.2" />
            </G>
          );
        })}
        {ends.map((e) => (
          <G key={e.id} opacity={dim(e.id) ? 0.25 : 1}>
            {single ? (
              <SvgText
                x={x(e.i)}
                y={e.y - 11}
                textAnchor="middle"
                fontSize="12"
                fontFamily={F.extra}
                fill={C.ink}
              >
                {fmt(e.v)}
              </SvgText>
            ) : (
              <SvgText
                x={right + 10}
                y={e.ly + 3.5}
                fontSize="10"
                fontFamily={F.bold}
                fill={C.ink}
              >
                <TSpan fontFamily={F.extra} fill={SERIES_COLORS[e.id]}>
                  {`${fmt(e.v)} `}
                </TSpan>
                {SHORT[e.id]}
              </SvgText>
            )}
          </G>
        ))}
        {months.map((m, i) => showLabel(i) && (
          <SvgText
            key={m.key}
            x={x(i)}
            y={bottom + 17}
            textAnchor="middle"
            fontSize="10"
            fontFamily={i === month ? F.extra : F.medium}
            fill={i === month ? C.ink : C.muted}
          >
            {initials ? m.short[0] : m.short}
          </SvgText>
        ))}
        {months
          .map((m, i) => ({ m, i }))
          .filter(({ m, i }) => !daily && (i === 0 || m.key.endsWith("-01")))
          .map(({ m, i }) => (
            <SvgText
              key={`yr-${m.key}`}
              x={x(i)}
              y={bottom + 32}
              textAnchor="middle"
              fontSize="9"
              fontFamily={F.medium}
              fill={C.line}
            >
              {m.key.slice(0, 4)}
            </SvgText>
          ))}
      </Svg>
      {!single && (
        <View style={{ gap: 8, paddingHorizontal: 4 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {series.map((s) => {
              const on = focus === s.id;
              return (
                <Pressable
                  key={s.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                  accessibilityLabel={`Highlight ${GAME_INFO[s.id as GameId].short}`}
                  onPress={() => setFocus(on ? null : s.id)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    paddingVertical: 6,
                    paddingHorizontal: 11,
                    borderRadius: 16,
                    backgroundColor: on ? SERIES_COLORS[s.id] : C.soft,
                    opacity: focus && !on ? 0.6 : 1,
                  }}
                >
                  <View
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 5,
                      backgroundColor: on ? C.white : SERIES_COLORS[s.id],
                    }}
                  />
                  <Txt size={11} weight="bold">
                    {GAME_INFO[s.id as GameId].short}
                  </Txt>
                </Pressable>
              );
            })}
          </View>
          <Txt size={10} color={C.muted}>
            {focus ? "Tap again to show all games." : "Tap a game to highlight its line."}
          </Txt>
        </View>
      )}
    </View>
  );
}
export function HistoryLine({ values }: { values: number[] }) {
  const path = values
    .map(
      (v, i) => `${25 + (i * 270) / Math.max(1, values.length - 1)},${125 - v}`,
    )
    .join(" ");
  return (
    <Svg
      height="150"
      width="100%"
      viewBox="0 0 320 150"
      accessibilityLabel="Illustrative history from synthetic records"
    >
      <Rect x="12" y="25" width="296" height="65" rx="18" fill={C.pale} />
      <Polyline points={path} fill="none" stroke={C.ink} strokeWidth="3" />
      {values.map((v, i) => (
        <Circle
          key={i}
          cx={25 + (i * 270) / Math.max(1, values.length - 1)}
          cy={125 - v}
          r="4"
          fill={i === values.length - 1 ? C.coral : C.blue}
        />
      ))}
      <SvgText x="18" y="143" fontSize="11" fill={C.muted}>
        Earlier rounds
      </SvgText>
      <SvgText x="290" y="143" fontSize="11" textAnchor="end" fill={C.muted}>
        Today
      </SvgText>
    </Svg>
  );
}
export function Forest({
  month,
  label,
  width = 340,
  whole = false,
}: {
  month: number;
  label?: string;
  width?: number;
  whole?: boolean;
}) {
  const scores = YEAR.series.map((s) => s.points[month].score || 0),
    density = scores.reduce((a, b) => a + b, 0) / scores.length,
    trees = Math.round(8 + density / 5);
  return (
    <Svg
      width={width}
      height="350"
      viewBox="0 0 340 350"
      accessibilityLabel={`Fictional forest journey in ${YEAR.months[month].label}; foliage illustrates scripted game variation.`}
    >
      <Rect width="340" height="350" rx="30" fill="#EDF7F1" />
      <Path
        d="M-25 253C46 240 52 166 122 179S215 263 260 204S310 154 365 167"
        fill="none"
        stroke="#D9C7A0"
        strokeWidth="32"
        strokeLinecap="round"
      />
      <Path
        d="M-25 253C46 240 52 166 122 179S215 263 260 204S310 154 365 167"
        fill="none"
        stroke="#FAEFCE"
        strokeWidth="22"
        strokeLinecap="round"
      />
      {Array.from({ length: trees }, (_, i) => {
        const x = 14 + ((i * 67) % 318),
          y = i % 2 ? 80 + ((i * 13) % 40) : 275 + ((i * 9) % 32),
          r = 11 + (i % 3) * 4;
        return (
          <G key={i}>
            <Path d={`M${x} ${y + 25}V${y}`} stroke="#607E64" strokeWidth="3" />
            <Circle cx={x} cy={y} r={r} fill={i % 3 ? "#A5CEAD" : "#76B6B0"} />
            <Circle
              cx={x + 8}
              cy={y - 8}
              r={r * 0.7}
              fill={i % 3 ? "#BBDCBA" : "#95CEC8"}
            />
          </G>
        );
      })}
      <Circle
        cx="184"
        cy="216"
        r="14"
        fill={C.coral}
        stroke={C.white}
        strokeWidth="4"
      />
      <Circle cx="184" cy="216" r="4" fill={C.ink} />
      <Rect x="106" y="118" width="154" height="34" rx="17" fill={C.ink} />
      <SvgText x="183" y="140" textAnchor="middle" fill={C.white} fontSize="12" fontFamily={F.bold}>
        {whole ? "Month " + (month + 1) : "You are here"}
      </SvgText>
      <SvgText x="24" y="38" fill={C.ink} fontSize="16" fontFamily={F.extra}>
        {label ?? YEAR.months[month].label}
      </SvgText>
      {month === 0 && (
        <SvgText x="18" y="218" fill={C.ink} fontSize="12" fontFamily={F.bold}>
          Start
        </SvgText>
      )}
    </Svg>
  );
}
