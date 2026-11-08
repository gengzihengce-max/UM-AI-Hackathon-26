import { YEAR, number } from "./store";
export const REPORT = {
  title: "One year. Different patterns.",
  subtitle: "AI-authored interpretation of a fully synthetic record",
  summary:
    "The fictional year shows early task learning, a temporary dip in March, and later divergence. Matching, navigation and delayed recognition become less efficient, while the guided trail stays comparatively stable. These are deliberately scripted patterns, not evidence of Alzheimer’s disease.",
  observations: [
    {
      id: "memory",
      heading: "Matching takes more attempts",
      text: "Memory Mahjong averages 5.8 pair attempts in the first three months and 9.6 in October. The placeholder score changes from 73.9 to 43.1. This illustrates a repeated performance difference; it does not identify a cause.",
    },
    {
      id: "voyage",
      heading: "Navigation separates from the other curves",
      text: "Route efficiency changes from 83.7% to 41.5%. October’s mean pointing error is 95.0 degrees on an eight-choice compass. Device interaction, route familiarity and quantization matter; this is not validated path integration.",
    },
    {
      id: "trivia",
      heading: "Delayed recognition also changes",
      text: "Quiz accuracy averages 90.9% in the first three months and 41.7% in October. October’s mean delay is 97.1 seconds. Only three questions are asked per round, and the delay varies; both limit interpretation.",
    },
    {
      id: "words",
      heading: "Animal naming changes more modestly",
      text: "Unique recognized animals average 20.2 per 60 seconds in the first three months and 18.3 in October. A finite dictionary and input method affect the counts. This is a category-fluency game proxy.",
    },
    {
      id: "switch",
      heading: "The guided trail stays comparatively stable",
      text: "Mean completion time changes from 24.7 to 24.0 seconds. That descriptive stability is useful context alongside the other curves. It is not proof that an attention or executive-function domain is intact.",
    },
  ],
  limits: [
    "Every person, response and trend is fabricated. The generator was designed to produce the visual story.",
    "The 0–100 scores use arbitrary demo-v2 equations. No clinical norms, risk thresholds, percentiles or validated change criteria exist.",
    "The November–January reference includes learning. Comparisons are descriptive means, without significance testing or diagnostic interpretation.",
    "Practice, paused and assisted records are excluded from curves. Missing records are absent, never scored as zero.",
    "Speech transcription, eight-way compass choices, a short guided trail and multiple-choice recall are simplified proxies.",
  ],
  next: [
    "Repeat the same task protocol and input method to build a comparable record.",
    "Review raw measurements and collection quality alongside the curves.",
    "In a future real-data setting, a person could choose to share a factual summary with a qualified clinician. This demo cannot determine whether care is needed.",
  ],
  provenance:
    "One-off AI-authored report prepared by ChatGPT from the bundled synthetic fixture. Cached offline for the pitch; no live API call, trained small model or diagnostic model is used.",
};
const escape = (s: unknown) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export function reportHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Memory Garden - Synthetic Year Report</title><style>@page{margin:38px}body{font:14px/1.55 -apple-system,Arial,sans-serif;color:#10243A}h1{font-size:34px;line-height:1.1}h2{font-size:21px;margin-top:27px}h3{font-size:16px;margin-bottom:4px}.tag{background:#E3F4FA;padding:12px;border-radius:14px;font-size:12px}.summary{background:#50B3D9;padding:20px;border-radius:24px}table{border-collapse:collapse;width:100%;font-size:12px}td,th{padding:10px 6px;border-bottom:1px solid #D5E2EA;text-align:left}small{color:#42576B}article{page-break-inside:avoid}li{margin-bottom:7px}</style></head><body><p>MEMORY GARDEN · SYNTHETIC PITCH REPORT</p><h1>${REPORT.title}</h1><p>Evelyn Brooks, 67 · entirely fictional · November 2025-October 2026</p><div class="tag">495 generated activities · 471 eligible check-ins · 5,072 fabricated trials · demo-v2</div><h2>What the pattern shows</h2><p class="summary">${escape(REPORT.summary)}</p><h2>Trace the narrative to the inputs</h2><table><tr><th>Activity</th><th>Reference score (n)</th><th>October score (n)</th><th>Raw measure: reference → October</th></tr>${YEAR.facts.map((f) => `<tr><td>${escape(f.title)}</td><td>${number(f.baseline.score)} (${f.baseline.n})</td><td>${number(f.latest.score)} (${f.latest.n})</td><td>${number(f.baseline.raw)} → ${number(f.latest.raw)} ${escape(f.rawUnit)}</td></tr>`).join("")}</table><p><small>Reference = pooled eligible sessions in November-January, including task learning. Scores are arbitrary task-specific transforms, not clinically comparable units.</small></p>${REPORT.observations.map((o) => `<article><h3>${escape(o.heading)}</h3><p>${escape(o.text)}</p></article>`).join("")}<h2>Limits of this demonstration</h2><ul>${REPORT.limits.map((l) => `<li>${escape(l)}</li>`).join("")}</ul><h2>Useful next steps</h2><ol>${REPORT.next.map((l) => `<li>${escape(l)}</li>`).join("")}</ol><p class="tag">${escape(REPORT.provenance)}</p><small>Source: bundled scenario evelyn-year-v2, generator synthetic-year-v2, seed 671104. Fictional game records only. Not a medical assessment.</small></body></html>`;
}
