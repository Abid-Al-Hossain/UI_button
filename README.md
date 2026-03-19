# UI Foundry Button Component Generator

Standalone visual button generator built with Next.js.

This project is a sellable single-component product focused entirely on buttons. Instead of shipping a small fixed button library, it gives the buyer a visual editor for building button styles, previewing states and motion, browsing a large preset catalog, and exporting production-friendly React / JSX code.

## Product summary

This generator is designed for:

- designers who want to explore button directions quickly
- developers who want editable starting points instead of rebuilding button logic from scratch
- freelancers and agencies who need fast button prototyping for client work
- sellers who want a polished standalone UI tool before a larger component SaaS is launched

The workflow is simple:

1. choose a preset or start from the current button state
2. edit the button through sectioned controls
3. inspect the preview in real time
4. switch to the code view
5. copy or export the final React / JSX component

## What the product includes

The app includes:

- a section-based editing panel
- a live preview panel
- code view with copy support
- file export support
- a searchable preset library
- state preview controls
- motion controls
- hover and click effects
- icon overrides by state
- accessibility controls
- grouped button preview support

This is a deep button generator, not just a demo page with a few color pickers.

## Preset system

The Presets section includes `432` editable presets.

These presets are generated from combinations of:

- `12` color families
- `6` moods
- `3` variants
- `2` size profiles

Presets are not locked templates. Applying one loads a full editable button state, and the user can continue changing any setting from any section afterward.

The preset browser supports:

- search by name, family, mood, and tag
- family filtering
- mood filtering
- variant filtering
- size filtering
- paginated browsing
- one-click apply

This makes the product useful both for quick inspiration and for serious customization.

## Full feature coverage

### Basics

The Basics section controls the main identity of the button:

- label
- solid, outline, and ghost variants
- disabled state
- loading state

### Motion

The Motion section gives separate control over three motion layers:

- button surface motion
- text motion
- 3D shell motion

Global motion controls include:

- duration
- speed
- intensity
- easing
- text stagger

Button animation presets:

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

3D button motion presets:

- `none`
- `rock`
- `orbit`
- `gyro`
- `tilt-cycle`

This makes the generator useful for calm UI buttons, glossy premium buttons, animated marketing buttons, and more expressive CTA styles.

### Sizing

Sizing controls include:

- width
- height
- horizontal padding
- vertical padding

These controls allow compact interface buttons, medium action buttons, or larger hero CTA buttons.

### Colors

Color controls include:

- solid background
- gradient mode
- gradient start
- optional midpoint
- gradient end
- text color

### Outline / Ghost styling

The product supports solid, outline, and ghost directions as real editable states, not fake visual presets only. That means users can move between style directions while keeping access to the full editor.

### Border

Border controls include:

- border width
- border style
- border color
- hover border width
- active border width

### Radius

Radius controls include:

- linked corner radius
- top-left radius
- top-right radius
- bottom-right radius
- bottom-left radius

This supports standard rounded buttons and asymmetrical custom shapes.

### Shadow and depth styling

The shadow system goes beyond one generic box-shadow field. It supports richer depth presentation, including:

- main shadow offsets
- blur
- spread
- opacity
- shadow temperature
- elevation presets
- layered stack depth
- inner shadow
- gloss
- bevel treatment
- material-style depth behavior
- rim light
- pressed depth behavior

This allows both flatter utility buttons and more polished premium-looking buttons.

### Typography

Typography controls include:

- system fonts
- Google fonts
- font size
- size unit
- font weight
- letter spacing
- line height
- italic / normal style
- text transform
- underline

Typography is a core part of the product, not an afterthought.

### Effects

The Effects section handles richer interaction styles.

Hover effects:

- `none`
- `magnetic`
- `spotlight`
- `tilt`
- `morph`
- `sparkles`

Click effects:

- `none`
- `ripple`
- `confetti`
- `explosion`

Additional controls include:

- click particle count
- hover spring stiffness
- hover spring damping

### Text position

The Text Position section controls placement inside the button, including:

- top-left
- top-center
- top-right
- middle-left
- middle-center
- middle-right
- bottom-left
- bottom-center
- bottom-right

