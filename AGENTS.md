# AGENTS.md — polargroup-totem

## Project

Institutional kiosk app for conventions showcasing Polar Group's 18 companies. Hybrid app: standalone offline Electron kiosk on touchscreens + Docker-deployed mobile web version.

**Location:** `C:\Users\Lucas\polargroup-totem` (standalone, NOT in CRM monorepo)

## Stack

- **Vite + React 18** with TypeScript
- **shadcn/ui** (button, card, dialog, scroll-area) + Tailwind CSS
- **React Router** (HashRouter for Electron compatibility)
- **react-i18next** — pt-BR (source), en, es (LLM-translated)
- **Electron + Electron Forge** → Windows EXE (Squirrel installer)
- **pnpm** as package manager

## Project Structure

```
polargroup-totem/
├── src/
│   ├── main.tsx                 # Entry — HashRouter wraps App
│   ├── App.tsx                  # Routes: /, /company/:id, /quiz
│   ├── pages/
│   │   ├── Home.tsx            # Grid of 18 company cards + quiz card
│   │   ├── Company.tsx         # Detail view: logo, description, ribbon gallery
│   │   └── Quiz.tsx            # 8 multiple-choice questions, scored, ephemeral
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives (button, card, dialog, scroll-area)
│   │   ├── LanguageSwitcher.tsx # PT/EN/ES toggle (top-right corner)
│   │   └── RibbonGallery.tsx   # Horizontal scroll thumbnails → lightbox (images/videos)
│   ├── data/
│   │   ├── companies/pt-BR.json # 18 companies: { id, name, logo, description, gallery[] }
│   │   └── quiz/pt-BR.json     # 8 questions: { text, options[], correct }
│   ├── i18n/
│   │   ├── index.ts            # react-i18next config, loads locale JSON files
│   │   └── locales/{pt-BR,en,es}/common.json
│   ├── hooks/
│   │   └── useIdleTimer.ts     # 180s inactivity → navigate to /
│   ├── lib/
│   │   └── utils.ts            # cn() helper
│   └── index.css               # Tailwind + shadcn CSS variables
├── electron/
│   ├── main.ts                 # Electron main — fullscreen, kiosk mode, no frame
│   └── preload.ts              # Exposes platform info
├── scripts/
│   └── translate.ts            # Reads pt-BR JSON, prompts OpenAI → writes en.json, es.json
├── public/
│   └── images/                 # Company logos, gallery images/videos
├── forge.config.ts             # Electron Forge → Squirrel EXE + ZIP
├── Dockerfile                  # nginx:alpine serving dist/
├── vite.config.ts              # @ alias, base: './' for file:// in Electron
├── tailwind.config.ts          # shadcn theme + tailwindcss-animate
└── package.json
```

## Key Decisions

| Decision | Choice | Reason |
|---|---|---|
| Content source | Static JSON bundled in app | No backend needed, fully offline |
| Quiz persistence | Ephemeral (answer → score → done) | No user accounts, no leaderboard |
| Languages | pt-BR authored, en/es via LLM script | Single source of truth + automated translation |
| Kiosk behavior | Fullscreen, 180s idle → home, no browser chrome | Convention touchscreen UX |
| Routing | HashRouter | Works offline in Electron without a server |
| Project location | Standalone at `C:\Users\Lucas\polargroup-totem` | Not coupled to CRM monorepo |

## Scripts

```bash
pnpm dev              # Vite dev server (localhost:5173)
pnpm start            # Electron + Vite dev
pnpm build            # Production Vite build → dist/
pnpm make             # Electron Forge → EXE (out/make/)
pnpm translate        # LLM translation (needs OPENAI_API_KEY)
pnpm lint             # ESLint
pnpm type-check       # tsc --noEmit
```

### Docker (mobile web)

```bash
pnpm build
docker build -t polargroup-totem .
docker run -p 80:80 polargroup-totem
```

## Quality Gate

```bash
pnpm lint         # 0 errors, 0 warnings required
pnpm type-check   # clean required
pnpm build        # must succeed
```

## i18n Content Workflow

1. Edit `src/data/companies/pt-BR.json` and `src/data/quiz/pt-BR.json`
2. Edit UI strings in `src/i18n/locales/pt-BR/common.json`
3. Run `pnpm translate` (requires `OPENAI_API_KEY` env var)
4. Manually review `en/common.json` and `es/common.json`

## Content Schema

**Company data shape** (`src/data/companies/pt-BR.json`):
```json
{
  "companies": [{
    "id": "kebab-case-id",
    "name": "Company Name",
    "logo": "public/images/logo.png",
    "description": "Paragraphs separated by \\n\\n",
    "gallery": [
      { "type": "image", "src": "public/images/photo.jpg", "alt": "Caption" },
      { "type": "video", "src": "public/videos/clip.mp4", "thumbnail": "public/images/thumb.jpg" }
    ]
  }]
}
```

**Quiz data shape** (`src/data/quiz/pt-BR.json`):
```json
{
  "questions": [{
    "text": "Question text?",
    "options": ["A", "B", "C", "D"],
    "correct": 0
  }]
}
```

## DON'Ts

- DON'T use Yarn — pnpm only
- DON'T add a backend or database — content is static JSON
- DON'T add user authentication — this is a public kiosk
- DON'T use BrowserRouter — must use HashRouter for Electron offline
- DON'T assume internet connectivity — the kiosk must work fully offline
