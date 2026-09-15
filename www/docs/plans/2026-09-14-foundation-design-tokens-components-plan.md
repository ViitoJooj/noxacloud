# Foundation (Design Tokens, Shared Components, i18n) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the design-token layer, the 8-component shared UI library, i18n (en/pt-br), and a real header/footer for the `www/` SvelteKit app, so every later route (home, contact, login, register, admin, etc.) has something to build on.

**Architecture:** Sass design tokens live in a dedicated partial (`src/lib/styles/_tokens.scss`) that `app.scss` and every component/route `styles.scss` pull in via `@use ... as *`. Each shared UI primitive (button, field, card, tag, radio, segmented, table, dialog) is a self-contained folder under `src/lib/components/` with the mandatory 4-file pattern. i18n is a small reactive class (`I18nStore`, Svelte 5 `$state` rune) reading two flat JSON dictionaries, with no external library. Header/footer consume both.

**Tech Stack:** SvelteKit 2 / Svelte 5 (runes mode forced), TypeScript, Sass (sass-embedded), Vitest + @testing-library/svelte + jsdom, Bun as package manager.

**Spec:** `www/docs/specs/2026-09-14-foundation-design-tokens-components-design.md`

## Global Constraints

- Front-end scope only: read/edit files under `www/` only — never touch the backend, `tests/`, or root-level files (`www/README.md` rule).
- Every route and every component **must** be exactly 4 files: markup (`+page.svelte` / `<name>.svelte`), `+page.ts`, `styles.scss`, `+page.test.ts` / `<name>.test.ts`. No exceptions.
- No CSS inside `.svelte` or `.ts` files. Styling lives only in `styles.scss`. Colors/borders/fonts/radii/spacing always come from the tokens in `src/lib/styles/_tokens.scss` (the file `app.scss` sources its own globals from) — never hardcoded.
- No `onMount`. Anything that must run on page/component load belongs in `+page.ts` (or `+layout.ts` for the root layout).
- Functions must not exceed 40 lines.
- No text is ever set directly in markup. Every string lives in `src/lib/i18n/<lang>.json` and is pulled in via `+page.ts`/the i18n store. `en.json` and `pt-br.json` must stay in sync (same key set).
- No imported/CDN fonts. Every font file is downloaded and stored under `src/lib/assets/fonts`.
- The project uses **Bun** (`www/bun.lock`) — use `bun add`, `bun run`, not `npm`/`yarn`.
- Svelte 5 runes mode is forced project-wide via `vite.config.ts` — use `$state`/`$derived`/`$props`/`$bindable`, not legacy `export let` / stores-as-default.
- No route changes happen in this plan, so `static/llms.txt` / `static/robots.txt` need no edits — Task 15 confirms this explicitly rather than skipping it.

---

## Task 1: Design tokens & global reset

**Files:**
- Create: `www/src/lib/styles/_tokens.scss`
- Modify: `www/src/app.scss`

**Interfaces:**
- Produces: every Sass variable listed below, usable from any file via `@use '<relative path to>/lib/styles/tokens' as *;`. This is the single set every later task's `styles.scss` draws from — no task may invent a new color/spacing value outside this list.

Full variable list `_tokens.scss` must define (values below are final, not placeholders):

```scss
// Design tokens — single source of truth for the front-end. Referenced from
// app.scss (global reset) and every component/route styles.scss via
// `@use '<path>/lib/styles/tokens' as *;`. This file only ever declares
// variables — it must never contain a CSS rule, or every file that uses it
// would duplicate that rule into its own compiled output.

// Background
$primary-background-color:   #f2f2f3;
$secondary-background-color: #e9e9ea;
$thirdary-background-color:  #1d2d3d;

// Colors
$primary-button-color:       #5980a6;
$secondary-button-color:     transparent;
$thirdary-button-color:      rgba(89, 128, 166, 0.10);

// Inverted Colors
$inverted-font-color:        #f2f2f3;
$inverted-font-color-muted:  rgba(242, 242, 243, 0.88);

// Font Colors
$primary-font-color:         #1d1f20;
$secondary-font-color:       rgba(29, 31, 32, 0.78);
$thirdary-font-color:        #416180;

// Font Family
$primary-font-family:        "Barlow Condensed", system-ui, sans-serif;
$secondary-font-family:      "Barlow", system-ui, sans-serif;

// Border Color
$primary-border-color:       rgba(29, 31, 32, 0.16);
$secondary-border-color:     #5980a6;

// Border radius
$small-border-radius-size:   2px;
$average-border-radius-size: 4px;
$large-border-radius-size:   7px;

// Hover colors
$hover-tint-color:           rgba(89, 128, 166, 0.07);
$hover-neutral-tint-color:   rgba(29, 31, 32, 0.06);
$selected-tint-color:        rgba(89, 128, 166, 0.08);

// Message colors
$error-font-color:           #b3261e;
$alert-font-color:           #9a5b00;
$sucess-font-color:          #1e7a3d;

// X
$base-leading:               24px;
$half-leading:               12px;
$page-edge-padding:          clamp(20px, 5vw, 72px);
$content-max-width:          1440px;
$reading-measure:            60ch;

// Text weight
$heading-font-weight:        600;

// Neutral ramp
$neutral-100: #f5f5f8;
$neutral-200: #e7e7ea;
$neutral-300: #d4d4d7;
$neutral-400: #b7b7ba;
$neutral-500: #98989b;
$neutral-600: #7a7a7d;
$neutral-700: #5d5d60;
$neutral-800: #424244;
$neutral-900: #2b2b2d;

// Accent ramp
$accent-100: #eef6ff;
$accent-200: #d6ebff;
$accent-300: #b5d9fd;
$accent-400: #94bce3;
$accent-500: #749dc4;
$accent-600: #597ea3;
$accent-700: #416180;
$accent-800: #2c455d;
$accent-900: #1d2d3d;

// Accent-2 ramp
$accent-2-100: #eef6ff;
$accent-2-200: #d6ebff;
$accent-2-300: #bdd8f2;
$accent-2-400: #9ebbd8;
$accent-2-500: #7e9cb8;
$accent-2-600: #627d98;
$accent-2-700: #486077;
$accent-2-800: #314457;
$accent-2-900: #1f2d3a;

// Spacing scale
$space-1: 3.4px;
$space-2: 6.8px;
$space-3: 10.2px;
$space-4: 13.6px;
$space-6: 20.4px;
$space-8: 27.2px;

// Shadows
$shadow-sm: 0 1px 2px rgba(43, 43, 45, 0.14);
$shadow-md: 0 3px 10px rgba(43, 43, 45, 0.16);
$shadow-lg: 0 12px 32px rgba(43, 43, 45, 0.22);

// Heading sizes
$h1-font-size: 42px;
$h2-font-size: 32px;
$h3-font-size: 25px;
$h4-font-size: 20px;
$h5-font-size: 16px;
$h6-font-size: 13px;
```

- [ ] **Step 1: Confirm the existing bug (this is our "failing test")**

`www/src/app.scss` currently *uses* `$primary-background-color` etc. before declaring them, which is a real compile error today. Verify it:

Run (from `www/`):
```bash
node -e '
const sass = require("sass-embedded");
try {
  sass.compile("src/app.scss");
  console.log("COMPILE OK");
} catch (e) {
  console.log("COMPILE FAILED:", e.message);
}
'
```
Expected: `COMPILE FAILED: Undefined variable.` (or similar).

