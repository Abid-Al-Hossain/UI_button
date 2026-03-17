import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

import * as ts from "typescript";

const ROOT_DIR = path.resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);

const originalTs = require.extensions[".ts"];
const originalTsx = require.extensions[".tsx"];

function transpileAndCompile(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;

  module._compile(transpiled, filename);
}

require.extensions[".ts"] = transpileAndCompile;
require.extensions[".tsx"] = transpileAndCompile;

let BUTTON_PRESETS;
let BUTTON_PRESET_COUNT;
let resolveIconSvg;
let buildPresetPreviewModel;

try {
  ({ BUTTON_PRESETS, BUTTON_PRESET_COUNT } = require(path.join(ROOT_DIR, "app", "_data", "buttonPresets.ts")));
  ({ resolveIconSvg } = require(path.join(ROOT_DIR, "app", "_utils", "iconMarkup.ts")));
  ({ buildPresetPreviewModel } = require(path.join(ROOT_DIR, "app", "_utils", "presetPreviewModel.ts")));
} finally {
  require.extensions[".ts"] = originalTs;
  require.extensions[".tsx"] = originalTsx;
}

const failures = [];

function fail(message) {
  failures.push(message);
}

function expect(condition, message) {
  if (!condition) fail(message);
}

function buildGradient(angleText, start, midEnabled, mid, end) {
  const angle = Number(angleText);
  const safeAngle = Number.isFinite(angle) ? angle : 90;
  return midEnabled
    ? `linear-gradient(${safeAngle}deg, ${start}, ${mid}, ${end})`
    : `linear-gradient(${safeAngle}deg, ${start}, ${end})`;
}

function hexToRgb(hex) {
  const raw = String(hex || "").trim().toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(raw)) return null;
  return {
    r: parseInt(raw.slice(1, 3), 16) / 255,
    g: parseInt(raw.slice(3, 5), 16) / 255,
    b: parseInt(raw.slice(5, 7), 16) / 255,
  };
}

