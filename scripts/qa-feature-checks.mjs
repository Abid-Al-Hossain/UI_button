import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";

import * as ts from "typescript";

const ROOT_DIR = path.resolve(import.meta.dirname, "..");
const EXPORT_UTILS_PATH = path.join(ROOT_DIR, "app", "_utils", "exportUtils.ts");

async function loadExporter() {
  const source = await fs.readFile(EXPORT_UTILS_PATH, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: EXPORT_UTILS_PATH,
  }).outputText;

  const cjsModule = { exports: {} };
  const context = {
    module: cjsModule,
    exports: cjsModule.exports,
    require: createRequire(import.meta.url),
    __dirname: path.dirname(EXPORT_UTILS_PATH),
    __filename: EXPORT_UTILS_PATH,
    console,
    process,
    setTimeout,
    clearTimeout,
    URL,
    Blob,
    window: undefined,
    document: undefined,
  };

  vm.runInNewContext(transpiled, context, { filename: EXPORT_UTILS_PATH });
  return cjsModule.exports;
}

function assertIncludes(content, expected) {
  return expected.every((token) => content.includes(token));
}

function assertExcludes(content, excluded = []) {
  return excluded.every((token) => !content.includes(token));
}

function buildPayload(overrides = {}) {
  return {
    componentName: "qa-action-button",
    label: "Confirm",
    loadingLabel: "Loading...",
    cssBg: "#111827",
    textInput: "#ffffff",
    borderInput: "rgba(0,0,0,0.06)",
    borderWidthPx: 1,
    borderStyle: "solid",
    touchWidth: "220px",
    touchHeight: "44px",
    padX: "14px",
    padY: "0px",
    fontFamily: "Arial, system-ui",
    fontSizeValue: 14,
    fontSizeUnit: "px",
    fontWeight: 700,
    letterSpacingValue: 0.2,
    letterSpacingUnit: "px",
    lHeight: 1,
    align: "middle-center",
    rTL: "14px",
    rTR: "14px",
    rBR: "14px",
    rBL: "14px",
    previewBgHex: "#ffffff",
    ariaLabel: "Confirm",
    ariaPressedMode: "off",
    ariaBusyMode: "auto",
    ...overrides,
  };
}

function runCase(exporter, definition) {
  const reactContent = exporter.buildExportPayload({
    downloadFormat: "react",
    ...buildPayload(definition.payload),
  }).content;
  const htmlContent = exporter.buildExportPayload({
    downloadFormat: "html",
    ...buildPayload(definition.payload),
  }).content;

  return {
    name: definition.name,
    reactPass:
      assertIncludes(reactContent, definition.react) &&
      assertExcludes(reactContent, definition.reactNot),
    htmlPass:
      assertIncludes(htmlContent, definition.html) &&
      assertExcludes(htmlContent, definition.htmlNot),
    reactContent,
    htmlContent,
  };
}