- [ ] **Step 2: Create `www/src/lib/styles/_tokens.scss`**

Write the full variable list shown above into this new file, verbatim.

- [ ] **Step 3: Rewrite `www/src/app.scss`**

```scss
@use './lib/styles/tokens' as *;

// Globals
html, body {
	padding: 0;
	margin: 0;
	background-color: $primary-background-color;
	font-family: $secondary-font-family;
	color: $primary-font-color;
}

h1, h2, h3, h4, h5, h6 {
	font-family: $primary-font-family;
	font-weight: $heading-font-weight;
	line-height: 1.12;
	margin: 0 0 $space-2;
}

h1 { font-size: $h1-font-size; }
h2 { font-size: $h2-font-size; }
h3 { font-size: $h3-font-size; }
h4 { font-size: $h4-font-size; }
h5 { font-size: $h5-font-size; }
h6 { font-size: $h6-font-size; letter-spacing: 0.08em; text-transform: uppercase; }

p { margin: 0 0 $space-3; }

a {
	color: $primary-button-color;
	text-underline-offset: 3px;
}

:focus { outline: none; }
:focus-visible {
	outline: 2px solid $secondary-border-color;
	outline-offset: 2px;
}
::selection {
	background: $thirdary-button-color;
}
```

(Task 2 appends the `@font-face` rules to this same file — do not add fonts here yet.)

- [ ] **Step 4: Run the compile check again to verify it passes**

Run the same command as Step 1.
Expected: `COMPILE OK`.

- [ ] **Step 5: Commit**

```bash
git add www/src/lib/styles/_tokens.scss www/src/app.scss
git commit -m "feat(www): add design token partial and fix app.scss global reset"
```

---

## Task 2: Local fonts

**Files:**
- Create: `www/src/lib/assets/fonts/barlow/barlow-400.woff2`, `barlow-500.woff2`, `barlow-700.woff2`
- Create: `www/src/lib/assets/fonts/barlow-condensed/barlow-condensed-400.woff2`, `barlow-condensed-600.woff2`
- Modify: `www/src/app.scss`

**Interfaces:**
- Consumes: nothing from Task 1's code, but appends to the file Task 1 created.
- Produces: the two font families available globally as `"Barlow"` (400/500/700) and `"Barlow Condensed"` (400/600) — later tasks never reference these files directly, only the font-family names already used in `$primary-font-family` / `$secondary-font-family`.

- [ ] **Step 1: Download the actual woff2 files from Google Fonts' own CSS2 API**

This uses Google's real API response (not a guessed URL): request the CSS with a modern browser User-Agent (so it returns woff2), then parse out the `latin` subset's `url(...)` per weight.

Run (from `www/`):
```bash
mkdir -p src/lib/assets/fonts/barlow src/lib/assets/fonts/barlow-condensed

curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;700&display=swap" -o /tmp/barlow.css

curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600&display=swap" -o /tmp/barlow-condensed.css

node -e '
const fs = require("fs");

function download(cssPath, familySlug, destDir) {
  const css = fs.readFileSync(cssPath, "utf8");
  const re = /\/\* latin \*\/\s*@font-face\s*{[^}]*font-weight:\s*(\d+);[^}]*src:\s*url\(([^)]+)\)/g;
  let m;
  const found = [];
  while ((m = re.exec(css))) found.push({ weight: m[1], url: m[2] });
  return Promise.all(found.map(async ({ weight, url }) => {
    const res = await fetch(url);
    const buf = Buffer.from(await res.arrayBuffer());
    const dest = `${destDir}/${familySlug}-${weight}.woff2`;
    fs.writeFileSync(dest, buf);
    console.log("wrote", dest, buf.length, "bytes");
  }));
}

Promise.all([
  download("/tmp/barlow.css", "barlow", "src/lib/assets/fonts/barlow"),
  download("/tmp/barlow-condensed.css", "barlow-condensed", "src/lib/assets/fonts/barlow-condensed")
]).catch((e) => { console.error(e); process.exit(1); });
'

rm -f /tmp/barlow.css /tmp/barlow-condensed.css
```

- [ ] **Step 2: Verify the files exist and are non-empty**

Run:
```bash
ls -la src/lib/assets/fonts/barlow src/lib/assets/fonts/barlow-condensed
```
Expected: `barlow-400.woff2`, `barlow-500.woff2`, `barlow-700.woff2` and `barlow-condensed-400.woff2`, `barlow-condensed-600.woff2`, every file several KB, none zero-length.

- [ ] **Step 3: Append `@font-face` rules to `www/src/app.scss`**

Add at the end of the file:

```scss

// Local fonts (downloaded — no CDN import, per README rule)
@font-face {
	font-family: "Barlow";
	font-style: normal;
	font-weight: 400;
	font-display: swap;
	src: url('./lib/assets/fonts/barlow/barlow-400.woff2') format('woff2');
}
@font-face {
	font-family: "Barlow";
	font-style: normal;
	font-weight: 500;
	font-display: swap;
	src: url('./lib/assets/fonts/barlow/barlow-500.woff2') format('woff2');
}
@font-face {
	font-family: "Barlow";
	font-style: normal;
	font-weight: 700;
	font-display: swap;
	src: url('./lib/assets/fonts/barlow/barlow-700.woff2') format('woff2');
}
@font-face {
	font-family: "Barlow Condensed";
	font-style: normal;
	font-weight: 400;
	font-display: swap;
	src: url('./lib/assets/fonts/barlow-condensed/barlow-condensed-400.woff2') format('woff2');
}
@font-face {
	font-family: "Barlow Condensed";
	font-style: normal;
	font-weight: 600;
	font-display: swap;
	src: url('./lib/assets/fonts/barlow-condensed/barlow-condensed-600.woff2') format('woff2');
}
```

- [ ] **Step 4: Verify no CDN font import exists anywhere and the file still compiles**

Run:
```bash
grep -r "fonts.googleapis" src || echo "no CDN font import found"
node -e '
const sass = require("sass-embedded");
sass.compile("src/app.scss");
console.log("COMPILE OK");
'
```
Expected: `no CDN font import found` and `COMPILE OK`.

- [ ] **Step 5: Commit**

```bash
git add www/src/lib/assets/fonts www/src/app.scss
git commit -m "feat(www): self-host Barlow and Barlow Condensed font files"
```

---

## Task 3: Testing infrastructure & Button component

**Files:**
- Modify: `www/package.json`
- Create: `www/vitest.config.ts`
- Create: `www/src/lib/components/button/+page.ts`
- Create: `www/src/lib/components/button/button.svelte`
- Create: `www/src/lib/components/button/styles.scss`
- Create: `www/src/lib/components/button/button.test.ts`

**Interfaces:**
- Consumes: `$primary-*`/`$accent-*`/`$space-*`/`$average-border-radius-size` tokens from Task 1.
- Produces: `Button` component at `$lib/components/button/button.svelte`, props `ButtonProps` (`variant?: 'primary'|'secondary'|'ghost'`, `size?: 'md'|'icon'`, `disabled?: boolean`, `type?: 'button'|'submit'`, `block?: boolean`, `href?: string`, `onClick?: (event: MouseEvent) => void`, `children?: Snippet`) from `+page.ts`. When `href` is set it renders an `<a>` styled as a button instead of a `<button>`. Task 12 (Header) consumes this exact component and prop set.

- [ ] **Step 1: Add test dependencies**

Run (from `www/`):
```bash
bun add -d vitest @testing-library/svelte jsdom
```

