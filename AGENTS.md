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
│   │   ├── Marcas.tsx          # Grid of 17 company cards with 12 category filter chips (quiz lives in the nav bar)
│   │   ├── Company.tsx         # Detail view: logo, tagline, description, site link, products, ribbon gallery + catalog CTA
│   │   ├── Catalogo.tsx        # Full-height PDF catalog page (/marcas/:id/catalogo) — single scroll via PdfViewer
│   │   ├── Produtos.tsx        # All products aggregated from every company
│   │   ├── Videos.tsx          # Dedicated Polar Group videos (not company galleries)
│   │   ├── Contato.tsx         # Address, phone, email, social media
│   │   ├── Quiz.tsx            # 8 multiple-choice questions, scored, ephemeral
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives (button, card, dialog, scroll-area)
│   │   ├── NavBar.tsx          # Top navigation: Quem Somos | Marcas | Produtos | Vídeos | Contato
│   │   ├── LanguageSwitcher.tsx # PT/EN/ES toggle (top-right corner)
│   │   ├── BrandBackground.tsx # Full-screen constellation canvas + brand glow blobs (design)
│   │   ├── BrandDecor.tsx      # SectionDivider + TargetRings decorative primitives (design)
│   │   ├── PageTransition.tsx  # Route change fade/slide-up wrapper
│   │   ├── RibbonGallery.tsx   # Horizontal scroll thumbnails → lightbox (images/videos)
│   │   └── PdfViewer.tsx       # Full PDF renderer (react-pdf): all pages, zoom, index links scroll to target page
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
│   │   ├── utils.ts            # cn() helper
│   │   └── leadStore.ts        # Quiz lead persistence: Electron IPC → CSV (userData/leads.csv), web fallback → localStorage
│   └── index.css               # Tailwind + shadcn CSS variables
├── electron/
│   ├── main.ts                 # Electron main — fullscreen, kiosk mode, no frame
│   └── preload.ts              # Exposes platform info
├── scripts/
│   └── translate.ts            # Reads pt-BR JSON, prompts DeepSeek → writes en.json, es.json
├── public/
│   ├── images/                 # Company logos, gallery images/videos
│   └── pdfs/                   # Embedded PDF catalogs (e.g. catalogo-blinda.pdf)
├── forge.config.ts             # Electron Forge → Squirrel EXE
├── .npmrc                       # node-linker=hoisted (required by Electron Forge)
├── Dockerfile                  # nginx:alpine serving dist/
├── vite.config.ts              # @ alias, base: './' for file:// in Electron
├── tailwind.config.ts          # shadcn theme + brand colors + tailwindcss-animate
├── DESIGN.md                   # Design system: brand palette, typography, tokens, background/decoration patterns, motion rules
└── package.json
```

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | QuemSomos | About Polar Group (mission, vision, values) |
| `/marcas` | Marcas | 17-company card grid with 12 category filter chips (client-defined categories); quiz is a nav tab |
| `/marcas/:id` | Company | Company detail with products + gallery |
| `/marcas/:id/catalogo` | Catalogo | Full-height PDF catalog (only when company has `catalog` field) |
| `/produtos` | Produtos | All products from all companies aggregated |
| `/videos` | Videos | Dedicated Polar Group videos (not company galleries) |
| `/contato` | Contato | Address, phone, email, social media |
| `/quiz` | Quiz | Lead form (name/phone/email) → multiple-choice quiz → result screen showing the person's name; lead saved to local CSV (see Key Decisions) |

## Key Decisions

| Decision | Choice | Reason |
|---|---|---|
| Content source | Static JSON bundled in app | No backend needed, fully offline |
| Quiz leads | Pre-quiz form (name/phone/email) → Electron IPC appends to CSV at `userData/leads.csv`; web fallback → localStorage | Client wants lead capture at the kiosk; cloud integration planned later (see TODO.md) |
| Quiz scoring | Ephemeral (answer → score → done) | No user accounts, no leaderboard |
| Languages | pt-BR authored, en/es via LLM script | Single source of truth + automated translation |
| Kiosk behavior | Fullscreen, 180s idle → home, no browser chrome | Convention touchscreen UX |
| Brand browsing | Flat grid of 17 brands + 12 category filter chips (data-driven from `categories` array in companies pt-BR.json, labels translated via translate.ts) | Client-defined category map from "Planilha de marcas"; a brand may belong to multiple categories (e.g. Blinda) |
| PDF catalogs | Optional `catalog` field per company → CTA on Company page opens dedicated full-height `/marcas/:id/catalogo` page rendered by `PdfViewer` (react-pdf) | Blinda catalog: index links must jump to target page; react-pdf LinkService scrolls to target page. Keep this feature — it is data-driven and intentionally maintained |
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

## TODO.md — Pendências

`TODO.md` (raiz do projeto) é a **lista viva de pendências**: entregas aguardando arquivos do cliente (logos, datasheets, catálogos, vídeos), ativos quebrados pré-existentes e acompanhamentos. Regras:
- Sempre que algo pendente for resolvido, mover o item para a seção "Resolvidos (histórico)".
- Sempre que uma nova pendência surgir (ex.: cliente promete enviar material), adicionar como checkbox.
- Manter o arquivo atualizado é parte do fluxo de trabalho — nunca deixá-lo desatualizado.

## Quality Gate

```bash
pnpm lint         # 0 errors, 0 warnings required
pnpm type-check   # clean required
pnpm build        # must succeed
```

## Design

**Read `DESIGN.md` before touching any styling.** It documents the visual system derived from
the client's brand folder: color palette (dark gray `#1A1C20` bg, brand red `#CE1F2E` accent,
white type), Exo 2 typography, CSS/Tailwind tokens, the `BrandBackground` constellation effect
(tuning knobs included), decorative patterns (`SectionDivider`, `TargetRings`, `.hud-corners`,
`.micro-label`), motion rules for the kiosk, and design do/don'ts. Keep DESIGN.md updated when
the look changes.

