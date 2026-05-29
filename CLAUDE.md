# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run demo        # dev server for the interactive demo (http://localhost:5173)
bun run build       # build the library → dist/chures.js + dist/chures.umd.cjs
bun run type-check  # tsc --noEmit (what CI runs)
bun run dev         # watch mode build (lib only, no server)
bun run build:demo  # production build of the demo → dist-demo/
```

Use **bun** for all installs and script runs (not npm/yarn).

Publishing: `bun run patch` bumps the patch version and publishes to npm. CI publishes automatically on every push to `master` via `.github/workflows/release.yaml`.

## Architecture

This is a **Vite library build** (`"lib"` mode), not an app. `src/index.ts` is the public API — everything exported there is part of the package surface.

Two separate Vite configs:
- `vite.config.ts` — library build, externalizes `react`, `react-dom`, `react/jsx-runtime`, `zustand`, `framer-motion`. Injects CSS via `vite-plugin-css-injected-by-js` (no separate `.css` file in dist). Emits `.d.ts` via `vite-plugin-dts`.
- `vite.config.demo.ts` — standalone SPA build of `demo/main.tsx` → `dist-demo/`.

### Source layout

```
src/
  index.ts                          # public API (re-exports only)
  types.ts                          # shared TypeScript types
  components/
    TelegramAuth.tsx                # container: wires hook → button or render prop
    TelegramSignInButton.tsx        # presentational button with Telegram branding
    notifications/
      Toaster.tsx                   # fixed-position toast list (Framer Motion)
      Toast.module.css              # theming via --ta-* CSS custom properties
  hooks/
    useTelegramLogin.ts             # loads Telegram OAuth script, manages state
    toaster/
      useToaster.ts                 # Zustand store: bake / dismiss, 5s auto-dismiss
```

### CSS theming

`Toaster` uses `--ta-*` CSS custom properties with fallback defaults so it works unstyled. Consumers can override:

| Variable | Default | Meaning |
|---|---|---|
| `--ta-accent` | `#229ED9` | info border |
| `--ta-error` | `#ef4444` | error border + title |
| `--ta-warn` | `#f59e0b` | warning border + title |
| `--ta-fg` | `#ffffff` | title text |
| `--ta-fg-muted` | `#9ca3af` | description text |
| `--ta-font-sm` | `0.875rem` | title size |
| `--ta-font-xs` | `0.75rem` | description size |

### Component conventions
- Named function declarations (not arrow functions) for all components
- One component per file; `interface Props` at the top of each file
- CSS Modules (`.module.css`) for all styles; class names use `PascalCase`
- Root element class suffix: `***Container`; wrapper divs: `***Wrapper`
- CSS units: `rem` only; values via CSS variables, never hardcoded hex/px