### Text shadow

Text shadow controls include:

- enable / disable
- x offset
- y offset
- blur
- opacity
- color mode
- custom shadow color

### Icon system

The icon system supports state-aware icons instead of a single static slot.

Supported icon features:

- base icon
- hover icon
- active icon
- loading icon
- library icons
- custom SVG input
- left / right placement
- icon size
- icon gap
- icon color mode
- custom icon color

This is one of the stronger parts of the generator because many visual editors fail to support icon changes across states.

### Group preview

The Group Preview section lets the user preview the button in a grouped action layout.

Group controls include:

- group enabled
- group alignment
- group gap

### Loading

Loading controls include:

- loading label
- spinner mode
- spinner position
- custom spinner SVG

### Disabled

Disabled controls include:

- disabled opacity
- disabled cursor
- disabled background
- disabled text color
- disabled border color
- disabled border width
- disabled text shadow behavior

### Hover styling

Separate from hover effects, the Hover section controls the visual hover state:

- hover enabled
- hover background mode
- hover solid color
- hover gradient mode
- hover gradient angle
- hover gradient start
- optional hover midpoint
- hover gradient end
- hover text color mode
- hover custom text color
- hover border color mode
- hover custom border color
- color transition duration
- color transition easing

### Active styling

The Active section controls the pressed state:

- active enabled
- translate Y
- scale
- active background mode
- active solid color
- active gradient mode
- active gradient angle
- active gradient start
- optional active midpoint
- active gradient end
- active text color mode
- active custom text color
- active border color mode
- active custom border color
- transform transition duration
- transform transition easing

### Focus ring

Focus ring controls include:

- enabled
- width
- offset
- color

### State preview

The State Preview section can force:

- hover
- active
- focus

This is important because transient states can be inspected without manually retriggering them over and over.

### Accessibility

Accessibility controls include:

- aria-label
- aria-pressed mode
- aria-busy mode
- minimum touch target handling
- contrast guidance

## Preview and export

### Live preview

The preview reflects the current editor state, including:

- styling
- label changes
- icon changes
- disabled state
- loading state
- hover styling
- active styling
- focus ring
- state preview forcing
- group preview
- motion
- hover effects
- click effects

### Code output

The current packaged product exposes:

- React / JSX output

Users can:

- inspect code in the code tab
- copy the generated code
- export the component as a file

The project still contains export generation logic with broader internal support, but the actual standalone package UI is currently centered on React / JSX delivery.

## What makes this project strong for buyers

This project is valuable because it combines:

- a very large preset catalog
- deep button-state editing
- motion and interaction styling
- icon-state behavior
- real accessibility-related controls
- exportable component code

That makes it suitable as:

- a premium standalone UI generator
- a prototyping tool
- a client-work accelerator
- a niche design-to-code utility

## Installation and local development

Requirements:

- Node.js 20 or newer
- npm 10 or newer recommended

Install:

```bash
npm install
```

Run in development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run the production build:

```bash
npm run start
```

Available scripts:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`

## Project structure

- `app/page.tsx`: main editor page, state wiring, export wiring
- `app/types.ts`: main button state model
- `app/_section/*`: section UI and live preview logic
- `app/_utils/exportUtils.ts`: export generation
- `app/_utils/previewDoc.ts`: iframe preview logic
- `components/*`: shared controls, layout, export UI, theme helpers
- `CHANGELOG.md`: release notes

## Known boundaries

- The standalone package is focused on buttons only.
- The 3D icon engine exists in the codebase but is not the primary active surface for this release.
- Undo / redo is debounce-based, so extremely fast flip-flop changes may compress into fewer history steps.
- Lint still reports a warning backlog in older editor and theme files.
- This source should remain private while the product is being finalized for sale.

## Packaging notes

For buyer delivery:

- do not include `node_modules`
- do not include `.next`
- do not include local build artifacts such as `*.tsbuildinfo`
- keep the source package private until distribution terms are finalized

## Release notes

- [CHANGELOG.md](./CHANGELOG.md)
