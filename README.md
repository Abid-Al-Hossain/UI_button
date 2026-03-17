# UI Foundry Button Component Generator

Standalone button component generator built with Next.js.

This product is meant to be sold as an individual UI generator before the larger UI Foundry SaaS platform is finalized. The goal of this standalone package is simple: let a buyer design a button visually, preview it immediately, and export matching React or HTML code without manually rebuilding the component by hand.

## What this product is

This is not a small button library with a few presets.

This is a full visual button builder with:

- a sectioned editor
- live button preview
- state preview controls
- code export
- file download export
- React/JSX output
- HTML output
- motion controls
- hover and click effects
- icon-state switching
- accessibility controls
- grouped preview support

The current standalone product is focused on one component category only: buttons. It goes deeper on button behavior and styling than a normal demo page or static component gallery.

## What buyers can do with it

A buyer can use this generator to:

- create marketing buttons
- create dashboard buttons
- create hero CTA buttons
- create loading buttons
- create icon buttons
- create ghost and outline buttons
- create animated CTA buttons
- generate quick prototype buttons for client work
- inspect how design changes affect exported code
- export the final component as React or HTML

## Core product flow

The intended workflow is:

1. edit the button through the left-side control sections
2. inspect the preview on the right
3. switch to the code tab if needed
4. copy or export the generated code
5. use the exported component in another project

The product is designed so the preview, copied code, and downloaded code stay behaviorally aligned for the supported button feature set.

## Full feature overview

### 1. Basics

The Basics section controls the main button identity:

- button label
- solid, outline, and ghost variants
- disabled toggle
- loading toggle

This lets a user establish the main component state before moving into styling or effects.

### 2. Motion

The Motion section is the dedicated animation control panel. It does not include load-only entrance animation. Motion is intentionally configurable rather than fixed.

Global motion controls:

- duration
- speed
- intensity
- easing
- text stagger

Button motion presets:

- `none`
- `breathe`
- `soft-drift`
- `soft-glow`
- `sheen`
- `aurora`
- `neon-pulse`
- `cyber-glitch`

Text motion presets:

- `none`
- `wave`
- `bounce`
- `flicker`
- `shimmer`
- `glitch`

3D shell motion presets:

- `none`
- `rock`
- `orbit`
- `gyro`
- `tilt-cycle`

This means buyers are not limited to a fixed animation look. They can tune the feel of the motion system directly from the editor.

### 3. Sizing

The Sizing section covers layout dimensions:

- width
- height
- horizontal padding
- vertical padding

This makes the generator usable for compact interface buttons, larger CTA buttons, or wide action buttons.

### 4. Colors

The Colors section supports:

- solid background color
- gradient background mode
- start and end gradient colors
- optional gradient midpoint
- text color

This allows both simple flat buttons and more designed CTA-style surfaces.

### 5. Outline / Ghost presets

The generator includes outline and ghost preset application logic so buyers can quickly switch to a different button style direction without manually rebuilding every color field.

### 6. Border

The Border section includes:

- border width
- border style
- border color
- separate hover border width
- separate active border width

This makes it possible to create quiet flat borders or stronger interactive border transitions.

### 7. Radius

The Radius section supports:

- linked corner radius
- independent top-left radius
- independent top-right radius
- independent bottom-right radius
- independent bottom-left radius

This means users can build standard rounded buttons or more custom asymmetrical shapes.

### 8. Shadow

The Shadow section is not limited to a single box-shadow text field. It gives buyers structured control over shadow behavior and related depth styling.

Shadow and depth-related controls include:

- main shadow offsets
- blur
- spread
- opacity
- shadow temperature
- elevation preset
- shadow stack layers
- inner shadow toggle
- gloss toggle
- bevel controls
- material preset
- edge / depth appearance controls
- rim light controls
- pressed depth behavior

This gives the product enough range for flat UI, lifted interface buttons, and more polished presentation buttons.

### 9. Typography

Typography controls include:

- system font selection
- Google font support
- font size
- unit selection
- font weight
- letter spacing
- line height
- italic / normal style
- text transform
- underline toggle

This makes the generator useful not just for shape and color, but for real brand presentation.

### 10. Effects (New)

The Effects section contains richer interaction and motion-adjacent controls.

Supported hover effects:

- `none`
- `magnetic`
- `spotlight`
- `tilt`
- `morph`
- `sparkles`

Supported click effects:

- `none`
- `ripple`
- `confetti`
- `explosion`

Additional interaction tuning includes:

- click particle count
- hover spring stiffness
- hover spring damping

This is the section that gives the generator more premium motion personality than a typical static button builder.

### 11. Text Position

The Text Position section controls alignment inside the button.

Supported alignment logic covers combinations like:

- top-left
- top-center
- top-right
- middle-left
- middle-center
- middle-right
- bottom-left
- bottom-center
- bottom-right

This is important for more unusual button compositions or icon-heavy layouts.

### 12. Text Shadow

Text shadow controls include:

- enable / disable
- x offset
- y offset
- blur
- opacity
- color mode
- custom shadow color

This allows subtle legibility enhancement or more stylized branded typography.

### 13. Icon system

The button generator supports icon-state variation, not just one icon slot.

Supported icon features:

- base icon
- hover icon
- active icon
- loading icon
- icon source from library
- custom SVG input
- left or right icon position
- icon size
- icon gap
- icon color mode
- custom icon color

This is important because many button generators fail to support icon changes across states. This one does.

### 14. Group Preview

The Group Preview section lets users preview the same button in a grouped layout.

Group controls include:

- group enabled toggle
- group alignment
- group gap

This is useful when buyers want to see how a button style behaves alongside sibling actions.