## i18n Content Workflow

1. Edit `src/data/companies/pt-BR.json`, `src/data/quiz/pt-BR.json`, and `src/data/videos/pt-BR.json`
2. Edit UI strings in `src/i18n/locales/pt-BR/common.json`
3. Run `pnpm translate` (requires `DEEPSEEK_API_KEY` env var)
4. Manually review `en/common.json` and `es/common.json`

## Content Schema

**Company data shape** (`src/data/companies/pt-BR.json`):
```json
{
  "categories": [
    { "id": "category-key", "label": "Category label (translated via translate.ts)" }
  ],
  "companies": [{
    "id": "kebab-case-id",
    "name": "Company Name",
    "logo": "images/logo.png",
    "site": "https://company-website.com",
    "categories": ["category-key", "another-category-key"],
    "tagline": "Short slogan shown under the company name",
    "description": "Paragraphs separated by \\n\\n",
    "gallery": [
      { "type": "image", "src": "images/photo.jpg", "alt": "Caption" },
      { "type": "video", "src": "videos/clip.mp4", "thumbnail": "images/thumb.jpg" }
    ],
    "catalog": {
      "title": "Catalog Title",
      "file": "pdfs/catalog.pdf",
      "indexPage": 5
    },
    "products": [
      { "id": "prod-id", "name": "Product Name", "description": "...", "image": "images/prod.png" }
    ]
  }]
}
```

Notes: 17 companies (Eaton, R. STAHL and RS Components included; "Oliver Twinsafe" content lives inside `oliver`). `translate.ts` chunks translation per company and per product batch — the file is too large for a single API call.

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
| `release.yml` | push to `main` | Builds EXE (Windows) + Docker image, updates the rolling "Latest build" GitHub Release with EXE attached. Docker tags: `main`, `sha-<short>`, `latest` |
| `release.yml` | `v*` tag push | Same as above, but creates a versioned GitHub Release. Docker tags: `v1.0.0`, `1.0`, `latest` |

### Automatic Releases

Every commit pushed to `main` automatically:
1. Builds the Windows EXE via Electron Forge → attaches to the rolling ["Latest build"](https://github.com/revirtua-vr/polargroup-totem/releases/tag/latest) release (tag `latest` is force-moved to the new commit)
2. Builds & pushes Docker image to `ghcr.io/revirtua-vr/polargroup-totem` with tags: `main`, `sha-<short>`, `latest`

### Creating a Versioned Release

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
