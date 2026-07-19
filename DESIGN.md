# thingineeer privacy design system

## 1. Direction

- Purpose: one stable, public privacy-policy URL for every thingineeer app.
- Tone: calm, factual, readable, and operational rather than promotional.
- Visual continuity: preserve the existing warm-white editorial page and rust accent.
- Signature interaction: an app finder that deep-links to each app without hiding the full policy from users or search engines.

## 2. Tokens

### Color

- `ink`: `#191817`
- `ink-subtle`: `#4b4946`
- `muted`: `#716e69`
- `accent`: `#a64f3a`
- `accent-hover`: `#8f402e`
- `accent-soft`: `#f5e6df`
- `canvas`: `#fffdf9`
- `surface`: `#f7f4ef`
- `surface-strong`: `#eee9e2`
- `line`: `#ded8cf`
- `focus`: `#2563eb`
- `ink-surface`: `#2b2927`
- `ink-line`: `#5f5b56`
- `ink-label`: `#c9c4bd`
- `ink-chip`: `#ebe7e1`
- `ink-chip-hover`: `#bcb5ac`
- `white`: `#ffffff`

### Typography

- Sans: system UI stack with Apple SD Gothic Neo for Korean.
- Mono: SFMono-Regular / Menlo for metadata and platform labels.
- Display: 48/52 desktop, 36/40 mobile, weight 650.
- Section: 28/36, weight 650.
- Card title: 20/28, weight 650.
- Body: 16/28.
- Caption: 13/20.

### Spacing and shape

- Base unit: 4px.
- Content container: 1040px; reading column: 720px.
- Radius: 10px controls, 16px cards, 24px feature surface.
- Depth: borders and tonal shifts only; no drop shadows.

## 3. Layout

- Sticky global navigation.
- Intro and scope summary in a narrow reading column.
- App finder uses an accessible select plus direct anchor chips.
- Each app is a semantic `article` with a stable fragment identifier.
- Common obligations follow the app directory once, avoiding duplicated legal copy.
- Mobile cards collapse to one column with no horizontal tables.

## 4. Interaction and accessibility

- Every control has a visible focus ring.
- App selection scrolls to and briefly highlights the chosen article.
- Direct URLs such as `/privacy/#ddalggak` work without JavaScript.
- `prefers-reduced-motion` disables smooth scrolling and highlight animation.
- A skip link is the first focusable element.
- Text remains available in the DOM; filtering never becomes the only way to read the policy.

## 5. Reusable patterns

- `eyebrow`: mono metadata label with an accent marker.
- `scope-panel`: high-level applicability and effective-date summary.
- `app-finder`: select control plus direct app anchors.
- `app-policy`: per-app data, purpose, provider, retention, and deletion card.
- `fact-list`: responsive definition list replacing dense tables.
- `policy-section`: shared policy section with a stable anchor.
- `service-link`: external processor/privacy reference with explicit label.

## 6. Content rules

- Describe only data handling verified in current app code or an existing app-specific policy.
- Separate on-device data, server data, optional data, and SDK-processed data.
- Name retention/deletion behavior; do not use vague phrases such as “as needed.”
- Identify the policy operator without duplicating store-facing developer labels.
- Keep the same public URL for existing store listings; use fragments only as optional shortcuts.