- [ ] **Step 2: Create `www/vitest.config.ts`**

```ts
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [svelte({ compilerOptions: { runes: true } })],
	resolve: {
		alias: {
			$lib: fileURLToPath(new URL('./src/lib', import.meta.url))
		},
		conditions: ['browser']
	},
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.ts']
	}
});
```

- [ ] **Step 3: Add the `test` script to `www/package.json`**

Add `"test": "vitest run"` to the `"scripts"` object (alongside `dev`, `build`, `preview`, `prepare`, `check`, `check:watch`).

- [ ] **Step 4: Write the failing test — `www/src/lib/components/button/button.test.ts`**

```ts
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Button from './button.svelte';

describe('Button', () => {
	it('applies the primary variant class by default', () => {
		const { getByRole } = render(Button);
		expect(getByRole('button').className).toContain('btn-primary');
	});

	it('applies the requested variant and size classes', () => {
		const { getByRole } = render(Button, { props: { variant: 'ghost', size: 'icon' } });
		const el = getByRole('button');
		expect(el.className).toContain('btn-ghost');
		expect(el.className).toContain('btn-icon');
	});

	it('disables the button when disabled is true', () => {
		const { getByRole } = render(Button, { props: { disabled: true } });
		expect(getByRole('button').hasAttribute('disabled')).toBe(true);
	});

	it('calls onClick when clicked', async () => {
		const onClick = vi.fn();
		const { getByRole } = render(Button, { props: { onClick } });
		await fireEvent.click(getByRole('button'));
		expect(onClick).toHaveBeenCalledOnce();
	});

	it('renders as a link when href is provided', () => {
		const { getByRole } = render(Button, { props: { href: '/login' } });
		const link = getByRole('link');
		expect(link.getAttribute('href')).toBe('/login');
		expect(link.className).toContain('btn-primary');
	});
});
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `bun run test -- button.test.ts`
Expected: FAIL — `Failed to resolve import "./button.svelte"` (the component doesn't exist yet).

- [ ] **Step 6: Write `www/src/lib/components/button/+page.ts`**

```ts
import type { Snippet } from 'svelte';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'icon';

export interface ButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	type?: 'button' | 'submit';
	block?: boolean;
	href?: string;
	onClick?: (event: MouseEvent) => void;
	children?: Snippet;
}

export function buttonClass(variant: ButtonVariant, size: ButtonSize, block: boolean): string {
	const classes = ['btn', `btn-${variant}`];
	if (size === 'icon') classes.push('btn-icon');
	if (block) classes.push('btn-block');
	return classes.join(' ');
}
```

- [ ] **Step 7: Write `www/src/lib/components/button/button.svelte`**

```svelte
<script lang="ts">
	import { buttonClass, type ButtonProps } from './+page';

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		type = 'button',
		block = false,
		href,
		onClick,
		children
	}: ButtonProps = $props();
</script>

{#if href}
	<a {href} class={buttonClass(variant, size, block)} aria-disabled={disabled}>
		{@render children?.()}
	</a>
{:else}
	<button {type} class={buttonClass(variant, size, block)} {disabled} onclick={onClick}>
		{@render children?.()}
	</button>
{/if}

<style lang="scss">
	@use './styles';
</style>
```

- [ ] **Step 8: Write `www/src/lib/components/button/styles.scss`**

```scss
@use '../../styles/tokens' as *;

.btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: $space-2;
	cursor: pointer;
	text-decoration: none;
	font-family: $primary-font-family;
	font-weight: $heading-font-weight;
	font-size: 14px;
	line-height: 1.2;
	color: $primary-font-color;
	background: transparent;
	border: 1px solid $primary-border-color;
	padding: $space-2 calc(#{$space-3} * 1.2);
	border-radius: $average-border-radius-size;
}

.btn:disabled,
.btn[aria-disabled='true'] {
	opacity: 0.45;
	cursor: not-allowed;
}

.btn-primary {
	background: $primary-button-color;
	border-color: $primary-button-color;
	color: $inverted-font-color;
}
.btn-primary:hover:not(:disabled) { background: $accent-600; }
.btn-primary:active:not(:disabled) { background: $accent-700; }

.btn-secondary {
	background: $secondary-button-color;
	border-color: $primary-border-color;
	color: $primary-font-color;
}
.btn-secondary:hover:not(:disabled) { background: $hover-neutral-tint-color; }
.btn-secondary:active:not(:disabled) { background: $selected-tint-color; }

.btn-ghost {
	border-color: transparent;
	color: $primary-button-color;
	padding-inline: $space-1;
}
.btn-ghost:hover:not(:disabled) { background: $hover-tint-color; }

.btn-icon {
	width: 36px;
	height: 36px;
	padding: 0;
}

.btn-block {
	width: 100%;
	margin-top: $space-2;
}
```

- [ ] **Step 9: Run the test to verify it passes**

Run: `bun run test -- button.test.ts`
Expected: PASS, all 5 assertions green.

- [ ] **Step 10: Commit**

```bash
git add www/package.json www/bun.lock www/vitest.config.ts www/src/lib/components/button
git commit -m "test(www): add Vitest infrastructure and Button component"
```

---

## Task 4: Field component

**Files:**
- Create: `www/src/lib/components/field/+page.ts`
- Create: `www/src/lib/components/field/field.svelte`
- Create: `www/src/lib/components/field/styles.scss`
- Create: `www/src/lib/components/field/field.test.ts`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: `Field` component, props `FieldProps` (`type?: 'text'|'email'|'password'|'textarea'`, `label: string`, `name: string`, `value?: string` (bindable), `placeholder?: string`, `error?: string`, `required?: boolean`) from `+page.ts`. Not consumed elsewhere in this plan (auth/admin phases will use it later).

- [ ] **Step 1: Write the failing test — `field.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Field from './field.svelte';

describe('Field', () => {
	it('links the label to the input via id', () => {
		const { getByLabelText } = render(Field, { props: { label: 'Email', name: 'email' } });
		expect(getByLabelText('Email')).toBeTruthy();
	});

	it('renders a textarea when type is textarea', () => {
		const { getByLabelText } = render(Field, { props: { label: 'Bio', name: 'bio', type: 'textarea' } });
		expect(getByLabelText('Bio').tagName).toBe('TEXTAREA');
	});

	it('shows the error message when provided', () => {
		const { getByText } = render(Field, { props: { label: 'Email', name: 'email', error: 'Required' } });
		expect(getByText('Required')).toBeTruthy();
	});

	it('updates its value when the user types', async () => {
		const { getByLabelText } = render(Field, { props: { label: 'Email', name: 'email' } });
		const input = getByLabelText('Email') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: 'a@b.com' } });
		expect(input.value).toBe('a@b.com');
	});
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- field.test.ts`
Expected: FAIL — module `./field.svelte` not found.

- [ ] **Step 3: Write `+page.ts`**

```ts
export type FieldType = 'text' | 'email' | 'password' | 'textarea';

export interface FieldProps {
	type?: FieldType;
	label: string;
	name: string;
	value?: string;
	placeholder?: string;
	error?: string;
	required?: boolean;
}

export function inputId(name: string): string {
	return `field-${name}`;
}
```

- [ ] **Step 4: Write `field.svelte`**

```svelte
<script lang="ts">
	import { inputId, type FieldProps } from './+page';

	let {
		type = 'text',
		label,
		name,
		value = $bindable(''),
		placeholder = '',
		error = '',
		required = false
	}: FieldProps = $props();

	const id = inputId(name);
