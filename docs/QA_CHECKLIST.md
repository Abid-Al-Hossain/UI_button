# Button Component QA Checklist

This checklist records the current standalone button-generator verification status for marketplace preparation.

QA run recorded: `2026-03-16`

Method used:
- `npm run qa`
- automated export assertions from `scripts/qa-feature-checks.mjs`
- source-parity review across `app/page.tsx`, `app/_section/LivePreview.tsx`, `app/_utils/exportUtils.ts`, and `app/_utils/previewDoc.ts`

## Command checks

- [x] `npm run lint` passes
- [x] `npm run typecheck` passes
- [x] `npm run build` passes
- [x] `npm run qa:features` passes with `37/37` export feature checks
- [x] `npm run qa` passes end-to-end with lint warnings but no errors

## Packaging checks

- [x] `README.md` exists
- [x] `.gitignore` exists
- [x] `CHANGELOG.md` exists
- [x] ESLint 9 flat config exists
- [x] package metadata is specific to the standalone product
- [ ] final delivery zip prepared

## Feature checks

### Basics
- [x] label updates preview and exported code
- [x] solid/outline/ghost styling values export correctly after preset selection
- [x] disabled toggle updates preview and exported code
- [x] loading toggle updates preview and exported code
- [x] motion section state updates preview and exported code

### Sizing and layout
- [x] width and height update preview and exported code
- [x] padding updates preview and exported code
- [x] text alignment updates preview and exported code
- [x] icon gap updates preview and exported code
- [x] group preview layout updates preview and exported code

### Visual styling
- [x] colors update preview and exported code
- [x] border width and style update preview and exported code
- [x] border radius updates preview and exported code
- [x] shadow updates preview and exported code
- [x] text shadow updates preview and exported code
- [x] typography updates preview and exported code
- [x] top gradient updates preview and exported code
- [x] backdrop blur updates preview and exported code

### Icons and loading
- [x] base icon updates preview and exported code
- [x] hover icon updates preview and exported code
- [x] active icon updates preview and exported code
- [x] loading icon updates preview and exported code
- [x] spinner mode and spinner position update preview and exported code

### Interaction states
- [x] hover state visuals update preview and exported code
- [x] active state visuals update preview and exported code
- [x] focus ring updates preview and exported code
- [x] disabled state visuals update preview and exported code
- [x] accessibility values update preview and exported code

### Motion effects
- [x] no load-only animation preset is exported
- [x] breathe animation updates preview and exported code
- [x] soft drift animation updates preview and exported code
- [x] soft glow animation updates preview and exported code
- [x] sheen sweep animation updates preview and exported code
- [x] aurora drift animation updates preview and exported code
- [x] neon pulse animation updates preview and exported code
- [x] cyber glitch animation updates preview and exported code
- [x] wave text motion updates preview and exported code
- [x] bounce text motion updates preview and exported code
- [x] flicker text motion updates preview and exported code
- [x] shimmer text motion updates preview and exported code
- [x] glitch text motion updates preview and exported code
- [x] rock 3D shell motion updates preview and exported code
- [x] orbit 3D shell motion updates preview and exported code
- [x] gyro 3D shell motion updates preview and exported code
- [x] tilt-cycle 3D shell motion updates preview and exported code
- [x] motion duration, speed, intensity, easing, and text stagger update preview and exported code
- [x] magnetic hover effect updates preview and exported code
- [x] spotlight hover effect updates preview and exported code
- [x] tilt hover effect updates preview and exported code
- [x] morph hover effect updates preview and exported code
- [x] sparkles hover effect updates preview and exported code
- [x] ripple click effect updates preview and exported code
- [x] confetti click effect updates preview and exported code
- [x] explosion click effect updates preview and exported code

## Residual notes

- `npm run lint` is non-blocking but still reports a large warning backlog in legacy editor/theme files.
- Undo/redo history is still debounce-based, so export parity is aligned with the current state but very fast toggle-flip-toggle sequences may not remain separate history steps.
- Do not create the final marketplace zip until the owner confirms release readiness.