const CASES = [
  {
    name: "label and loading labels are exported",
    payload: { label: "Ship now", loadingLabel: "Submitting...", loading: true },
    react: ['"label":"Ship now"', '"loadingLabel":"Submitting..."'],
    html: ['"label":"Ship now"', '"loadingLabel":"Submitting..."'],
  },
  {
    name: "disabled state exports disabled visuals and behavior",
    payload: {
      disabled: true,
      cssDisabledBg: "#d1d5db",
      cssDisabledText: "#111827",
      cssDisabledBorder: "#9ca3af",
      disabledOpacity: 0.45,
      disabledCursor: "not-allowed",
    },
    react: ['"disabled":true', '"disabledOpacity":0.45', '"disabledCursor":"not-allowed"'],
    html: ['"disabled":true', '"disabledOpacity":0.45', '"disabledCursor":"not-allowed"'],
  },
  {
    name: "legacy subtle-pop alias is removed instead of exporting a load animation",
    payload: { animation: "subtle-pop" },
    react: ['"animation":"none"'],
    html: ['"animation":"none"'],
    reactNot: ["gentle-rise", "uif-gentle-rise"],
    htmlNot: ["gentle-rise", "uif-gentle-rise"],
  },
  {
    name: "breathe exports as gentle loop animation",
    payload: { animation: "breathe" },
    react: ['"animation":"breathe"', "data-animation={resolvedAnimation}", "uif-motion[data-animation='breathe']", "uif-breathe"],
    html: ['"animation":"breathe"', 'setAttribute("data-animation", resolvedAnimation)', "uif-motion[data-animation='breathe']", "uif-breathe"],
  },
  {
    name: "soft drift exports as calm vertical loop animation",
    payload: { animation: "soft-drift" },
    react: ['"animation":"soft-drift"', "data-animation={resolvedAnimation}", "uif-motion[data-animation='soft-drift']", "uif-soft-drift"],
    html: ['"animation":"soft-drift"', 'setAttribute("data-animation", resolvedAnimation)', "uif-motion[data-animation='soft-drift']", "uif-soft-drift"],
  },
  {
    name: "soft glow exports ambient halo animation",
    payload: { animation: "soft-glow" },
    react: ['"animation":"soft-glow"', "uif-ambient-glow", ".uif-btn[data-animation='soft-glow'] .uif-ambient-glow", "uif-soft-glow"],
    html: ['"animation":"soft-glow"', "uif-ambient-glow", ".uif-btn[data-animation='soft-glow'] .uif-ambient-glow", "uif-soft-glow"],
  },
  {
    name: "neon pulse exports a stronger glow loop",
    payload: { animation: "neon-pulse" },
    react: ['"animation":"neon-pulse"', ".uif-btn[data-animation='neon-pulse'] .uif-ambient-glow", "uif-neon-pulse"],
    html: ['"animation":"neon-pulse"', ".uif-btn[data-animation='neon-pulse'] .uif-ambient-glow", "uif-neon-pulse"],
  },
  {
    name: "sheen exports ambient sweep animation",
    payload: { animation: "sheen" },
    react: ['"animation":"sheen"', "uif-ambient-sheen", ".uif-btn[data-animation='sheen'] .uif-ambient-sheen", "uif-sheen"],
    html: ['"animation":"sheen"', "uif-ambient-sheen", ".uif-btn[data-animation='sheen'] .uif-ambient-sheen", "uif-sheen"],
  },
  {
    name: "aurora exports ambient gradient drift animation",
    payload: { animation: "aurora" },
    react: ['"animation":"aurora"', "uif-ambient-aurora", ".uif-btn[data-animation='aurora'] .uif-ambient-aurora", "uif-aurora"],
    html: ['"animation":"aurora"', "uif-ambient-aurora", ".uif-btn[data-animation='aurora'] .uif-ambient-aurora", "uif-aurora"],
  },
  {
    name: "cyber glitch exports stepped cyberpunk motion",
    payload: { animation: "cyber-glitch" },
    react: ['"animation":"cyber-glitch"', ".uif-btn[data-animation='cyber-glitch']", "uif-cyber-glitch"],
    html: ['"animation":"cyber-glitch"', ".uif-btn[data-animation='cyber-glitch']", "uif-cyber-glitch"],
  },
  {
    name: "motion controls export duration speed intensity easing and stagger",
    payload: {
      animation: "breathe",
      textAnimation: "wave",
      depthAnimation: "rock",
      animationDurationText: 3600,
      animationSpeedText: 125,
      animationIntensityText: 42,
      animationEasing: "linear",
      textAnimationStaggerText: 140,
    },
    react: ['"motionDurationMs":3600', '"motionSpeed":125', '"motionIntensity":42', '"motionEasing":"linear"', '"textStaggerMs":140', "CONFIG.textStaggerMs"],
    html: ['"motionDurationMs":3600', '"motionSpeed":125', '"motionIntensity":42', '"motionEasing":"linear"', '"textStaggerMs":140', 'CONFIG.textStaggerMs'],
  },
  {
    name: "wave text motion exports staggered label spans",
    payload: { textAnimation: "wave", textAnimationStaggerText: 110 },
    react: ['"textAnimation":"wave"', 'data-text-animation={resolvedTextAnimation}', "renderLabelContent", "uif-label-char", "uif-text-wave"],
    html: ['"textAnimation":"wave"', 'setAttribute("data-text-animation", animation)', "renderLabelContent", "uif-label-char", "uif-text-wave"],
  },
  {
    name: "bounce text motion exports character bounce animation",
    payload: { textAnimation: "bounce" },
    react: ['"textAnimation":"bounce"', "uif-text-bounce"],
    html: ['"textAnimation":"bounce"', "uif-text-bounce"],
  },
  {
    name: "flicker text motion exports pulsing label brightness",
    payload: { textAnimation: "flicker" },
    react: ['"textAnimation":"flicker"', "uif-text-flicker"],
    html: ['"textAnimation":"flicker"', "uif-text-flicker"],
  },
  {
    name: "shimmer text motion exports gradient text animation without forced character splitting",
    payload: { textAnimation: "shimmer" },
    react: ['"textAnimation":"shimmer"', "uif-text-shimmer", "-webkit-text-fill-color:transparent", "resolvedTextAnimation === \"none\" || resolvedTextAnimation === \"shimmer\""],
    html: ['"textAnimation":"shimmer"', "uif-text-shimmer", "-webkit-text-fill-color:transparent", 'if (animation === "none" || animation === "shimmer")'],
    reactNot: ["background-clip:text;color:transparent;"],
    htmlNot: ["background-clip:text;color:transparent;"],
  },
  {
    name: "glitch text motion exports stepped label jitter",
    payload: { textAnimation: "glitch" },
    react: ['"textAnimation":"glitch"', "uif-text-glitch"],
    html: ['"textAnimation":"glitch"', "uif-text-glitch"],
  },
  {
    name: "rock depth motion exports shell transform loop",
    payload: { depthAnimation: "rock" },
    react: ['"depthAnimation":"rock"', 'data-depth-animation={resolvedDepthAnimation}', "uif-shell[data-depth-animation='rock']", "uif-depth-rock"],
    html: ['"depthAnimation":"rock"', 'setAttribute("data-depth-animation", resolvedDepthAnimation)', "uif-shell[data-depth-animation='rock']", "uif-depth-rock"],
  },
  {
    name: "orbit depth motion exports shell rotation loop",
    payload: { depthAnimation: "orbit" },
    react: ['"depthAnimation":"orbit"', "uif-shell[data-depth-animation='orbit']", "uif-depth-orbit"],
    html: ['"depthAnimation":"orbit"', "uif-shell[data-depth-animation='orbit']", "uif-depth-orbit"],
  },
  {
    name: "gyro depth motion exports 3d orbital shell loop",
    payload: { depthAnimation: "gyro" },
    react: ['"depthAnimation":"gyro"', "uif-shell[data-depth-animation='gyro']", "uif-depth-gyro"],
    html: ['"depthAnimation":"gyro"', "uif-shell[data-depth-animation='gyro']", "uif-depth-gyro"],
  },
  {
    name: "tilt-cycle depth motion exports side-to-side shell motion",
    payload: { depthAnimation: "tilt-cycle" },
    react: ['"depthAnimation":"tilt-cycle"', "uif-shell[data-depth-animation='tilt-cycle']", "uif-depth-tilt-cycle", "rotateY(-2.55deg)", "rotateY(2.55deg)"],
    html: ['"depthAnimation":"tilt-cycle"', "uif-shell[data-depth-animation='tilt-cycle']", "uif-depth-tilt-cycle", "rotateY(-2.55deg)", "rotateY(2.55deg)"],
  },
  {
    name: "sizing and layout export width, height, padding, and alignment",
    payload: {
      touchWidth: "280px",
      touchHeight: "56px",
      padX: "20px",
      padY: "8px",
      align: "top-right",
    },
    react: ['"width":"280px"', '"height":"56px"', '"paddingX":"20px"', '"justifyContent":"flex-end"', '"alignItems":"flex-start"'],
    html: ['"width":"280px"', '"height":"56px"', '"paddingX":"20px"', '"justifyContent":"flex-end"', '"alignItems":"flex-start"'],
  },
  {
    name: "group preview layout exports as grouped button output",
    payload: { groupEnabled: true, groupAlign: "end", groupGap: 18 },
    react: ['"groupEnabled":true', '"groupJustify":"flex-end"', '"groupGap":"18px"', "buttonIndexes = CONFIG.groupEnabled ? [0, 1, 2] : [0]"],
    html: ['"groupEnabled":true', '"groupJustify":"flex-end"', '"groupGap":"18px"', "buttonIndexes = CONFIG.groupEnabled ? [0, 1, 2] : [0]"],
  },
  {
    name: "base styling exports colors, borders, radius, and shadows",
    payload: {
      cssBg: "#0f172a",
      textInput: "#f8fafc",
      borderInput: "#334155",
      borderWidthPx: 2,
      rTL: "12px",
      rTR: "16px",
      rBR: "20px",
      rBL: "24px",
      boxShadowCss: "0px 12px 28px rgba(15,23,42,0.25)",
    },
    react: ['"background":"#0f172a"', '"color":"#f8fafc"', '"borderColor":"#334155"', '"borderWidth":"2px"', '"borderRadius":"12px 16px 20px 24px"', '"boxShadow":"0px 12px 28px rgba(15,23,42,0.25)"'],
    html: ['"background":"#0f172a"', '"color":"#f8fafc"', '"borderColor":"#334155"', '"borderWidth":"2px"', '"borderRadius":"12px 16px 20px 24px"', '"boxShadow":"0px 12px 28px rgba(15,23,42,0.25)"'],
  },
  {
    name: "text styling exports typography and text shadow",
    payload: {
      fontFamily: "Georgia, serif",
      fontSizeValue: 18,
      fontSizeUnit: "px",
      fontWeight: 600,
      fontStyle: "italic",
      textTransform: "uppercase",
      underline: true,
      letterSpacingValue: 0.5,
      letterSpacingUnit: "px",
      lHeight: 1.2,
      textShadowEnabled: true,
      tsX: 1,
      tsY: 2,
      tsBlur: 3,
      tsColor: "rgba(0,0,0,0.4)",
    },
    react: ['"fontFamily":"Georgia, serif"', '"fontSize":"18px"', '"fontWeight":600', '"fontStyle":"italic"', '"textTransform":"uppercase"', '"textDecoration":"underline"', '"letterSpacing":"0.5px"', '"lineHeight":1.2', '1px 2px 3px rgba(0,0,0,0.4)'],
    html: ['"fontFamily":"Georgia, serif"', '"fontSize":"18px"', '"fontWeight":600', '"fontStyle":"italic"', '"textTransform":"uppercase"', '"textDecoration":"underline"', '"letterSpacing":"0.5px"', '"lineHeight":1.2', '1px 2px 3px rgba(0,0,0,0.4)'],
  },
  {
    name: "top gradient, parallax glow, and backdrop blur export",
    payload: {
      topGradientCss: "linear-gradient(180deg, rgba(255,255,255,0.28), transparent)",
      parallaxHighlightEnabled: true,
      parallaxStrength: 0.45,
      backdropBlurEnabled: true,
      backdropBlurText: 12,
    },
    react: ['"topGradient":"linear-gradient(180deg, rgba(255,255,255,0.28), transparent)"', '"parallaxEnabled":true', '"parallaxOpacity":0.45', '"backdropBlur":"12px"', "uif-top-gradient", "uif-parallax-glow"],
    html: ['"topGradient":"linear-gradient(180deg, rgba(255,255,255,0.28), transparent)"', '"parallaxEnabled":true', '"parallaxOpacity":0.45', '"backdropBlur":"12px"', "uif-top-gradient", "uif-parallax-glow"],
  },
  {
    name: "icon states export base, hover, active, loading, size, position, and color",
    payload: {
      baseIconSvg: "BASE_ICON_MARKUP",
      hoverIconSvg: "HOVER_ICON_MARKUP",
      activeIconSvg: "ACTIVE_ICON_MARKUP",
      loadingIconSvg: "LOADING_ICON_MARKUP",
      iconPosition: "right",
      iconSizeText: 20,
      iconColorMode: "custom",
      iconColorInput: "#ff5500",
      loading: true,
    },
    react: ['BASE_ICON_MARKUP', 'HOVER_ICON_MARKUP', 'ACTIVE_ICON_MARKUP', 'LOADING_ICON_MARKUP', '"position":"right"', '"size":"20px"', '"color":"#ff5500"'],
    html: ['BASE_ICON_MARKUP', 'HOVER_ICON_MARKUP', 'ACTIVE_ICON_MARKUP', 'LOADING_ICON_MARKUP', '"position":"right"', '"size":"20px"', '"color":"#ff5500"'],
  },
  {
    name: "spinner mode and position export correctly",
    payload: {
      loading: true,
      loadingIconSvg: "",
      loadingSpinnerMode: "default",
      loadingSpinnerSvg: "SPINNER_MARKUP",
      loadingSpinnerPosition: "right",
    },
    react: ['"showSpinner":true', '"spinnerPosition":"right"', 'SPINNER_MARKUP'],
    html: ['"showSpinner":true', '"spinnerPosition":"right"', 'SPINNER_MARKUP'],
  },
  {
    name: "hover and active states export style filters and transforms",
    payload: {
      hoverEnabled: true,
      cssHoverBg: "#2563eb",
      cssHoverText: "#eff6ff",
      cssHoverBorder: "#1d4ed8",
      cssHoverFilter: "brightness(1.1)",
      activeEnabled: true,
      cssActiveBg: "#1d4ed8",
      cssActiveText: "#dbeafe",
      cssActiveBorder: "#1e40af",
      cssActiveFilter: "saturate(1.2)",
      activeTranslateYText: 2,
      activeScaleText: 0.97,
    },
    react: ['"hoverEnabled":true', '"filter":"brightness(1.1)"', '"activeEnabled":true', '"filter":"saturate(1.2)"', 'translateY(2px) scale(0.97)'],
    html: ['"hoverEnabled":true', '"filter":"brightness(1.1)"', '"activeEnabled":true', '"filter":"saturate(1.2)"', 'translateY(2px) scale(0.97)'],
  },
  {
    name: "focus ring and accessibility export",
    payload: {
      focusRingEnabled: true,
      focusRingWidth: 5,
      focusRingOffset: 3,
      focusRingColor: "#10b981",
      previewBgHex: "#fef3c7",
      ariaLabel: "Proceed",
      ariaPressedMode: "mixed",
      ariaBusyMode: "true",
    },
    react: ['"focusRingEnabled":true', '"focusRingColor":"#10b981"', '"focusRingWidth":5', '"focusRingOffset":3', '"previewSurface":"#fef3c7"', '"ariaLabel":"Proceed"', '"ariaPressed":"mixed"', '"ariaBusy":"true"'],
    html: ['"focusRingEnabled":true', '"focusRingColor":"#10b981"', '"focusRingWidth":5', '"focusRingOffset":3', '"previewSurface":"#fef3c7"', '"ariaLabel":"Proceed"', '"ariaPressed":"mixed"', '"ariaBusy":"true"'],
  },
  {
    name: "hover effect magnetic exports live shell motion support",
    payload: { hoverEffect: "magnetic" },
    react: ['"hoverEffect":"magnetic"', 'CONFIG.hoverEffect === "magnetic"'],
    html: ['"hoverEffect":"magnetic"', 'CONFIG.hoverEffect === "magnetic"'],
  },
  {
    name: "hover effect spotlight exports overlay support",
    payload: { hoverEffect: "spotlight" },
    react: ['"hoverEffect":"spotlight"', 'uif-spotlight'],
    html: ['"hoverEffect":"spotlight"', 'uif-spotlight'],
  },
  {
    name: "hover effect tilt exports pointer tilt support",
    payload: { hoverEffect: "tilt" },
    react: ['"hoverEffect":"tilt"', 'rotateX(', 'rotateY('],
    html: ['"hoverEffect":"tilt"', 'rotateX(', 'rotateY('],
  },
  {
    name: "hover effect morph exports rounded morph behavior",
    payload: { hoverEffect: "morph" },
    react: ['"hoverEffect":"morph"', '"999px"', 'scale(1.03)'],
    html: ['"hoverEffect":"morph"', '"999px"', 'scale(1.03)'],
  },
  {
    name: "hover effect sparkles exports sparkle layer",
    payload: { hoverEffect: "sparkles" },
    react: ['"hoverEffect":"sparkles"', 'uif-sparkle-layer', 'uif-sparkle-dot'],
    html: ['"hoverEffect":"sparkles"', 'uif-sparkle-layer', 'uif-sparkle-dot'],
  },
  {
    name: "click effect ripple exports ripple behavior",
    payload: { clickEffect: "ripple" },
    react: ['"clickEffect":"ripple"', 'uif-ripple'],
    html: ['"clickEffect":"ripple"', 'uif-ripple'],
  },
  {
    name: "click effect confetti exports burst behavior without external runtime dependency",
    payload: { clickEffect: "confetti", clickParticleCount: 32 },
    react: ['"clickEffect":"confetti"', '"particleCount":32', 'spawnBurst('],
    html: ['"clickEffect":"confetti"', '"particleCount":32', 'spawnBurst('],
  },
  {
    name: "click effect explosion exports burst behavior and particle scaling",
    payload: { clickEffect: "explosion", clickParticleCount: 48 },
    react: ['"clickEffect":"explosion"', '"particleCount":48', 'mode === "explosion"'],
    html: ['"clickEffect":"explosion"', '"particleCount":48', 'mode === "explosion"'],
  },
];

const exporter = await loadExporter();
const results = CASES.map((testCase) => runCase(exporter, testCase));
const failures = results.filter((result) => !result.reactPass || !result.htmlPass);

for (const result of results) {
  const status = result.reactPass && result.htmlPass ? "PASS" : "FAIL";
  console.log(`${status} ${result.name}`);
  if (!result.reactPass) console.log("  React export check failed");
  if (!result.htmlPass) console.log("  HTML export check failed");
}

console.log("");
console.log(`Feature export checks: ${results.length - failures.length}/${results.length} passed`);

if (failures.length > 0) {
  process.exitCode = 1;
}
