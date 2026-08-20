# DESIGN.md — polargroup-totem visual system

Design documentation for the Polar Group kiosk app. Source of truth for look & feel: the
client's brand folder (`folder_12x30_polar_blinda_EN_pages_web.pdf` — dark gray backgrounds,
red accent, white type, dashed/dotted decorative lines and circles, futuristic style).

Future agents: read this before touching any styling. Keep it updated when the look changes.

## Brand palette

Extracted from the client's folder PDF (rendered pages, pixel-sampled). Use the tokens below —
do not hard-code raw hex in components (exception: canvas drawing in `BrandBackground.tsx`,
where raw rgba strings are used for performance).

| Role | Hex | CSS var | Tailwind |
|---|---|---|---|
| Background (dark gray) | `#1A1C20` | `--background` (`220 10% 11%`) | `bg-background` |
| Alt dark (back cover) | `#221F20` | `--brand-dark-alt` | `bg-brand-dark-alt` |
| **Brand red (primary)** | `#CE1F2E` | `--primary` (`355 74% 46%`) | `bg-primary` / `text-brand-red` |
| Red bright (hover) | `#ED1C24` | `--brand-red-bright` | `text-brand-red-bright` |
| Red dark (pressed) | `#C4151C` | `--brand-red-dark` | `text-brand-red-dark` |
| White (text/details) | `#FFFFFF` | `--foreground` (`0 0% 100%`) | `text-foreground` |
| Card surface | `#282A2E` | `--card` (`220 7% 17%`) | `bg-card` |
| Muted surface | `#1F2226` | `--muted` (`214 4% 14%`) | `bg-muted` |
| Border / mid gray | `#37383C` | `--border` (`228 4% 23%`) | `border-border` / `border-brand-gray-4` |
| Dark detail gray | `#535558` | `--brand-gray-3` | `text-brand-gray-3` |
| Light detail gray | `#8C8D8F` | `--brand-gray-2` | `text-brand-gray-2` |
| Lightest gray | `#A9AAAB` | `--brand-gray-1` | `text-brand-gray-1` |
| Muted text | `#9A9B9D` | `--muted-foreground` (`220 1% 61%`) | `text-muted-foreground` |
| Navy secondary | `#1F295C` | `--brand-navy` | `text-brand-navy` |
| Navy light | `#555C83` | `--brand-navy-light` | `text-brand-navy-light` |
| Yellow accent | `#F6EB16` | `--brand-yellow` | `text-brand-yellow` |
| Cyan accent | `#0095D9` | `--brand-cyan` | `text-brand-cyan` |

Palette rules:
- **Red is the positive/brand color.** Quiz correct answers are red; wrong answers are gray
  (`bg-secondary`). Red is never used to signal errors in this app.
- Navy is a secondary section accent (matches folder page 7). Yellow/cyan are micro-accents
  only — don't build whole sections out of them.
- Dark surfaces only. The only white surfaces are logo chips (company logos are white-background
  images) and PDF catalog pages.

## Typography

- **Exo 2** everywhere (400/500/600/700, latin subset only), bundled offline via
  `@fontsource/exo-2` — imported in `src/main.tsx`. No runtime font downloads.
- `--font-sans` set in `src/index.css`; `fontFamily.sans` mapped in `tailwind.config.ts`.
- Headings: `font-bold`, normal case. Don't uppercase content with CSS transforms except the
  `.micro-label` utility (small caps, wide tracking, `/// ` red prefix).

## Tokens

- shadcn tokens (`--background`, `--card`, `--primary`, …) live in `src/index.css` `:root`
  (HSL triples — keep this format, Tailwind wraps them in `hsl(var(--...))`).
- Brand-specific tokens (`--brand-*`) are hex CSS vars, exposed in `tailwind.config.ts` as
  `brand.{red,red-bright,red-dark,navy,navy-light,yellow,cyan,gray-1..gray-5,dark-alt}`.
- No `.dark` class/theme — the app is permanently dark (brand covers and inner pages both
  work on dark; inner light pages of the folder are intentionally not reproduced).

## Reusable pieces