function relativeLuminance(rgb) {
  const transform = (value) =>
    value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  const r = transform(rgb.r);
  const g = transform(rgb.g);
  const b = transform(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a, b) {
  const rgbA = hexToRgb(a);
  const rgbB = hexToRgb(b);
  if (!rgbA || !rgbB) return null;
  const l1 = relativeLuminance(rgbA);
  const l2 = relativeLuminance(rgbB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function previewBackgroundForPreset(preset) {
  if (preset.state.variant === "solid") {
    return buildGradient(
      preset.state.gradAngleText,
      preset.state.gradStartInput,
      preset.state.gradMidEnabled,
      preset.state.gradMidInput,
      preset.state.gradEndInput,
    );
  }

  return "transparent";
}

function contrastTargetForPreset(preset) {
  if (preset.state.variant === "solid") {
    return preset.state.gradMidEnabled
      ? preset.state.gradMidInput
      : preset.state.gradStartInput;
  }

  return preset.preview.canvas;
}

expect(BUTTON_PRESET_COUNT === BUTTON_PRESETS.length, "BUTTON_PRESET_COUNT does not match preset array length.");
expect(BUTTON_PRESET_COUNT === 432, `Expected 432 presets, found ${BUTTON_PRESET_COUNT}.`);

const ids = new Set();
const validIcons = new Set(["none", "arrowRight", "check", "plus", "info", "star", "x"]);

for (const preset of BUTTON_PRESETS) {
  expect(Boolean(preset.id), "Found preset with empty id.");
  expect(Boolean(preset.name), `Preset ${preset.id} is missing a name.`);
  expect(Boolean(preset.summary), `Preset ${preset.id} is missing a summary.`);
  expect(!ids.has(preset.id), `Duplicate preset id found: ${preset.id}`);
  ids.add(preset.id);

  expect(preset.state.variant === preset.variant, `Preset ${preset.id} variant metadata does not match state.`);
  expect(preset.preview.canvas === preset.state.previewBgInput, `Preset ${preset.id} preview canvas does not match state.previewBgInput.`);
  expect(preset.state.previewBgMode === "custom", `Preset ${preset.id} previewBgMode should be custom.`);
  expect(!preset.state.disabled, `Preset ${preset.id} should not ship disabled.`);
  expect(!preset.state.loading, `Preset ${preset.id} should not ship loading.`);
  expect(!preset.state.forceHover && !preset.state.forceActive && !preset.state.forceFocus, `Preset ${preset.id} should not ship forced preview states.`);
  expect(preset.state.use3DIcon === "none", `Preset ${preset.id} unexpectedly enables 3D icon mode.`);
  expect(preset.state.iconCustomSvg === "", `Preset ${preset.id} should not carry a custom base icon SVG.`);
  expect(preset.state.hoverIconCustomSvg === "", `Preset ${preset.id} should not carry a custom hover icon SVG.`);
  expect(preset.state.activeIconCustomSvg === "", `Preset ${preset.id} should not carry a custom active icon SVG.`);
  expect(preset.state.loadingIconCustomSvg === "", `Preset ${preset.id} should not carry a custom loading icon SVG.`);
  expect(preset.state.fontBucket === "google", `Preset ${preset.id} should use a google font bucket.`);
  expect(Boolean(preset.state.googleFontFamily), `Preset ${preset.id} is missing googleFontFamily.`);

  expect(preset.tags.includes(preset.family.toLowerCase()), `Preset ${preset.id} tags are missing family token.`);
  expect(preset.tags.includes(preset.mood.toLowerCase()), `Preset ${preset.id} tags are missing mood token.`);
  expect(preset.tags.includes(preset.variant), `Preset ${preset.id} tags are missing variant token.`);
  expect(preset.tags.includes(preset.state.animation), `Preset ${preset.id} tags are missing animation token.`);
  expect(preset.tags.includes(preset.state.textAnimation), `Preset ${preset.id} tags are missing text animation token.`);
  expect(preset.tags.includes(preset.state.depthAnimation), `Preset ${preset.id} tags are missing depth animation token.`);

  expect(preset.preview.background === previewBackgroundForPreset(preset), `Preset ${preset.id} preview background does not match the actual base button background.`);
  const previewModel = buildPresetPreviewModel(preset.state);
  expect(previewModel.background === previewBackgroundForPreset(preset), `Preset ${preset.id} preview model background drifted from the preset base background.`);
  expect(previewModel.color === preset.state.textInput, `Preset ${preset.id} preview model text color drifted from the preset state.`);

  if (preset.variant === "ghost") {
    expect(preset.preview.border === "transparent", `Ghost preset ${preset.id} should preview with transparent border.`);
  } else {
    expect(preset.preview.border === preset.state.borderInput, `Preset ${preset.id} preview border does not match state border.`);
  }

  if (preset.state.iconName !== "none") {
    expect(validIcons.has(preset.state.iconName), `Preset ${preset.id} uses unknown base icon ${preset.state.iconName}.`);
    const baseIconSvg = resolveIconSvg(
      preset.state.iconSource,
      preset.state.iconName,
      preset.state.iconCustomSvg,
    );
    expect(Boolean(baseIconSvg && baseIconSvg.includes("<svg")), `Preset ${preset.id} base icon does not resolve through the shared icon pipeline.`);
  }
  if (preset.state.hoverIconEnabled) {
    expect(preset.state.hoverIconName !== "none", `Preset ${preset.id} enables hover icon with name 'none'.`);
    expect(validIcons.has(preset.state.hoverIconName), `Preset ${preset.id} uses unknown hover icon ${preset.state.hoverIconName}.`);
  }
  if (preset.state.activeIconEnabled) {
    expect(preset.state.activeIconName !== "none", `Preset ${preset.id} enables active icon with name 'none'.`);
    expect(validIcons.has(preset.state.activeIconName), `Preset ${preset.id} uses unknown active icon ${preset.state.activeIconName}.`);
  }

  const contrast = contrastRatio(preset.state.textInput, contrastTargetForPreset(preset));
  expect(
    contrast == null || contrast >= 3,
    `Preset ${preset.id} has low text contrast (${contrast?.toFixed(2) ?? "n/a"}).`,
  );
}

const slateLuxeOutlineHero = BUTTON_PRESETS.find((preset) => preset.id === "slate-luxe-outline-hero");
expect(Boolean(slateLuxeOutlineHero), "Representative preset slate-luxe-outline-hero is missing.");

if (slateLuxeOutlineHero) {
  const previewModel = buildPresetPreviewModel(slateLuxeOutlineHero.state);
  const baseIconSvg = resolveIconSvg(
    slateLuxeOutlineHero.state.iconSource,
    slateLuxeOutlineHero.state.iconName,
    slateLuxeOutlineHero.state.iconCustomSvg,
  );
  expect(previewModel.background === "transparent", "Slate Luxe Outline Hero should preview with a transparent base background.");
  expect(previewModel.color === slateLuxeOutlineHero.state.textInput, "Slate Luxe Outline Hero preview model text color drifted from the preset state.");
  expect(Boolean(baseIconSvg && baseIconSvg.includes("<svg")), "Slate Luxe Outline Hero base icon does not resolve through the shared icon pipeline.");
}

if (failures.length) {
  console.error(`Preset QA failed with ${failures.length} issue(s):`);
  failures.forEach((message, index) => {
    console.error(`${index + 1}. ${message}`);
  });
  process.exit(1);
}

console.log(`Preset QA passed: ${BUTTON_PRESET_COUNT} presets validated with no catalog inconsistencies.`);