</script>

<div class="field">
	<label for={id}>{label}</label>
	{#if type === 'textarea'}
		<textarea {id} {name} {placeholder} {required} class="input" bind:value></textarea>
	{:else}
		<input {id} {name} {type} {placeholder} {required} class="input" bind:value />
	{/if}
	{#if error}
		<p class="field-error">{error}</p>
	{/if}
</div>

<style lang="scss">
	@use './styles';
</style>
```

- [ ] **Step 5: Write `styles.scss`**

```scss
@use '../../styles/tokens' as *;

.field {
	display: flex;
	flex-direction: column;
	gap: $space-1;
}

.field > label {
	font-size: 12px;
	color: $secondary-font-color;
}

.input {
	width: 100%;
	min-height: 36px;
	padding: 6px 10px;
	font-family: $secondary-font-family;
	font-size: 14px;
	color: $primary-font-color;
	caret-color: $primary-button-color;
	background: $secondary-background-color;
	border: 1px solid $primary-border-color;
	border-radius: $average-border-radius-size;
}

.input:hover { border-color: $accent-600; }
.input:focus-visible { border-color: $secondary-border-color; outline: none; }

textarea.input { min-height: 90px; resize: vertical; }

.field-error {
	margin: 0;
	font-size: 12px;
	color: $error-font-color;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `bun run test -- field.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add www/src/lib/components/field
git commit -m "feat(www): add Field component"
```

---

## Task 5: Card component

**Files:**
- Create: `www/src/lib/components/card/+page.ts`
- Create: `www/src/lib/components/card/card.svelte`
- Create: `www/src/lib/components/card/styles.scss`
- Create: `www/src/lib/components/card/card.test.ts`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: `Card` component, props `CardProps` (`kicker?: string`, `title: string`, `body: string`, `meta?: string`).

- [ ] **Step 1: Write the failing test — `card.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Card from './card.svelte';

describe('Card', () => {
	it('renders the title and body', () => {
		const { getByText } = render(Card, {
			props: { title: 'Ambientes isolados', body: 'Cada cliente roda em seu próprio ambiente.' }
		});
		expect(getByText('Ambientes isolados')).toBeTruthy();
		expect(getByText('Cada cliente roda em seu próprio ambiente.')).toBeTruthy();
	});

	it('omits the kicker and meta when not provided', () => {
		const { queryByText } = render(Card, { props: { title: 'T', body: 'B' } });
		expect(queryByText('K')).toBeNull();
	});

	it('renders the kicker and meta when provided', () => {
		const { getByText } = render(Card, { props: { title: 'T', body: 'B', kicker: 'K', meta: 'M' } });
		expect(getByText('K')).toBeTruthy();
		expect(getByText('M')).toBeTruthy();
	});
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- card.test.ts`
Expected: FAIL — module `./card.svelte` not found.

- [ ] **Step 3: Write `+page.ts`**

```ts
export interface CardProps {
	kicker?: string;
	title: string;
	body: string;
	meta?: string;
}
```

- [ ] **Step 4: Write `card.svelte`**

```svelte
<script lang="ts">
	import type { CardProps } from './+page';

	let { kicker = '', title, body, meta = '' }: CardProps = $props();
</script>

<div class="card">
	{#if kicker}
		<span class="card-kicker">{kicker}</span>
	{/if}
	<h3 class="card-title">{title}</h3>
	<p class="card-body">{body}</p>
	{#if meta}
		<span class="card-meta">{meta}</span>
	{/if}
</div>

<style lang="scss">
	@use './styles';
</style>
```

- [ ] **Step 5: Write `styles.scss`**

```scss
@use '../../styles/tokens' as *;

.card {
	display: flex;
	flex-direction: column;
	gap: $space-2;
	padding: $space-3;
	border-radius: $average-border-radius-size;
	background: $secondary-background-color;
}

.card-kicker {
	font-size: 10px;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: $primary-button-color;
}

.card-title {
	font-family: $primary-font-family;
	font-weight: $heading-font-weight;
	font-size: 17px;
	line-height: 1.2;
	margin: 0;
}

.card-body {
	margin: 0;
	font-size: 13px;
	color: $secondary-font-color;
	flex: 1;
}

.card-meta {
	font-size: 11px;
	color: $secondary-font-color;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `bun run test -- card.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add www/src/lib/components/card
git commit -m "feat(www): add Card component"
```

---

## Task 6: Tag component

**Files:**
- Create: `www/src/lib/components/tag/+page.ts`
- Create: `www/src/lib/components/tag/tag.svelte`
- Create: `www/src/lib/components/tag/styles.scss`
- Create: `www/src/lib/components/tag/tag.test.ts`

**Interfaces:**
- Consumes: `$accent-*`, `$accent-2-*`, `$neutral-*`, `$primary-button-color`, `$average-border-radius-size` tokens from Task 1.
- Produces: `Tag` component, props `TagProps` (`variant?: 'accent'|'accent-2'|'neutral'|'outline'`, `label: string`).

- [ ] **Step 1: Write the failing test — `tag.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Tag from './tag.svelte';

describe('Tag', () => {
	it('renders the label', () => {
		const { getByText } = render(Tag, { props: { label: 'Beta' } });
		expect(getByText('Beta')).toBeTruthy();
	});

	it('defaults to the neutral variant', () => {
		const { getByText } = render(Tag, { props: { label: 'Beta' } });
		expect(getByText('Beta').className).toContain('tag-neutral');
	});

	it('applies the requested variant class', () => {
		const { getByText } = render(Tag, { props: { label: 'Beta', variant: 'accent-2' } });
		expect(getByText('Beta').className).toContain('tag-accent-2');
	});
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- tag.test.ts`
Expected: FAIL — module `./tag.svelte` not found.

- [ ] **Step 3: Write `+page.ts`**

```ts
export type TagVariant = 'accent' | 'accent-2' | 'neutral' | 'outline';

export interface TagProps {
	variant?: TagVariant;
	label: string;
}

export function tagClass(variant: TagVariant): string {
	return `tag tag-${variant}`;
}
```

- [ ] **Step 4: Write `tag.svelte`**

```svelte
<script lang="ts">
	import { tagClass, type TagProps } from './+page';

	let { variant = 'neutral', label }: TagProps = $props();
</script>

<span class={tagClass(variant)}>{label}</span>

<style lang="scss">
	@use './styles';
</style>
```

- [ ] **Step 5: Write `styles.scss`**

```scss
@use '../../styles/tokens' as *;

.tag {
	display: inline-flex;
	align-items: center;
	font-size: 11px;
	letter-spacing: 0.02em;
	padding: 3px 10px;
	border-radius: calc(#{$average-border-radius-size} * 0.75);
}

.tag-accent { background: $accent-100; color: $accent-800; }
.tag-accent-2 { background: $accent-2-100; color: $accent-2-800; }
.tag-neutral { background: $neutral-100; color: $neutral-800; }
.tag-outline { border: 1px solid $primary-button-color; color: $primary-button-color; }
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `bun run test -- tag.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add www/src/lib/components/tag
git commit -m "feat(www): add Tag component"
```

---

## Task 7: Radio component

**Files:**
- Create: `www/src/lib/components/radio/+page.ts`
- Create: `www/src/lib/components/radio/radio.svelte`
- Create: `www/src/lib/components/radio/styles.scss`
- Create: `www/src/lib/components/radio/radio.test.ts`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: `Radio` component, props `RadioProps` (`name: string`, `value: string`, `label: string`, `checked?: boolean`, `onChange?: (value: string) => void`).

- [ ] **Step 1: Write the failing test — `radio.test.ts`**

```ts
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Radio from './radio.svelte';

describe('Radio', () => {
	it('renders its label', () => {
		const { getByLabelText } = render(Radio, { props: { name: 'g', value: 'a', label: 'Option A' } });
		expect(getByLabelText('Option A')).toBeTruthy();
	});

	it('reflects the checked prop', () => {
		const { getByLabelText } = render(Radio, {
			props: { name: 'g', value: 'a', label: 'Option A', checked: true }
		});
		expect((getByLabelText('Option A') as HTMLInputElement).checked).toBe(true);
	});

	it('calls onChange with its value when selected', async () => {
		const onChange = vi.fn();
		const { getByLabelText } = render(Radio, {
			props: { name: 'g', value: 'a', label: 'Option A', onChange }
		});
		await fireEvent.click(getByLabelText('Option A'));
		expect(onChange).toHaveBeenCalledWith('a');
	});
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- radio.test.ts`
Expected: FAIL — module `./radio.svelte` not found.

- [ ] **Step 3: Write `+page.ts`**

```ts
export interface RadioProps {
	name: string;
	value: string;
	label: string;
	checked?: boolean;
	onChange?: (value: string) => void;
}

export function handleChange(event: Event, value: string, onChange?: (value: string) => void): void {
	const target = event.currentTarget as HTMLInputElement;
	if (target.checked) onChange?.(value);
}
```

- [ ] **Step 4: Write `radio.svelte`**

```svelte
<script lang="ts">
	import { handleChange, type RadioProps } from './+page';

	let { name, value, label, checked = false, onChange }: RadioProps = $props();
</script>

<label class="radio">
	<input
		type="radio"
		{name}
		{value}
		{checked}
		onchange={(event) => handleChange(event, value, onChange)}
	/>
	<span class="dot"></span>
	{label}
</label>

<style lang="scss">
	@use './styles';
</style>
```

- [ ] **Step 5: Write `styles.scss`**

```scss
@use '../../styles/tokens' as *;

.radio {
	display: inline-flex;
	align-items: center;
	gap: $space-2;
	cursor: pointer;
	font-size: 14px;
	color: $primary-font-color;
}

.radio input {
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;
	pointer-events: none;
}

.radio .dot {
	width: 16px;
	height: 16px;
	flex: none;
	border-radius: 50%;
	border: 1.5px solid $primary-border-color;
}

.radio:hover .dot { border-color: $secondary-border-color; }

.radio input:checked + .dot {
	border-color: $secondary-border-color;
	background: $primary-button-color;
	box-shadow: inset 0 0 0 4px $primary-background-color;
}

.radio input:focus-visible + .dot {
	outline: 2px solid $secondary-border-color;
	outline-offset: 2px;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `bun run test -- radio.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add www/src/lib/components/radio
git commit -m "feat(www): add Radio component"
```

---

## Task 8: Segmented component

**Files:**
- Create: `www/src/lib/components/segmented/+page.ts`
- Create: `www/src/lib/components/segmented/segmented.svelte`
- Create: `www/src/lib/components/segmented/styles.scss`
- Create: `www/src/lib/components/segmented/segmented.test.ts`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: `Segmented` component, props `SegmentedProps` (`name: string`, `options: SegmentedOption[]`, `selected: string`, `onSelect?: (value: string) => void`), and type `SegmentedOption` (`value: string`, `label: string`).

- [ ] **Step 1: Write the failing test — `segmented.test.ts`**

```ts
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Segmented from './segmented.svelte';

const options = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' }
];

describe('Segmented', () => {
	it('renders every option label', () => {
		const { getByText } = render(Segmented, { props: { name: 'g', options, selected: 'a' } });
		expect(getByText('Option A')).toBeTruthy();
		expect(getByText('Option B')).toBeTruthy();
	});

	it('marks the selected option as checked', () => {
		const { getByLabelText } = render(Segmented, { props: { name: 'g', options, selected: 'b' } });
		expect((getByLabelText('Option B') as HTMLInputElement).checked).toBe(true);
		expect((getByLabelText('Option A') as HTMLInputElement).checked).toBe(false);
	});

	it('calls onSelect with the newly chosen value', async () => {
		const onSelect = vi.fn();
		const { getByLabelText } = render(Segmented, {
			props: { name: 'g', options, selected: 'a', onSelect }
		});
		await fireEvent.click(getByLabelText('Option B'));
		expect(onSelect).toHaveBeenCalledWith('b');
	});
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- segmented.test.ts`
Expected: FAIL — module `./segmented.svelte` not found.

- [ ] **Step 3: Write `+page.ts`**

```ts
export interface SegmentedOption {
	value: string;
	label: string;
}

export interface SegmentedProps {
	name: string;
	options: SegmentedOption[];
	selected: string;
	onSelect?: (value: string) => void;
}

export function handleSelect(event: Event, onSelect?: (value: string) => void): void {
	const target = event.currentTarget as HTMLInputElement;
	if (target.checked) onSelect?.(target.value);
}
```

- [ ] **Step 4: Write `segmented.svelte`**

```svelte
<script lang="ts">
	import { handleSelect, type SegmentedProps } from './+page';

	let { name, options, selected, onSelect }: SegmentedProps = $props();
</script>

<div class="seg">
	{#each options as option (option.value)}
		<label class="seg-opt">
			<input
				type="radio"
				{name}
				value={option.value}
				checked={option.value === selected}
				onchange={(event) => handleSelect(event, onSelect)}
			/>
			{option.label}
		</label>
	{/each}
</div>

<style lang="scss">
	@use './styles';
</style>
```

- [ ] **Step 5: Write `styles.scss`**

```scss
@use '../../styles/tokens' as *;

.seg {
	display: inline-flex;
	overflow: hidden;
	border: 1px solid $primary-border-color;
	border-radius: $average-border-radius-size;
}

.seg-opt {
	display: inline-flex;
	align-items: center;
	gap: $space-1;
	padding: 7px 12px;
	font-size: 13px;
	cursor: pointer;
	color: $primary-font-color;
}

.seg-opt input {
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;
	pointer-events: none;
}

.seg-opt + .seg-opt {
	border-left: 1px solid $primary-border-color;
}

.seg-opt:has(input:checked) {
	background: $primary-button-color;
	color: $inverted-font-color;
}

.seg-opt:not(:has(input:checked)):hover {
	background: $hover-neutral-tint-color;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `bun run test -- segmented.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add www/src/lib/components/segmented
git commit -m "feat(www): add Segmented component"
```

---

## Task 9: Table component

**Files:**
- Create: `www/src/lib/components/table/+page.ts`
- Create: `www/src/lib/components/table/table.svelte`
- Create: `www/src/lib/components/table/styles.scss`
- Create: `www/src/lib/components/table/table.test.ts`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: `Table` component (generic over `Row`), type `TableColumn<Row>` (`key: keyof Row & string`, `header: string`), props (`columns: TableColumn<Row>[]`, `rows: Row[]`, `getRowId: (row: Row) => string`).

- [ ] **Step 1: Write the failing test — `table.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Table from './table.svelte';
import type { TableColumn } from './+page';

interface Person {
	id: string;
	name: string;
	age: number;
}

const columns: TableColumn<Person>[] = [
	{ key: 'name', header: 'Name' },
	{ key: 'age', header: 'Age' }
];

const rows: Person[] = [
	{ id: '1', name: 'Ana', age: 30 },
	{ id: '2', name: 'Bruno', age: 25 }
];

describe('Table', () => {
	it('renders column headers', () => {
		const { getByText } = render(Table, { props: { columns, rows, getRowId: (r: Person) => r.id } });
		expect(getByText('Name')).toBeTruthy();
		expect(getByText('Age')).toBeTruthy();
	});

	it('renders every row cell', () => {
		const { getByText } = render(Table, { props: { columns, rows, getRowId: (r: Person) => r.id } });
		expect(getByText('Ana')).toBeTruthy();
		expect(getByText('Bruno')).toBeTruthy();
		expect(getByText('25')).toBeTruthy();
	});
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- table.test.ts`
Expected: FAIL — module `./table.svelte` not found.

- [ ] **Step 3: Write `+page.ts`**

```ts
export interface TableColumn<Row> {
	key: keyof Row & string;
	header: string;
}
```

- [ ] **Step 4: Write `table.svelte`**

```svelte
<script lang="ts" generics="Row extends Record<string, unknown>">
	import type { TableColumn } from './+page';

	let {
		columns,
		rows,
		getRowId
	}: {
		columns: TableColumn<Row>[];
		rows: Row[];
		getRowId: (row: Row) => string;
	} = $props();
</script>

<table class="table">
	<thead>
		<tr>
			{#each columns as column (column.key)}
				<th>{column.header}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each rows as row (getRowId(row))}
			<tr>
				{#each columns as column (column.key)}
					<td>{String(row[column.key])}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	@use './styles';
</style>
```

- [ ] **Step 5: Write `styles.scss`**

```scss
@use '../../styles/tokens' as *;

.table {
	width: 100%;
	border-collapse: collapse;
	font-size: 14px;
	color: $primary-font-color;
}

.table th {
	text-align: left;
	font-size: 11px;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: $secondary-font-color;
	padding: $space-2;
	border-bottom: 1px solid $primary-border-color;
}

.table td {
	padding: $space-2;
	border-bottom: 1px solid $primary-border-color;
}

.table tbody tr:hover {
	background: $hover-neutral-tint-color;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `bun run test -- table.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add www/src/lib/components/table
git commit -m "feat(www): add generic Table component"
```

---

## Task 10: Dialog component

**Files:**
- Create: `www/src/lib/components/dialog/+page.ts`
- Create: `www/src/lib/components/dialog/dialog.svelte`
- Create: `www/src/lib/components/dialog/styles.scss`
- Create: `www/src/lib/components/dialog/dialog.test.ts`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: `Dialog` component, props `DialogProps` (`open: boolean`, `title: string`, `onClose: () => void`, `children?: Snippet`, `actions?: Snippet`). No `onMount`/focus-trap logic — visibility is purely driven by the `open` prop, per spec non-goals.

- [ ] **Step 1: Write the failing test — `dialog.test.ts`**

```ts
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Dialog from './dialog.svelte';

describe('Dialog', () => {
	it('renders nothing when closed', () => {
		const { queryByRole } = render(Dialog, { props: { open: false, title: 'Confirm', onClose: () => {} } });
		expect(queryByRole('dialog')).toBeNull();
	});

	it('renders the dialog with its title when open', () => {
		const { getByRole } = render(Dialog, { props: { open: true, title: 'Confirm', onClose: () => {} } });
		const dialog = getByRole('dialog');
		expect(dialog).toBeTruthy();
		expect(dialog.getAttribute('aria-label')).toBe('Confirm');
	});

	it('calls onClose when the backdrop is clicked', async () => {
		const onClose = vi.fn();
		const { getByRole } = render(Dialog, { props: { open: true, title: 'Confirm', onClose } });
		const backdrop = getByRole('dialog').parentElement as HTMLElement;
		await fireEvent.click(backdrop);
		expect(onClose).toHaveBeenCalledOnce();
	});

	it('does not call onClose when the dialog body itself is clicked', async () => {
		const onClose = vi.fn();
		const { getByRole } = render(Dialog, { props: { open: true, title: 'Confirm', onClose } });
		await fireEvent.click(getByRole('dialog'));
		expect(onClose).not.toHaveBeenCalled();
	});
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- dialog.test.ts`
Expected: FAIL — module `./dialog.svelte` not found.

- [ ] **Step 3: Write `+page.ts`**

```ts
import type { Snippet } from 'svelte';

export interface DialogProps {
	open: boolean;
	title: string;
	onClose: () => void;
	children?: Snippet;
	actions?: Snippet;
}

export function handleBackdropClick(event: MouseEvent, onClose: () => void): void {
	if (event.target === event.currentTarget) onClose();
}
```

- [ ] **Step 4: Write `dialog.svelte`**

```svelte
<script lang="ts">
	import { handleBackdropClick, type DialogProps } from './+page';

	let { open, title, onClose, children, actions }: DialogProps = $props();
</script>

{#if open}
	<div class="dialog-backdrop" onclick={(event) => handleBackdropClick(event, onClose)}>
		<div class="dialog" role="dialog" aria-modal="true" aria-label={title}>
			<h2 class="dialog-title">{title}</h2>
			<div class="dialog-body">
				{@render children?.()}
			</div>
			{#if actions}
				<div class="dialog-actions">
					{@render actions()}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@use './styles';
</style>
```

- [ ] **Step 5: Write `styles.scss`**

```scss
@use '../../styles/tokens' as *;

.dialog-backdrop {
	position: fixed;
	inset: 0;
	display: grid;
	place-items: center;
	padding: $space-4;
	background: rgba(29, 45, 61, 0.5);
}

.dialog {
	width: min(440px, 100%);
	display: flex;
	flex-direction: column;
	gap: $space-3;
	padding: $space-4;
	border-radius: $large-border-radius-size;
	background: $primary-background-color;
	box-shadow: $shadow-lg;
}

.dialog-title {
	font-family: $primary-font-family;
	font-weight: $heading-font-weight;
	font-size: 20px;
	margin: 0;
}

.dialog-body {
	font-size: 14px;
	color: $secondary-font-color;
}

.dialog-actions {
	display: flex;
	justify-content: flex-end;
	gap: $space-2;
	margin-top: $space-2;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `bun run test -- dialog.test.ts`
Expected: PASS, all 4 assertions green.

- [ ] **Step 7: Commit**

```bash
git add www/src/lib/components/dialog
git commit -m "feat(www): add Dialog component"
```

---

## Task 11: i18n store & dictionaries

**Files:**
- Modify: `www/src/lib/i18n/en.json`
- Modify: `www/src/lib/i18n/pt-br.json`
- Create: `www/src/lib/i18n/store.svelte.ts`
- Create: `www/src/lib/i18n/store.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `Locale = 'en' | 'pt-br'` type, `I18nStore` class, and its singleton `i18n` instance, all importable as `import { i18n, type Locale } from '$lib/i18n/store.svelte';`. Public surface: `i18n.locale` (reactive `Locale`, default `'pt-br'`), `i18n.init(): void` (reads persisted locale — call once from `+layout.ts`), `i18n.setLocale(locale: Locale): void`, `i18n.t(key: string): string` (dot-path lookup, returns the key itself if missing). Dictionary keys produced this task: `brand`, `nav.home`, `nav.infrastructure`, `nav.documentation`, `nav.prices`, `nav.contact`, `nav.login`, `nav.register`, `footer.tagline`, `footer.copyright`, `language.toggleLabel`, `language.en`, `language.pt-br`. Tasks 12-14 (Header, Footer, root layout) consume `i18n` and these exact keys.

- [ ] **Step 1: Write the failing test — `store.test.ts`**

```ts
import { afterEach, describe, expect, it } from 'vitest';
import { i18n } from './store.svelte';

describe('I18nStore', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
		localStorage.clear();
	});

	it('defaults to pt-br', () => {
		expect(i18n.locale).toBe('pt-br');
	});

	it('resolves a dot-path key from the active dictionary', () => {
		expect(i18n.t('nav.home')).toBe('Início');
	});

	it('falls back to the key itself when missing', () => {
		expect(i18n.t('nope.missing')).toBe('nope.missing');
	});

	it('switches dictionaries and persists the choice', () => {
		i18n.setLocale('en');
		expect(i18n.t('nav.home')).toBe('Home');
		expect(localStorage.getItem('noxacloud.locale')).toBe('en');
	});

	it('init reads a previously persisted locale', () => {
		localStorage.setItem('noxacloud.locale', 'en');
		i18n.init();
		expect(i18n.locale).toBe('en');
	});
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- store.test.ts`
Expected: FAIL — module `./store.svelte` not found.

- [ ] **Step 3: Write `www/src/lib/i18n/en.json`**

```json
{
	"brand": "Noxacloud",
	"nav": {
		"home": "Home",
		"infrastructure": "Infrastructure",
		"documentation": "Documentation",
		"prices": "Prices",
		"contact": "Contact",
		"login": "Log in",
		"register": "Sign up"
	},
	"footer": {
		"tagline": "Custom-built infrastructure for your business.",
		"copyright": "© {year} Noxacloud. All rights reserved."
	},
	"language": {
		"toggleLabel": "Language",
		"en": "English",
		"pt-br": "Portuguese (Brazil)"
	}
}
```

- [ ] **Step 4: Write `www/src/lib/i18n/pt-br.json`**

```json
{
	"brand": "Noxacloud",
	"nav": {
		"home": "Início",
		"infrastructure": "Infraestrutura",
		"documentation": "Documentação",
		"prices": "Preços",
		"contact": "Contato",
		"login": "Entrar",
		"register": "Criar conta"
	},
	"footer": {
		"tagline": "Infraestrutura sob medida para o seu negócio.",
		"copyright": "© {year} Noxacloud. Todos os direitos reservados."
	},
	"language": {
		"toggleLabel": "Idioma",
		"en": "Inglês",
		"pt-br": "Português (Brasil)"
	}
}
```

- [ ] **Step 5: Write `www/src/lib/i18n/store.svelte.ts`**

```ts
import en from './en.json';
import ptBr from './pt-br.json';

export type Locale = 'en' | 'pt-br';

type Dictionary = Record<string, unknown>;

const DICTIONARIES: Record<Locale, Dictionary> = { en, 'pt-br': ptBr };
const STORAGE_KEY = 'noxacloud.locale';

function readStoredLocale(): Locale {
	if (typeof localStorage === 'undefined') return 'pt-br';
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored === 'en' || stored === 'pt-br' ? stored : 'pt-br';
}

function lookup(dictionary: Dictionary, key: string): string | undefined {
	const value = key.split('.').reduce<unknown>((node, segment) => {
		return typeof node === 'object' && node !== null ? (node as Dictionary)[segment] : undefined;
	}, dictionary);
	return typeof value === 'string' ? value : undefined;
}

export class I18nStore {
	locale: Locale = $state('pt-br');

	init(): void {
		this.locale = readStoredLocale();
	}

	setLocale(locale: Locale): void {
		this.locale = locale;
		if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, locale);
	}

	t(key: string): string {
		return lookup(DICTIONARIES[this.locale], key) ?? key;
	}
}

export const i18n = new I18nStore();
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `bun run test -- store.test.ts`
Expected: PASS, all 5 assertions green.

- [ ] **Step 7: Commit**

```bash
git add www/src/lib/i18n
git commit -m "feat(www): add I18nStore with en/pt-br dictionaries"
```

---

## Task 12: Header component

**Files:**
- Modify: `www/src/lib/components/header/+page.ts`
- Modify: `www/src/lib/components/header/header.svelte`
- Modify: `www/src/lib/components/header/styles.scss`
- Create: `www/src/lib/components/header/header.test.ts`

**Interfaces:**
- Consumes: `Button` (`$lib/components/button/button.svelte`, props `variant`, `href`, `onClick`, `children`) from Task 3; `i18n` singleton and its dictionary keys from Task 11.
- Produces: `Header` component (no props — reads `i18n` directly). Task 14 (root layout) renders it with no props.

- [ ] **Step 1: Write the failing test — `header.test.ts`**

```ts
import { afterEach, describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Header from './header.svelte';
import { i18n } from '$lib/i18n/store.svelte';

describe('Header', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders the brand and every public nav link', () => {
		const { getByText } = render(Header);
		expect(getByText('Noxacloud')).toBeTruthy();
		expect(getByText('Início')).toBeTruthy();
		expect(getByText('Infraestrutura')).toBeTruthy();
		expect(getByText('Documentação')).toBeTruthy();
		expect(getByText('Preços')).toBeTruthy();
		expect(getByText('Contato')).toBeTruthy();
	});

	it('renders login and register as links to their routes', () => {
		const { getByText } = render(Header);
		expect(getByText('Entrar').closest('a')?.getAttribute('href')).toBe('/login');
		expect(getByText('Criar conta').closest('a')?.getAttribute('href')).toBe('/register');
	});

	it('switches locale when the language toggle is clicked', async () => {
		const { getByText } = render(Header);
		await fireEvent.click(getByText('Inglês'));
		expect(i18n.locale).toBe('en');
	});
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- header.test.ts`
Expected: FAIL — the current `header.svelte` is empty, so none of the queried text exists.

- [ ] **Step 3: Write `+page.ts`**

```ts
import { i18n, type Locale } from '$lib/i18n/store.svelte';

export interface NavLink {
	href: string;
	labelKey: string;
}

export const NAV_LINKS: NavLink[] = [
	{ href: '/', labelKey: 'nav.home' },
	{ href: '/infrastructure', labelKey: 'nav.infrastructure' },
	{ href: '/documentation', labelKey: 'nav.documentation' },
	{ href: '/prices', labelKey: 'nav.prices' },
	{ href: '/contact', labelKey: 'nav.contact' }
];

export function otherLocale(locale: Locale): Locale {
	return locale === 'pt-br' ? 'en' : 'pt-br';
}

export function toggleLocale(): void {
	i18n.setLocale(otherLocale(i18n.locale));
}
```

- [ ] **Step 4: Write `header.svelte`**

```svelte
<script lang="ts">
	import { i18n } from '$lib/i18n/store.svelte';
	import Button from '$lib/components/button/button.svelte';
	import { NAV_LINKS, otherLocale, toggleLocale } from './+page';
</script>

<header class="nav">
	<a class="nav-brand" href="/">{i18n.t('brand')}</a>
	{#each NAV_LINKS as link (link.href)}
		<a href={link.href}>{i18n.t(link.labelKey)}</a>
	{/each}
	<Button variant="ghost" onClick={toggleLocale}>
		{i18n.t(`language.${otherLocale(i18n.locale)}`)}
	</Button>
	<Button variant="secondary" href="/login">{i18n.t('nav.login')}</Button>
	<Button variant="primary" href="/register">{i18n.t('nav.register')}</Button>
</header>

<style lang="scss">
	@use './styles';
</style>
```

- [ ] **Step 5: Write `styles.scss`**

```scss
@use '../../styles/tokens' as *;

.nav {
	display: flex;
	align-items: center;
	gap: $space-6;
	padding: $space-3 $page-edge-padding;
	min-height: 68px;
	box-sizing: border-box;
	background: $primary-background-color;
	border-bottom: 1px solid $primary-border-color;
}

.nav-brand {
	font-family: $primary-font-family;
	font-weight: $heading-font-weight;
	font-size: 18px;
	color: $primary-font-color;
	text-decoration: none;
	margin-right: auto;
}

.nav a {
	color: $secondary-font-color;
	text-decoration: none;
	font-size: 14px;
	white-space: nowrap;
}

.nav a:hover {
	color: $primary-button-color;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `bun run test -- header.test.ts`
Expected: PASS, all 3 assertions green.

- [ ] **Step 7: Commit**

```bash
git add www/src/lib/components/header
git commit -m "feat(www): build Header with nav, auth links and language toggle"
```

---

## Task 13: Footer component

**Files:**
- Modify: `www/src/lib/components/footer/+page.ts`
- Modify: `www/src/lib/components/footer/footer.svelte`
- Modify: `www/src/lib/components/footer/styles.scss`
- Create: `www/src/lib/components/footer/footer.test.ts`

**Interfaces:**
- Consumes: `i18n` singleton and its dictionary keys from Task 11.
- Produces: `Footer` component (no props). Task 14 (root layout) renders it with no props.

- [ ] **Step 1: Write the failing test — `footer.test.ts`**

```ts
import { afterEach, describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Footer from './footer.svelte';
import { i18n } from '$lib/i18n/store.svelte';

describe('Footer', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders the brand and tagline', () => {
		const { getByText } = render(Footer);
		expect(getByText('Noxacloud')).toBeTruthy();
		expect(getByText('Infraestrutura sob medida para o seu negócio.')).toBeTruthy();
	});

	it('renders the copyright with the current year', () => {
		const { getByText } = render(Footer);
		const year = new Date().getFullYear();
		expect(getByText(new RegExp(String(year)))).toBeTruthy();
	});
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- footer.test.ts`
Expected: FAIL — the current `footer.svelte` is empty.

- [ ] **Step 3: Write `+page.ts`**

```ts
export function copyrightText(template: string, year: number): string {
	return template.replace('{year}', String(year));
}

export function currentYear(): number {
	return new Date().getFullYear();
}
```

- [ ] **Step 4: Write `footer.svelte`**

```svelte
<script lang="ts">
	import { i18n } from '$lib/i18n/store.svelte';
	import { copyrightText, currentYear } from './+page';
</script>

<footer class="site-footer">
	<span class="nav-brand">{i18n.t('brand')}</span>
	<p class="footer-tagline">{i18n.t('footer.tagline')}</p>
	<p class="footer-copyright">{copyrightText(i18n.t('footer.copyright'), currentYear())}</p>
</footer>

<style lang="scss">
	@use './styles';
</style>
```

- [ ] **Step 5: Write `styles.scss`**

```scss
@use '../../styles/tokens' as *;

.site-footer {
	display: flex;
	flex-direction: column;
	gap: $space-2;
	padding: $space-8 $page-edge-padding;
	background: $thirdary-background-color;
	color: $inverted-font-color-muted;
}

.nav-brand {
	font-family: $primary-font-family;
	font-weight: $heading-font-weight;
	font-size: 18px;
	color: $inverted-font-color;
}

.footer-tagline {
	margin: 0;
	font-size: 14px;
}

.footer-copyright {
	margin: 0;
	font-size: 12px;
	color: $inverted-font-color-muted;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `bun run test -- footer.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add www/src/lib/components/footer
git commit -m "feat(www): build Footer with brand, tagline and copyright"
```

---

## Task 14: Wire the root layout

**Files:**
- Modify: `www/src/routes/+layout.svelte`
- Modify: `www/src/routes/+layout.ts`

**Interfaces:**
- Consumes: `Header` (Task 12), `Footer` (Task 13), `i18n.init()` (Task 11).
- Produces: every route now renders inside `Header` + `Footer` chrome, and the persisted locale is loaded once at startup.

- [ ] **Step 1: Write `www/src/routes/+layout.ts`**

```ts
import { i18n } from '$lib/i18n/store.svelte';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = false;

export const load: LayoutLoad = () => {
	i18n.init();
	return {};
};
```

- [ ] **Step 2: Write `www/src/routes/+layout.svelte`**

```svelte
<script lang="ts">
	import '../app.scss';
	import favicon from '$lib/assets/icons/favicon.svg';
	import Header from '$lib/components/header/header.svelte';
	import Footer from '$lib/components/footer/footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
{@render children()}
<Footer />
```

- [ ] **Step 3: Run the full test suite to confirm nothing broke**

Run (from `www/`): `bun run test`
Expected: every test file passes (Button, Field, Card, Tag, Radio, Segmented, Table, Dialog, I18nStore, Header, Footer).

- [ ] **Step 4: Run svelte-check to confirm the layout wiring type-checks**

Run: `bun run check`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add www/src/routes/+layout.svelte www/src/routes/+layout.ts
git commit -m "feat(www): wire Header/Footer and i18n init into the root layout"
```

---

## Task 15: Final acceptance pass

**Files:** none created — verification only (fix-and-recommit if any check below fails).

**Interfaces:**
- Consumes: everything produced by Tasks 1-14.
- Produces: confirmation the Foundation phase's spec acceptance criteria all hold, so Phase 2 (public marketing pages) can safely build on top.

- [ ] **Step 1: Run the full test suite**

Run: `bun run test`
Expected: all test files pass, 0 failures.

- [ ] **Step 2: Run type checking**

Run: `bun run check`
Expected: no errors.

- [ ] **Step 3: Confirm no CDN font import anywhere**

Run: `grep -r "fonts.googleapis" src`
Expected: no matches (command exits non-zero / prints nothing).

- [ ] **Step 4: Confirm no empty/placeholder token values**

Run: `grep -E '\$[a-zA-Z0-9_-]+:\s*;' src/lib/styles/_tokens.scss`
Expected: no matches.

- [ ] **Step 5: Confirm no `onMount` usage anywhere in `www/src`**

Run: `grep -rn "onMount" src`
Expected: no matches.

- [ ] **Step 6: Confirm every component/route file has exactly its 4 mandated files**

Run:
```bash
for dir in src/lib/components/*/; do
  ls "$dir" | wc -l | xargs echo "$dir:"
done
```
Expected: every directory lists exactly 4 entries (`+page.ts`, `<name>.svelte`, `styles.scss`, `<name>.test.ts`).

- [ ] **Step 7: Confirm `llms.txt` / `robots.txt` need no changes**

Run: `cat static/llms.txt static/robots.txt`
Confirm: no new routes were added this phase (only component/layout work), so both files are reviewed and correctly left as-is — no private/auth-gated route was exposed.

- [ ] **Step 8: If every check above passed, this task requires no commit.** If any check failed, fix the offending file(s) and commit:

```bash
git add -A www/src
git commit -m "fix(www): address foundation-phase acceptance gaps"
```