| Piece | Location | Usage |
|---|---|---|
| `BrandBackground` | `src/components/BrandBackground.tsx` | Fixed full-screen canvas behind the app: drifting dots ("constellation") with distance-linked lines, ~12% red + ~4% white glowing nodes, plus two radial glow blobs (red top-left, navy bottom-right). Mounted once in `App.tsx`. |
| `SectionDivider` | `src/components/BrandDecor.tsx` | Dashed horizontal line ending in a red dot + short gray dash. Use under page titles and section headers. |
| `TargetRings` | `src/components/BrandDecor.tsx` | Concentric dashed/solid circles (one slowly rotating) with a red center dot. Used behind the QuemSomos hero. |
| `.hud-corners` | utility in `src/index.css` | Red corner brackets on cards via pseudo-elements. `hud-corners` = on hover; add `hud-corners-visible` to always show. |
| `.glow-red` | utility | Soft red box-shadow for active/hover emphasis (nav indicator, quiz buttons, video play badge). |
| `.text-glow` | utility | Red text-shadow for emphasized text (quiz result line). |
| `.micro-label` | utility | `/// LABEL` kicker above page titles: `text-xs uppercase tracking-[0.3em] text-brand-gray-1` with a red `/// ` prefix. Feed it an existing i18n key — e.g. `t('nav.marcas')` — no new keys needed. |

## Patterns & conventions

- **Page headers**: centered `micro-label` → `h1` → subtitle → `SectionDivider` (see Marcas,
  Produtos, Videos, Contato, Quiz).
- **Section headings**: red square bullet before the heading text (`h-2.5 w-2.5 bg-brand-red`),
  e.g. Company products, RibbonGallery, QuemSomos mission/vision/values.
- **Dashed borders** (futuristic motif): NavBar bottom border, Company/Catalogo header borders,
  PdfViewer toolbar border, inactive category chips on Marcas.
- **Cards**: `hover:glow-red hover:border-brand-red/60` + `hud-corners` for interactive cards;
  `hud-corners hud-corners-visible` for static showcase cards (Contato).
- **NavBar**: sliding red indicator (`bg-primary glow-red`) with `aria-current` on the active
  link; `bg-background/80 backdrop-blur` bar.
- **Logo chips**: white circles (`bg-white`, `object-contain`, inner padding) on both Marcas
  grid and Company header.
- **Quiz**: correct = `bg-primary` red + `glow-red` + `animate-pop-in`; wrong pick =
  `bg-secondary` gray + `animate-shake`; progress bar is red with glow; option letters
  (`A. B. …`) are `text-brand-red`.
- **Dialogs/lightbox**: black (`bg-black/95`), unchanged — media should not be tinted.
- **PdfViewer**: dark chrome; PDF canvas area uses `bg-brand-gray-5/40` so white PDF pages pop
  with a dark shadow.

## Motion rules (kiosk constraints)

- The kiosk runs all day on a touchscreen — keep animations **slow and subtle**.
  - Background dots drift at ~0.04–0.14 px/frame; anything faster feels jittery.
  - Canvas pauses when `document.hidden`; DPR capped at 2; dot count scales with viewport area.
- Respect `prefers-reduced-motion` (`motion-reduce:` variants on animations).
- The existing 180s idle timer (→ home) already mitigates burn-in; don't add bright
  high-contrast static elements.
- Touch targets stay ≥44px (Button min-height is enforced in the button variant).

## Tuning the constellation background

Knobs in `src/components/BrandBackground.tsx`:

| Knob | Current value | Effect |
|---|---|---|
| `LINK_DISTANCE` | `120` | Max px between connected dots |
| count formula | `area / 18000`, clamp 50–170 | Dot density |
| dot `alpha` | `0.35 + rnd*0.35` | Dot brightness |
| dot `radius` | `1.1 + rnd*1.0` | Dot size |
| speed | `0.04 + rnd*0.10` | Drift speed |
| line alphas | gray `t*0.15`, red `t*0.20` | Line strength |
| `shadowBlur` | `6` | Halo on red/white nodes |
| canvas `opacity-75` | `0.75` | Overall canvas strength |
| glow blob opacities | `0.14` red / `0.12` navy | Corner radial glows (user-approved: keep) |

Tuning history: v1 was too subtle → v2 too harsh/fast → v3 (current) is the approved balance
of visible-but-calm. Change one knob at a time and check on the kiosk screen size.

## Do / Don't

- DO use tokens (`bg-primary`, `text-brand-red`, …) instead of raw hex in components.
- DO keep all pages dark; the only light areas are logo chips and PDF pages.
- DO reuse `SectionDivider` / `TargetRings` / `hud-corners` instead of inventing new decoration.
- DO add any new UI string to all three locales (`pt-BR` first) and run `pnpm translate`.
- DON'T add animation/font libraries at runtime — everything must be bundled (offline kiosk).
- DON'T use `BrowserRouter`, Yarn, or any backend (see AGENTS.md DON'Ts).
- DON'T introduce a light theme or a theme toggle — dark is the brand.
