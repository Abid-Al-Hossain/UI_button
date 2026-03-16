# UI Foundry Button Component Generator

Standalone button component generator built with Next.js. This project is intended to be sold as an individual UI generator before the larger UI Foundry SaaS product is finalized.

## What it does

- Interactive button playground with sectioned controls
- Live design preview
- Code export and download
- React/JSX and HTML export
- Loading, icon, hover, active, disabled, focus, and accessibility controls
- Motion system with controllable button, text, and 3D shell animation plus hover FX and click FX

## Motion system

- No on-load animation presets
- Global motion controls:
  - duration
  - speed
  - intensity
  - easing
  - text stagger
- Button motion presets:
  - `Breathe`
  - `Soft Drift`
  - `Soft Glow`
  - `Sheen Sweep`
  - `Aurora Drift`
  - `Neon Pulse`
  - `Cyberpunk Glitch`
- Text motion presets:
  - `Wave`
  - `Bounce`
  - `Flicker`
  - `Shimmer`
  - `Glitch`
- 3D shell motion presets:
  - `Rock`
  - `Orbit`
  - `Gyro`
  - `Tilt Cycle`

## Current release goal

This package is being prepared as a marketplace-ready standalone generator for platforms like Gumroad or Envato.

## Requirements

- Node.js 20 or newer
- npm 10 or newer recommended

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production checks

```bash
npm run lint
npm run typecheck
npm run build
npm run qa:features
```

Or run the combined check:

```bash
npm run qa
```

## Project structure

- `app/page.tsx`: main generator page and state wiring
- `app/_section/*`: editor sections and live preview
- `app/_utils/exportUtils.ts`: export and download logic
- `app/_utils/previewDoc.ts`: iframe preview document logic
- `scripts/qa-feature-checks.mjs`: automated export feature verification
- `components/*`: shared layout, editor, and export UI pieces

## Packaging notes

- `node_modules` should not be included in marketplace delivery artifacts
- `.next` should not be included in marketplace delivery artifacts
- create the final distributable zip only after manual QA sign-off

## Known boundaries

- The 3D icon engine is intentionally not part of the active editor surface
- Undo/redo history is debounce-based, so very fast toggle-flip-toggle sequences may collapse into one history step
- Motion presets respect `prefers-reduced-motion` in preview and exported code
- Exported React and HTML output use the same motion model as the live preview
- `npm run qa` passes, but lint still reports a legacy warning backlog in editor/theme files that should be reduced before final marketplace release

## QA

The current QA checklist lives in [docs/QA_CHECKLIST.md](./docs/QA_CHECKLIST.md).

## Changelog

Release notes live in [CHANGELOG.md](./CHANGELOG.md).
