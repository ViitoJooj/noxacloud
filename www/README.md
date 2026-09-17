# Www (Front-end)
>If you are an LLM/AI agent working in this folder, you are restricted to the front-end scope: only read/edit files under `www/`. You are restricted from accessing the `.env` file (access to `.env.example` is permitted) and from accessing the core codebase (backend API, `tests/`) or any other app's context. Stay within this folder's structure and rules; do not pull in or act on files outside it.

This folder contains the front-end application: the public site and the authenticated views (admin, profile, prices, etc). It is built with SvelteKit, TypeScript and Sass, and consumes the Core API.

# Structure [Front-end, www]
The front-end is divided by routes and reusable components:
- ### routes
    - Every page of the application (`admin`, `contact`, `documentation`, `infrastructure`, `login`, `prices`, `profile`, `register`, `terms`, home).
- ### components
    - Reusable pieces shared across routes (`header`, `footer`, etc), following the exact same file pattern as routes.
- ### i18n
    - All user-facing text, split by language. Nothing is written directly in HTML/Svelte markup.
- ### assets
    - Static files owned by the front-end: icons, images and the downloaded font files.

## Stack
The front-end uses TypeScript as the primary language and utilizes the following libraries:
- SvelteKit
- Sass (sass-embedded)
- Vitest (colocated unit tests)

## Mandatory file pattern
Every route and every component **must** be split into the same four files, one per responsibility. No exceptions.

| File | Responsibility |
|---|---|
| `+page.svelte` (route) / `<name>.svelte` (component) | Markup only. No CSS, no business logic. |
| `+page.ts` | Everything that runs in page/component load context: data fetching, state setup, handlers. |
| `styles.scss` | All styling for that route/component. Colors, borders, fonts, radii, spacing etc are **always** pulled from the variables declared in `src/app.scss` — never hardcoded locally. |
| `page.test.ts` (route, **no `+` prefix**) / `<name>.test.ts` (component) | The single test file for that route/component (Vitest). SvelteKit reserves every `+`-prefixed filename under `src/routes/` for its own special files and hard-errors on `svelte-kit sync` for anything else named `+*` — route tests must be named `page.test.ts`, not `+page.test.ts`. |

## Rules
- No CSS inside `.svelte` or `.ts` files — styling lives only in `styles.scss`, sourced from `app.scss` variables.
- No `onMount`. Any function that must run when the page/component loads belongs in `+page.ts`.
- Functions must not exceed 40 lines.
- Use OOP practices and syntax sugar; keep markup files as simple/declarative as possible.
- No text is ever set directly in markup. Every string lives in `lib/i18n/<lang>.json` and is pulled into the template through TS logic. Both available languages (`en`, `pt-br`) must always be kept in sync.
- No imported/CDN fonts. Every font in use is downloaded and stored under `lib/assets/fonts`.
- `lib/` holds everything that is not a route or a component: contracts, entities, OOP classes/services, and other shared logic.
- Every new route and every route change requires reviewing `static/llms.txt` and `static/robots.txt` for security: confirm the route isn't leaking data to LLM crawlers or search engines that shouldn't index/consume it (private, admin or auth-gated routes must be disallowed).

## Recommended structure
```text
www/
|-- README.md
|__ src
    |-- app.html
    |-- app.scss          # single source of truth for colors, fonts, borders, spacing
    |-- app.d.ts
    |-- lib/
    |   |-- assets/
    |   |   |-- fonts/    # downloaded font files, no external imports
    |   |   |-- icons/
    |   |   |__ images/
    |   |-- components/
    |   |   |__ <component>/
    |   |       |-- <component>.svelte
    |   |       |-- +page.ts
    |   |       |-- styles.scss
    |   |       |__ <component>.test.ts
    |   |-- i18n/
    |   |   |-- en.json
    |   |   |__ pt-br.json
    |   |-- index.ts       # contracts, entities and OOP classes
    |__ routes/
        |-- +layout.svelte
        |-- +layout.ts
        |__ <route>/
            |-- +page.svelte
            |-- +page.ts
            |-- styles.scss
            |__ +page.test.ts
```

## Criterion for accepting the code
- functions under 40 lines.
- no CSS in `.svelte`/`.ts` files, no `onMount`, no hardcoded text or ad-hoc colors/fonts.
- must use the recommended structure (route/component files + i18n + local fonts).
- `static/llms.txt` and `static/robots.txt` reviewed for every route created/changed.
- test after coding.
- thoroughly analyze every line of code and ensure there is no junk.
- without unnecessary comments
