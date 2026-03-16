# Changelog

## Unreleased

- removed all load-only button animation presets from the standalone editor and exporter
- added a dedicated `Motion` section with controllable:
  - duration
  - speed
  - intensity
  - easing
  - text stagger
- expanded button motion presets to:
  - `breathe`
  - `soft-drift`
  - `soft-glow`
  - `sheen`
  - `aurora`
  - `neon-pulse`
  - `cyber-glitch`
- added label motion presets:
  - `wave`
  - `bounce`
  - `flicker`
  - `shimmer`
  - `glitch`
- added 3D shell motion presets:
  - `rock`
  - `orbit`
  - `gyro`
  - `tilt-cycle`
- aligned live preview, exported React, and exported HTML around the same data-attribute-driven motion model
- expanded automated export verification to `37/37` passing feature checks

## 1.0.0

- cleaned up package metadata for standalone delivery
- added `.gitignore`
- added ESLint flat config for ESLint 9 compatibility
- added README and QA documentation
- added automated export verification via `scripts/qa-feature-checks.mjs`
- improved preview/export parity for button animations and interaction effects
- improved live preview handling for hover and click effect modes
- rebuilt standalone export logic around a normalized export model
- fixed export alignment for compound positions like `top-right`
- removed the old `subtle-pop` animation preset from the editor surface
- replaced the old button animation set with calmer presets:
  - `gentle-rise`
  - `breathe`
  - `soft-drift`
  - `soft-glow`
  - `sheen`
  - `aurora`
- added reduced-motion handling for the new ambient button animations
- verified React and HTML export coverage across `25` feature checks
