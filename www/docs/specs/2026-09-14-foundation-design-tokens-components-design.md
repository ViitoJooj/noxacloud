# Foundation: design tokens, shared components, i18n

Status: approved
Scope: `www/` only (front-end restriction from `www/README.md`)

## Context

`www/` is a SvelteKit app being built from a Claude Design canvas
(`Noxacloud App.dc.html`) covering 10 routes: home, contact, infrastructure,
documentation, prices, terms, login, register, admin (5 sub-views), profile.
This is the first of four phases:

1. **Foundation** (this spec) — tokens, shared components, i18n, header/footer.
2. Public marketing pages (home, contact, infrastructure, documentation, prices, terms).
3. Auth (login, register).
4. Authenticated app (profile, admin).

Every later phase depends on this one, so it ships first, on its own.

The design system bundle read from the Claude Design project
(`_ds/industry-.../styles.css`) defines the token set and a full plain-CSS
component library (buttons, fields, cards, tags, tables, dialogs, segmented
controls, radios) built on CSS custom properties. `www/src/app.scss` already
has a partially-filled-in Sass variable set (background/button/font colors,
border radii, leading) that roughly maps to those tokens — this spec
extends it to full coverage and keeps it as flat Sass variables (the
project's existing convention), not CSS custom properties.

## Non-goals

- No routes are added or changed in this phase.
- No backend/API integration (that starts in phases 3-4).
- No content is written into pages yet (home page etc. is phase 2).
- No focus-trap / keyboard-navigation implementation for `dialog` beyond
  basic conditional rendering — deferred until a real usage (phase 4) needs it.

## 1. Design tokens (`src/app.scss`)

Extend the existing Sass variables to cover the full token set from the
design system, keeping the existing naming convention
(`$primary-*`, `$secondary-*`, `$thirdary-*` for the 3-step ramps already
established for backgrounds/buttons/fonts):

- Neutral ramp: `$neutral-100` … `$neutral-900`
- Accent ramp: `$accent-100` … `$accent-900` (already have `$primary-button-color` = accent-600 equivalent, `$secondary-border-color` = accent-600; add the rest of the ramp for hover/active/tag states)
- Accent-2 ramp: `$accent-2-100` … `$accent-2-900`
- Spacing scale: `$space-1` … `$space-8` (from the design's `--space-*`)
- Radii: already present (`$small/$average/$large-border-radius-size`)
- Shadows: `$shadow-sm`, `$shadow-md`, `$shadow-lg`
- Heading sizes: `$h1-font-size` … `$h6-font-size`
- Divider color: `$primary-border-color` already covers this; keep as-is
- Focus ring color: reuse `$secondary-border-color` (accent)

Global element resets (headings use `$primary-font-family` + `$heading-font-weight`,
body uses `$secondary-font-family`, `a` color, `:focus-visible` outline,
`::selection` background) are added to the existing global block at the top
of `app.scss` — this file remains the single global stylesheet, imported
once from `+layout.svelte`.

## 2. Local fonts

Fetch from Google Fonts and commit as static files (no CDN `@import`,
per README rule):

- Barlow: weights 400, 500, 700 → `src/lib/assets/fonts/barlow/`
- Barlow Condensed: weights 400, 600 → `src/lib/assets/fonts/barlow-condensed/`

`@font-face` rules added to `app.scss`, referencing these files by relative
`url()` so Vite fingerprints them on build.

## 3. Shared component library (`src/lib/components/`)

Each component is a folder with the mandatory 4 files
(`<name>.svelte`, `+page.ts`, `styles.scss`, `<name>.test.ts`). Markup files
contain only markup (Svelte 5 runes for props: `let { ... }: Props = $props()`);
all types/handlers live in `+page.ts` and are imported into the component.

| Component | Purpose | Key props (from `+page.ts`) |
|---|---|---|
| `button` | Primary/secondary/ghost action | `variant`, `size`, `disabled`, `onClick` |
| `field` | Label + input/textarea + error text | `type` (`text\|email\|password\|textarea`), `label`, `value`, `error`, `onInput` |
| `card` | Kicker/title/body/meta block | `kicker`, `title`, `body`, `meta` |
| `tag` | Small status/category label | `variant` (`accent\|accent-2\|neutral\|outline`), `label` |
| `radio` | Single styled radio option | `checked`, `label`, `onChange`, `group name` |
| `segmented` | Segmented control (option group) | `options`, `selected`, `onSelect` |
| `table` | Generic data table | `columns`, `rows` |
| `dialog` | Modal (backdrop/title/body/actions) | `open`, `title`, `onClose` |

None import `onMount`. Any per-instance derived state uses Svelte 5
`$derived`/`$state` runes declared in the component script block (these are
reactive primitives, not lifecycle hooks, so they don't violate the
no-`onMount` rule) or plain functions exported from `+page.ts`.

Styling: each `styles.scss` reproduces only the CSS needed for that
component's states, sourced from `app.scss` variables — no ad-hoc colors.

## 4. i18n (`src/lib/index.ts`, `src/lib/i18n/*.json`)

- `Locale = 'en' | 'pt-br'` type.
- `I18nStore` class (in a `.svelte.ts` module so it can use the `$state`
  rune) with:
  - `locale: Locale` ( `$state`-backed, default `'pt-br'` )
  - `setLocale(locale: Locale): void` — updates state + writes to `localStorage`
  - `t(key: string): string` — dot-path lookup into the active dictionary,
    falls back to the key itself if missing (never throws on a missing key —
    a public marketing site must not blank out or crash on a copy gap)
- A singleton instance exported from `lib/index.ts`, initialized from
  `+layout.ts`'s load function (reads `localStorage`, no `onMount`).
- `en.json` / `pt-br.json` start with just the header/footer keys needed
  this phase (`nav.*`, `footer.*`); later phases add their own keys and must
  keep both files in sync (README rule).

## 5. Header / Footer

`lib/components/header/header.svelte` and `footer/footer.svelte` (currently
empty stubs) are filled in:

- Header: brand mark (logo asset from the design's `assets/noxacloud-logo.png`,
  copied into `lib/assets/images/`), nav links (placeholders pointing at
  routes that exist today — `/`, and `#` for not-yet-built routes, revisited
  each time a route lands in a later phase), language toggle using `button`
  + `tag`.
- Footer: minimal — brand, copyright, language toggle mirrored (matches the
  7 `<footer>` instances seen across the design's pages, which repeat the
  same footer chrome).

Both wired into `+layout.svelte` (currently renders only `{@render children()}`).

## 6. Testing infra

- Add devDependencies: `vitest`, `@testing-library/svelte`, `jsdom`.
- Add `vitest.config.ts` (Svelte plugin already in `vite.config.ts` is
  reused; test config sets `environment: 'jsdom'`, includes `src/**/*.test.ts`).
- Add `"test": "vitest run"` script to `package.json`.
- Each component's `.test.ts` covers: renders with required props, reflects
  variant/state props in output, fires its callback prop on interaction.
- `I18nStore` gets its own test (`lib/i18n.test.ts` or colocated with
  `index.ts`) covering `t()` lookup, fallback-to-key, and `setLocale`
  persistence.

## Error handling

- `I18nStore.t()` never throws — falls back to the raw key so a missing
  translation degrades to visible-but-ugly rather than breaking the page.
- Components have no async/failure paths in this phase (no data fetching
  yet) — that's introduced per-route in later phases.

## Acceptance

- `app.scss` has no empty/placeholder variables; every value the component
  library needs exists.
- All 8 components render, pass their tests, and contain zero CSS/logic
  inside `.svelte` files.
- Fonts load from local files only (verified: no `@import url(fonts.googleapis...)`
  anywhere in `www/`).
- Header/footer render real content in both `en` and `pt-br`, switchable,
  persisted across reload.
- `bun run check` and `bun run test` both pass (the project uses Bun — see `www/bun.lock`).
- `static/llms.txt` / `robots.txt` reviewed — no route changes this phase, so
  no edits expected; confirm that explicitly rather than skipping the check.
