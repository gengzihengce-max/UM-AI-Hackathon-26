# Memory Garden

An open-source, mobile-first browser prototype. No app installation is required.

- Play: https://gengzihengce-max.github.io/UM-AI-Hackathon-26/
- One-year demo: https://gengzihengce-max.github.io/UM-AI-Hackathon-26/year-demo
- Report: https://gengzihengce-max.github.io/UM-AI-Hackathon-26/report
- Presenter controls: https://gengzihengce-max.github.io/UM-AI-Hackathon-26/pitch

## Run and build

Requires Node.js 20.19+ and npm.

```sh
npm ci
npm run web
npm run typecheck
npm run lint
npm run build
```

Serve `dist/` using any static HTTPS host. The build creates entry pages for the named routes. Configure unknown routes to fall back to index.html if your host needs it. Expo SDK 57, React Native Web and Expo Router provide the shared mobile interface. No API key or account is required. The deployed version uses browser-local storage; it does not synchronize user records to a server.

## Games

Memory Mahjong; Daily Word (60-second animal fluency); Voyage Home; teach-then-quiz Trivia with a Mahjong delay; Match-3 bonus tasks (trail-making and symbol matching). Scores are illustrative placeholders, isolated from raw measurements, pending supplied equations.

## Fictional year and AI report

Evelyn Brooks is fictional. The seeded Nov 2025–Oct 2026 fixture includes 495 activities, 471 eligible observations and 5,072 trials. Learning, a temporary dip and later domain-specific changes are scripted to demonstrate the interface. This is not a disease trajectory or a validated screening model. Synthetic fixtures remain separate from interactive rounds. Full JSON and the report are in public/downloads.

The bundled report is a one-off AI-authored interpretation. There is no live LLM request, no trained small model and no secret key in the client. Auth, research enrollment and care-circle invitations are clearly simulated.

## Design and licensing

The workflow and colors follow the team’s Iteration 2 wireframes. Application source is MIT licensed; see LICENSE. Dependencies retain their own licenses. Plus Jakarta Sans is SIL Open Font License 1.1; see THIRD_PARTY_NOTICES.md. Do not commit API keys or personal data.

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/pages.yml`). The workflow sets `EXPO_BASE_URL` to `/<repo-name>` so the app works under the repository sub-path.

## Profiles

A new account starts with an empty record: Home, Stats, Journey and results show only that user's own check-ins. "Open pitch demo" loads the fictional profile (Evelyn) with the synthetic year.
