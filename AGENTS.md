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
│   ├── App.tsx                  # Routes + NavBar + LanguageSwitcher layout
│   ├── pages/
│   │   ├── QuemSomos.tsx       # About Polar Group: mission, vision, values
│   │   ├── Marcas.tsx          # Grid of 18 company cards + quiz card
│   │   ├── Company.tsx         # Detail view: logo, description, products, ribbon gallery
│   │   ├── Produtos.tsx        # All products aggregated from every company
│   │   ├── Videos.tsx          # Dedicated Polar Group videos (not company galleries)
│   │   ├── Contato.tsx         # Address, phone, email, social media
│   │   └── Quiz.tsx            # 8 multiple-choice questions, scored, ephemeral
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives (button, card, dialog, scroll-area)
│   │   ├── NavBar.tsx          # Top navigation: Quem Somos | Marcas | Produtos | Vídeos | Contato
│   │   ├── LanguageSwitcher.tsx # PT/EN/ES toggle (top-right corner)
│   │   └── RibbonGallery.tsx   # Horizontal scroll thumbnails → lightbox (images/videos)
│   ├── data/
│   │   ├── companies/pt-BR.json # 18 companies: { id, name, logo, description, products[], gallery[] }
│   │   ├── quiz/pt-BR.json     # 8 questions: { text, options[], correct }
│   │   └── videos/pt-BR.json   # Dedicated videos: { id, title, src, thumbnail }
│   ├── i18n/
│   │   ├── index.ts            # react-i18next config, loads locale JSON files
│   │   └── locales/{pt-BR,en,es}/common.json
│   ├── hooks/
│   │   └── useIdleTimer.ts     # 180s inactivity → navigate to / (QuemSomos)
│   ├── lib/
│   │   └── utils.ts            # cn() helper
│   └── index.css               # Tailwind + shadcn CSS variables
├── electron/
│   ├── main.ts                 # Electron main — fullscreen, kiosk mode, no frame
│   └── preload.ts              # Exposes platform info
├── scripts/
│   └── translate.ts            # Reads pt-BR JSON, prompts DeepSeek → writes en.json, es.json
├── public/
│   └── images/                 # Company logos, gallery images/videos
├── forge.config.ts             # Electron Forge → Squirrel EXE
├── .npmrc                       # node-linker=hoisted (required by Electron Forge)
├── Dockerfile                  # nginx:alpine serving dist/
├── vite.config.ts              # @ alias, base: './' for file:// in Electron
├── tailwind.config.ts          # shadcn theme + tailwindcss-animate
└── package.json
```

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | QuemSomos | About Polar Group (mission, vision, values) |
| `/marcas` | Marcas | 18-company card grid + quiz entry |
| `/marcas/:id` | Company | Company detail with products + gallery |
| `/produtos` | Produtos | All products from all companies aggregated |
| `/videos` | Videos | Dedicated Polar Group videos (not company galleries) |
| `/contato` | Contato | Address, phone, email, social media |
| `/quiz` | Quiz | Multiple-choice quiz (ephemeral, no persistence) |

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
pnpm translate        # LLM translation (needs DEEPSEEK_API_KEY)
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

1. Edit `src/data/companies/pt-BR.json`, `src/data/quiz/pt-BR.json`, and `src/data/videos/pt-BR.json`
2. Edit UI strings in `src/i18n/locales/pt-BR/common.json`
3. Run `pnpm translate` (requires `DEEPSEEK_API_KEY` env var)
4. Manually review `en/common.json` and `es/common.json`

## Content Schema

**Company data shape** (`src/data/companies/pt-BR.json`):
```json
{
  "companies": [{
    "id": "kebab-case-id",
    "name": "Company Name",
    "logo": "images/logo.png",
    "description": "Paragraphs separated by \\n\\n",
    "gallery": [
      { "type": "image", "src": "images/photo.jpg", "alt": "Caption" },
      { "type": "video", "src": "videos/clip.mp4", "thumbnail": "images/thumb.jpg" }
    ],
    "products": [
      { "id": "prod-id", "name": "Product Name", "description": "...", "image": "images/prod.png" }
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

**Videos data shape** (`src/data/videos/pt-BR.json`):
```json
{
  "videos": [{
    "id": "v1",
    "title": "Video Title",
    "src": "videos/clip.mp4",
    "thumbnail": "images/thumb.jpg"
  }]
}
```

## CI/CD

Two workflows in `.github/workflows/`:

| Workflow | Trigger | What it does |
|---|---|---|
| `ci.yml` | push/PR to `main` | lint → type-check → Vite build |
| `release.yml` | `v*` tag push | Builds EXE (Windows) + Docker image (Linux), creates GitHub Release with EXE attached |

### Creating a Release

```bash
git tag v1.0.0
git push origin v1.0.0
```

This triggers `release.yml` which:
1. Builds the Windows EXE via Electron Forge → attaches to GitHub Release
2. Builds & pushes Docker image to `ghcr.io/revirtua-vr/polargroup-totem` with tags: `v1.0.0`, `1.0`, `latest`
3. Creates a GitHub Release at `https://github.com/revirtua-vr/polargroup-totem/releases` with release notes containing both download links

### Docker

```bash
docker pull ghcr.io/revirtua-vr/polargroup-totem:latest
docker run -p 80:80 ghcr.io/revirtua-vr/polargroup-totem:latest
```

## DON'Ts

- DON'T use Yarn — pnpm only
- DON'T add a backend or database — content is static JSON
- DON'T add user authentication — this is a public kiosk
- DON'T use BrowserRouter — must use HashRouter for Electron offline
- DON'T assume internet connectivity — the kiosk must work fully offline