### 15. Loading

The Loading section includes:

- loading label
- spinner mode
- spinner position
- custom spinner SVG

Loading state is treated as a real component state rather than a cosmetic afterthought.

### 16. Disabled

The Disabled section includes:

- disabled opacity
- disabled cursor
- custom disabled colors
- disabled background
- disabled text color
- disabled border color
- disabled border width
- disabled hover suppression
- disabled text shadow behavior

This matters because disabled buttons often break parity between preview and exported code. The standalone generator explicitly handles this state.

### 17. Hover

The Hover section controls visual hover styling, separate from the hover effect section.

Supported hover style controls include:

- hover enabled toggle
- hover background mode
- hover solid color
- hover gradient mode
- hover gradient angle
- hover gradient start
- optional hover gradient midpoint
- hover gradient end
- hover text color mode
- hover custom text color
- hover border color mode
- hover custom border color
- color transition duration
- color transition easing

### 18. Active

The Active section controls press-state styling:

- active enabled toggle
- active translate Y
- active scale
- active background mode
- active solid color
- active gradient mode
- active gradient angle
- active gradient start
- optional active gradient midpoint
- active gradient end
- active text color mode
- active custom text color
- active border color mode
- active custom border color
- transform transition duration
- transform transition easing

### 19. Focus Ring

The Focus Ring section includes:

- focus ring enabled toggle
- focus ring width
- focus ring offset
- focus ring color

This is important both visually and for keyboard accessibility review.

### 20. State Preview

The State Preview section allows users to force:

- hover
- active
- focus

This is extremely useful because it lets a buyer inspect transient states without manually triggering them every time.

### 21. Accessibility

Accessibility controls include:

- aria-label
- aria-pressed mode
- aria-busy mode
- minimum touch target mode
- minimum touch size guidance
- contrast feedback

This makes the generator more than just a visual toy. It acknowledges production-facing accessibility concerns.

## Preview and output behavior

### Live preview

The preview is designed to reflect current editor state as closely as possible.

That includes:

- core button styling
- label changes
- icon changes
- loading state
- disabled state
- hover styling
- active styling
- focus ring
- group preview mode
- button motion
- text motion
- 3D shell motion
- hover effects
- click effects

### Export formats

Supported export formats:

- React / JSX
- HTML

### Export behavior

The exported output includes:

- sizing
- padding
- typography
- border styles
- radii
- shadows
- gradients
- icon states
- spinner behavior
- loading label
- hover styling
- active styling
- focus ring behavior
- accessibility attributes
- motion settings
- hover effects
- click effects
- grouped output support

The exported button does not rely on hidden preview-only logic for the supported feature set.

### Export parity notes

The standalone generator currently uses the same motion model in:

- live preview
- copied code
- downloaded React output
- downloaded HTML output

Reduced-motion handling is also respected in preview and export.

## Reliability and QA status

The project includes repeatable verification scripts.

Current status:

- `npm run typecheck` passes
- `npm run build` passes
- `npm run qa:features` passes with `37/37` checks
- `npm run qa` passes end-to-end

The QA script verifies both React and HTML export output and checks feature coverage across:

- labels
- disabled state
- motion presets
- motion controls
- text motion
- depth motion
- layout
- group preview
- styling
- icon states
- spinner behavior
- hover behavior
- active behavior
- focus and accessibility
- hover effects
- click effects

The detailed checklist lives in [docs/QA_CHECKLIST.md](./docs/QA_CHECKLIST.md).

## Installation

Requirements:

- Node.js 20 or newer
- npm 10 or newer recommended

Install and run locally:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run qa:features
npm run qa
```

What they do:

- `npm run dev`: starts the local development server
- `npm run build`: creates a production build
- `npm run start`: runs the production build
- `npm run lint`: runs ESLint
- `npm run typecheck`: runs TypeScript checking without emitting files
- `npm run qa:features`: runs automated export feature assertions
- `npm run qa`: runs lint, typecheck, build, and export QA together

## Project structure

- `app/page.tsx`: main generator page and state wiring
- `app/types.ts`: full editor state model
- `app/_section/*`: editor sections and live preview implementation
- `app/_utils/exportUtils.ts`: React and HTML export generation
- `app/_utils/previewDoc.ts`: iframe preview document logic
- `scripts/qa-feature-checks.mjs`: automated export verification
- `docs/QA_CHECKLIST.md`: recorded QA checklist
- `CHANGELOG.md`: release notes
- `components/*`: shared editor, layout, and theme utilities

## Marketplace positioning

This standalone package is intended to be marketable as:

- a button generator
- a UI builder for designers and developers
- a quick export tool for prototypes and client work
- a premium standalone component generator ahead of the wider SaaS platform

It is especially useful for buyers who want to:

- explore button styles quickly
- export code without rebuilding from scratch
- test animated button directions
- compare states visually
- hand off a button spec with runnable code

## Known boundaries

- The 3D icon engine exists in the codebase but is intentionally not the main active editor surface for this standalone release.
- Undo / redo is debounce-based, so extremely fast toggle-flip-toggle sequences may collapse into one history step.
- Lint passes but still reports a warning backlog in older editor and theme files.
- This repository should stay private while the product is being finalized for sale.

## Packaging notes

- Do not include `node_modules` in a marketplace delivery archive.
- Do not include `.next` in a marketplace delivery archive.
- Do not include local build artifacts such as `*.tsbuildinfo`.
- Create the final delivery zip only after manual release sign-off.

## Related docs

- QA checklist: [docs/QA_CHECKLIST.md](./docs/QA_CHECKLIST.md)
- Release notes: [CHANGELOG.md](./CHANGELOG.md)
