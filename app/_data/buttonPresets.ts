import { type ActionButtonState, INITIAL_STATE } from "../types";
import { contrastRatio, hexWithAlpha } from "../_utils/colorUtils";

type PresetTheme = {
  id: string;
  name: string;
  canvas: string;
  accent: string;
  base: string;
  mid: string;
  end: string;
  shadow: string;
  ring: string;
};

type PresetMood = {
  id: string;
  name: string;
  label: string;
  buttonAnimation: ActionButtonState["animation"];
  textAnimation: ActionButtonState["textAnimation"];
  depthAnimation: ActionButtonState["depthAnimation"];
  hoverEffect: string;
  clickEffect: string;
  iconName: ActionButtonState["iconName"];
  hoverIconName: ActionButtonState["hoverIconName"];
  activeIconName: ActionButtonState["activeIconName"];
  googleFontFamily: string;
  animationDurationText: string;
  animationSpeedText: string;
  animationIntensityText: string;
  animationEasing: ActionButtonState["animationEasing"];
  textAnimationStaggerText: string;
  transitionColorDurationText: string;
  transitionTransformDurationText: string;
  hoverSpringStiffness: string;
  hoverSpringDamping: string;
  hoverBgModeSolid: ActionButtonState["hoverBgMode"];
  activeBgModeSolid: ActionButtonState["activeBgMode"];
  topGradientEnabled: boolean;
  parallaxHighlightEnabled: boolean;
  glossEnabled: boolean;
  bevelEnabled: boolean;
  iconEmbossMode: ActionButtonState["iconEmbossMode"];
};

type PresetSize = {
  id: string;
  name: string;
  width: string;
  height: string;
  padX: string;
  padY: string;
  radius: string;
  fontSize: string;
  iconSize: string;
  gap: string;
  shadowY: string;
  shadowBlur: string;
  depth: string;
};

function pickReadableTextColor(background: string) {
  const dark = "#111827";
  const light = "#ffffff";
  const darkContrast = contrastRatio(dark, background) ?? 0;
  const lightContrast = contrastRatio(light, background) ?? 0;
  return darkContrast >= lightContrast ? dark : light;
}

function pickReadableThemeTone(primary: string, fallback: string, background: string) {
  const primaryContrast = contrastRatio(primary, background) ?? 0;
  const fallbackContrast = contrastRatio(fallback, background) ?? 0;
  return primaryContrast >= fallbackContrast ? primary : fallback;
}

export type ButtonPreset = {
  id: string;
  name: string;
  family: string;
  mood: string;
  variant: ActionButtonState["variant"];
  size: string;
  summary: string;
  tags: string[];
  preview: {
    canvas: string;
    background: string;
    text: string;
    border: string;
    shadow: string;
  };
  state: ActionButtonState;
};

const THEMES: PresetTheme[] = [
  {
    id: "slate",
    name: "Slate",
    canvas: "#f3f4f6",
    accent: "#334155",
    base: "#0f172a",
    mid: "#1e293b",
    end: "#475569",
    shadow: "#0f172a",
    ring: "#64748b",
  },
  {
    id: "cobalt",
    name: "Cobalt",
    canvas: "#eff6ff",
    accent: "#2563eb",
    base: "#1d4ed8",
    mid: "#2563eb",
    end: "#60a5fa",
    shadow: "#1e3a8a",
    ring: "#60a5fa",
  },
  {
    id: "emerald",
    name: "Emerald",
    canvas: "#ecfdf5",
    accent: "#10b981",
    base: "#047857",
    mid: "#059669",
    end: "#34d399",
    shadow: "#064e3b",
    ring: "#34d399",
  },
  {
    id: "sunset",
    name: "Sunset",
    canvas: "#fff7ed",
    accent: "#f97316",
    base: "#ea580c",
    mid: "#fb923c",
    end: "#fdba74",
    shadow: "#9a3412",
    ring: "#fb923c",
  },
  {
    id: "rose",
    name: "Rose",
    canvas: "#fff1f2",
    accent: "#f43f5e",
    base: "#e11d48",
    mid: "#fb7185",
    end: "#fda4af",
    shadow: "#881337",
    ring: "#fb7185",
  },
  {
    id: "violet",
    name: "Violet",
    canvas: "#f5f3ff",
    accent: "#8b5cf6",
    base: "#7c3aed",
    mid: "#a78bfa",
    end: "#c4b5fd",
    shadow: "#4c1d95",
    ring: "#a78bfa",
  },
  {
    id: "amber",
    name: "Amber",
    canvas: "#fffbeb",
    accent: "#d97706",
    base: "#b45309",
    mid: "#f59e0b",
    end: "#fcd34d",
    shadow: "#78350f",
    ring: "#f59e0b",
  },
  {
    id: "mint",
    name: "Mint",
    canvas: "#ecfeff",
    accent: "#14b8a6",
    base: "#0f766e",
    mid: "#14b8a6",
    end: "#5eead4",
    shadow: "#134e4a",
    ring: "#2dd4bf",
  },
  {
    id: "arctic",
    name: "Arctic",
    canvas: "#f8fafc",
    accent: "#0ea5e9",
    base: "#0369a1",
    mid: "#38bdf8",
    end: "#7dd3fc",
    shadow: "#0c4a6e",
    ring: "#38bdf8",
  },
  {
    id: "cherry",
    name: "Cherry",
    canvas: "#fff1f2",
    accent: "#be123c",
    base: "#881337",
    mid: "#e11d48",
    end: "#fb7185",
    shadow: "#4c0519",
    ring: "#fb7185",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    canvas: "#020617",
    accent: "#38bdf8",
    base: "#0f172a",
    mid: "#1e293b",
    end: "#334155",
    shadow: "#000000",
    ring: "#38bdf8",
  },
  {
    id: "indigo",
    name: "Indigo",
    canvas: "#eef2ff",
    accent: "#6366f1",
    base: "#4338ca",
    mid: "#6366f1",
    end: "#a5b4fc",
    shadow: "#312e81",
    ring: "#818cf8",
  },
];

const MOODS: PresetMood[] = [
  {
    id: "calm",
    name: "Calm",
    label: "Continue",
    buttonAnimation: "breathe",
    textAnimation: "none",
    depthAnimation: "none",
    hoverEffect: "magnetic",
    clickEffect: "ripple",
    iconName: "arrowRight",
    hoverIconName: "arrowRight",
    activeIconName: "check",
    googleFontFamily: "Inter",
    animationDurationText: "4200",
    animationSpeedText: "90",
    animationIntensityText: "16",
    animationEasing: "ease-in-out",
    textAnimationStaggerText: "90",
    transitionColorDurationText: "170",
    transitionTransformDurationText: "130",
    hoverSpringStiffness: "280",
    hoverSpringDamping: "24",
    hoverBgModeSolid: "auto",
    activeBgModeSolid: "same",
    topGradientEnabled: false,
    parallaxHighlightEnabled: false,
    glossEnabled: false,
    bevelEnabled: false,
    iconEmbossMode: "off",
  },
  {
    id: "luxe",
    name: "Luxe",
    label: "Reserve",
    buttonAnimation: "sheen",
    textAnimation: "shimmer",
    depthAnimation: "orbit",
    hoverEffect: "tilt",
    clickEffect: "ripple",
    iconName: "star",
    hoverIconName: "star",
    activeIconName: "check",
    googleFontFamily: "Playfair Display",
    animationDurationText: "5200",
    animationSpeedText: "100",
    animationIntensityText: "22",
    animationEasing: "ease-in-out",
    textAnimationStaggerText: "120",
    transitionColorDurationText: "190",
    transitionTransformDurationText: "150",
    hoverSpringStiffness: "260",
    hoverSpringDamping: "20",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "gradient",
    topGradientEnabled: true,
    parallaxHighlightEnabled: true,
    glossEnabled: true,
    bevelEnabled: true,
    iconEmbossMode: "raised",
  },
  {
    id: "aurora",
    name: "Aurora",
    label: "Explore",
    buttonAnimation: "aurora",
    textAnimation: "wave",
    depthAnimation: "tilt-cycle",
    hoverEffect: "spotlight",
    clickEffect: "confetti",
    iconName: "info",
    hoverIconName: "star",
    activeIconName: "check",
    googleFontFamily: "Space Grotesk",
    animationDurationText: "5600",
    animationSpeedText: "95",
    animationIntensityText: "28",
    animationEasing: "ease-in-out",
    textAnimationStaggerText: "80",
    transitionColorDurationText: "180",
    transitionTransformDurationText: "140",
    hoverSpringStiffness: "300",
    hoverSpringDamping: "18",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "gradient",
    topGradientEnabled: true,
    parallaxHighlightEnabled: true,
    glossEnabled: false,
    bevelEnabled: false,
    iconEmbossMode: "raised",
  },
  {
    id: "playful",
    name: "Playful",
    label: "Try It",
    buttonAnimation: "soft-drift",
    textAnimation: "bounce",
    depthAnimation: "rock",
    hoverEffect: "morph",
    clickEffect: "confetti",
    iconName: "plus",
    hoverIconName: "star",
    activeIconName: "check",
    googleFontFamily: "Nunito",
    animationDurationText: "3600",
    animationSpeedText: "110",
    animationIntensityText: "26",
    animationEasing: "ease-out",
    textAnimationStaggerText: "70",
    transitionColorDurationText: "160",
    transitionTransformDurationText: "130",
    hoverSpringStiffness: "320",
    hoverSpringDamping: "18",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "custom",
    topGradientEnabled: false,
    parallaxHighlightEnabled: true,
    glossEnabled: false,
    bevelEnabled: false,
    iconEmbossMode: "off",
  },
  {
    id: "neon",
    name: "Neon",
    label: "Launch",
    buttonAnimation: "neon-pulse",
    textAnimation: "flicker",
    depthAnimation: "orbit",
    hoverEffect: "spotlight",
    clickEffect: "confetti",
    iconName: "info",
    hoverIconName: "arrowRight",
    activeIconName: "check",
    googleFontFamily: "Space Grotesk",
    animationDurationText: "3200",
    animationSpeedText: "125",
    animationIntensityText: "34",
    animationEasing: "linear",
    textAnimationStaggerText: "60",
    transitionColorDurationText: "150",
    transitionTransformDurationText: "120",
    hoverSpringStiffness: "340",
    hoverSpringDamping: "16",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "custom",
    topGradientEnabled: true,
    parallaxHighlightEnabled: true,
    glossEnabled: true,
    bevelEnabled: false,
    iconEmbossMode: "raised",
  },
  {
    id: "cyber",
    name: "Cyber",
    label: "Deploy",
    buttonAnimation: "cyber-glitch",
    textAnimation: "glitch",
    depthAnimation: "gyro",
    hoverEffect: "tilt",
    clickEffect: "explosion",
    iconName: "x",
    hoverIconName: "info",
    activeIconName: "check",
    googleFontFamily: "Space Grotesk",
    animationDurationText: "2400",
    animationSpeedText: "135",
    animationIntensityText: "42",
    animationEasing: "linear",
    textAnimationStaggerText: "45",
    transitionColorDurationText: "140",
    transitionTransformDurationText: "120",
    hoverSpringStiffness: "360",
    hoverSpringDamping: "14",
    hoverBgModeSolid: "custom",
    activeBgModeSolid: "custom",
    topGradientEnabled: true,
    parallaxHighlightEnabled: true,
    glossEnabled: false,
    bevelEnabled: true,
    iconEmbossMode: "inset",
  },
];

const SIZES: PresetSize[] = [
  {
    id: "compact",
    name: "Compact",
    width: "180",
    height: "40",
    padX: "16",
    padY: "0",
    radius: "12",
    fontSize: "13",
    iconSize: "16",
    gap: "8",
    shadowY: "8",
    shadowBlur: "18",
    depth: "6",
  },
  {
    id: "hero",
    name: "Hero",
    width: "260",
    height: "56",
    padX: "28",
    padY: "0",
    radius: "18",
    fontSize: "16",
    iconSize: "18",
    gap: "12",
    shadowY: "12",
    shadowBlur: "28",
    depth: "10",
  },
];

const VARIANT_LABELS: Record<ActionButtonState["variant"], string> = {
  solid: "Solid",
  outline: "Outline",
  ghost: "Ghost",
};

function makeHoverBackground(theme: PresetTheme, alpha: number) {
  return hexWithAlpha(theme.accent, alpha);
}

function makeVariantState(
  theme: PresetTheme,
  mood: PresetMood,
  size: PresetSize,
  variant: ActionButtonState["variant"],
): ActionButtonState {
  const state: ActionButtonState = {
    ...INITIAL_STATE,
    label: mood.label,
    variant,
    loadingLabel: "Please wait...",
    widthText: size.width,
    heightText: size.height,
    paddingXText: size.padX,
    paddingYText: size.padY,
    radiusText: size.radius,
    radiusTLText: size.radius,
    radiusTRText: size.radius,
    radiusBRText: size.radius,
    radiusBLText: size.radius,
    fontBucket: "google",
    googleFontFamily: mood.googleFontFamily,
    fontSearch: "",
    fontSizeText: size.fontSize,
    fontWeight: mood.id === "luxe" ? 600 : 700,
    letterSpacingText: mood.id === "cyber" ? "0.6" : "0.2",
    lineHeightText: "1",
    textTransform: mood.id === "cyber" ? "uppercase" : "none",
    underline: false,
    iconName: mood.iconName,
    iconSource: "library",
    hoverIconEnabled: mood.hoverIconName !== "none",
    hoverIconSource: "library",
    hoverIconName: mood.hoverIconName,
    activeIconEnabled: mood.activeIconName !== "none",
    activeIconSource: "library",
    activeIconName: mood.activeIconName,
    iconPosition: "left",
    iconSizeText: size.iconSize,
    iconGapText: size.gap,
    iconColorMode: "text",
    animation: mood.buttonAnimation,
    textAnimation: mood.textAnimation,
    depthAnimation: mood.depthAnimation,
    animationDurationText: mood.animationDurationText,
    animationSpeedText: mood.animationSpeedText,
    animationIntensityText: mood.animationIntensityText,
    animationEasing: mood.animationEasing,
    textAnimationStaggerText: mood.textAnimationStaggerText,
    hoverEffect: mood.hoverEffect,
    clickEffect: mood.clickEffect,
    clickParticleCount: mood.clickEffect === "explosion" ? "64" : "40",
    hoverSpringStiffness: mood.hoverSpringStiffness,
    hoverSpringDamping: mood.hoverSpringDamping,
    transitionColorDurationText: mood.transitionColorDurationText,
    transitionTransformDurationText: mood.transitionTransformDurationText,
    focusRingInput: theme.ring,
    previewBgMode: "custom",
    previewBgInput: theme.canvas,
    shadowEnabled: true,
    shXText: "0",
    shYText: size.shadowY,
    shBlurText: size.shadowBlur,
    shSpreadText: "0",
    shOpacityText: variant === "solid" ? "0.18" : "0.12",
    shColorInput: theme.shadow,
    elevationPreset:
      mood.id === "cyber"
        ? "lifted"
        : mood.id === "calm"
          ? "raised"
          : "lifted",
    depthText: size.depth,
    topGradientEnabled: mood.topGradientEnabled && variant === "solid",
    topGradAngleText: "180",
    topGradStartInput: "#ffffff",
    topGradMidEnabled: false,
    topGradMidInput: "#ffffff",
    topGradEndInput: "#000000",
    topGradOpacityText: mood.id === "neon" ? "0.22" : "0.16",
    parallaxHighlightEnabled: mood.parallaxHighlightEnabled,
    parallaxStrengthText: mood.parallaxHighlightEnabled ? "0.45" : "0.35",
    glossEnabled: mood.glossEnabled,
    glossOpacityText: mood.glossEnabled ? "0.18" : "0.22",
    bevelEnabled: mood.bevelEnabled,
    iconEmbossMode: mood.iconEmbossMode,
    textShadowEnabled: mood.textAnimation === "flicker" || mood.textAnimation === "glitch",
    tsXText: "0",
    tsYText: "1",
    tsBlurText: mood.textAnimation === "glitch" ? "4" : "2",
    tsOpacityText: mood.textAnimation === "glitch" ? "0.35" : "0.2",
    tsColorInput: theme.accent,
    borderInput: theme.accent,
    hoverBorderInput: theme.accent,
    activeBorderInput: theme.accent,
    ariaLabel: mood.label,
  };

  const solidText = pickReadableTextColor(theme.mid);
  const outlineTone = pickReadableThemeTone(theme.accent, theme.base, theme.canvas);

  if (variant === "solid") {
    state.useGradient = true;
    state.gradAngleText = mood.id === "cyber" ? "135" : "90";
    state.gradStartInput = theme.base;
    state.gradMidEnabled = true;
    state.gradMidInput = theme.mid;
    state.gradEndInput = theme.end;
    state.bgInput = theme.base;
    state.textInput = solidText;
    state.borderWidthText = theme.id === "obsidian" ? "1" : "1";
    state.borderInput = hexWithAlpha(solidText, 0.12);
    state.hoverBgMode = mood.hoverBgModeSolid;
    state.hoverBgInput = mood.hoverBgModeSolid === "custom" ? theme.mid : theme.base;
    state.hoverGradAngleText = "90";
    state.hoverGradStartInput = theme.mid;
    state.hoverGradMidEnabled = true;
    state.hoverGradMidInput = theme.end;
    state.hoverGradEndInput = theme.accent;
    state.hoverTextMode = "same";
    state.hoverBorderMode = "same";
    state.activeBgMode = mood.activeBgModeSolid;
    state.activeBgInput = theme.base;
    state.activeGradAngleText = "90";
    state.activeGradStartInput = theme.base;
    state.activeGradMidEnabled = true;
    state.activeGradMidInput = theme.accent;
    state.activeGradEndInput = theme.end;
    state.activeTextMode = "same";
    state.activeBorderMode = "same";
    state.activeTranslateYText = mood.id === "calm" ? "1" : "2";
    state.activeScaleText = mood.id === "calm" ? "0.99" : "0.98";
  } else if (variant === "outline") {
    state.useGradient = false;
    state.bgInput = "transparent";
    state.textInput = outlineTone;
    state.borderWidthText = "2";
    state.borderInput = outlineTone;
    state.hoverBgMode = "custom";
    state.hoverBgInput = makeHoverBackground(theme, 0.14);
    state.hoverTextMode = "same";
    state.hoverBorderMode = "same";
    state.activeBgMode = "custom";
    state.activeBgInput = makeHoverBackground(theme, 0.24);
    state.activeTextMode = "same";
    state.activeBorderMode = "same";
    state.activeTranslateYText = "1";
    state.activeScaleText = "0.99";
    state.disabledUseCustomColors = true;
    state.disabledBgInput = "transparent";
    state.disabledTextInput = hexWithAlpha(outlineTone, 0.55);
    state.disabledBorderInput = hexWithAlpha(outlineTone, 0.35);
  } else {
    state.useGradient = false;
    state.bgInput = "transparent";
    state.textInput = outlineTone;
    state.borderWidthText = "0";
    state.borderInput = "transparent";
    state.hoverBgMode = "custom";
    state.hoverBgInput = makeHoverBackground(theme, 0.12);
    state.hoverTextMode = "same";
    state.hoverBorderMode = "custom";
    state.hoverBorderInput = hexWithAlpha(outlineTone, 0.3);
    state.activeBgMode = "custom";
    state.activeBgInput = makeHoverBackground(theme, 0.22);
    state.activeTextMode = "same";
    state.activeBorderMode = "custom";
    state.activeBorderInput = hexWithAlpha(outlineTone, 0.38);
    state.activeTranslateYText = "1";
    state.activeScaleText = "0.99";
    state.disabledUseCustomColors = true;
    state.disabledBgInput = "transparent";
    state.disabledTextInput = hexWithAlpha(outlineTone, 0.48);
    state.disabledBorderInput = "transparent";
  }

  return state;
}

function makePreview(
  theme: PresetTheme,
  state: ActionButtonState,
): ButtonPreset["preview"] {
  if (state.variant === "solid") {
    return {
      canvas: theme.canvas,
      background: `linear-gradient(${state.gradAngleText}deg, ${state.gradStartInput}, ${state.gradMidInput}, ${state.gradEndInput})`,
      text: state.textInput,
      border: state.borderInput,
      shadow: `0 10px 24px ${hexWithAlpha(theme.shadow, 0.18)}`,
    };
  }

  if (state.variant === "outline") {
    return {
      canvas: theme.canvas,
      background: "transparent",
      text: state.textInput,
      border: state.borderInput,
      shadow: `0 8px 18px ${hexWithAlpha(theme.shadow, 0.08)}`,
    };
  }

  return {
    canvas: theme.canvas,
    background: "transparent",
    text: state.textInput,
    border: "transparent",
    shadow: `0 8px 18px ${hexWithAlpha(theme.shadow, 0.06)}`,
  };
}

function buildPreset(
  theme: PresetTheme,
  mood: PresetMood,
  size: PresetSize,
  variant: ActionButtonState["variant"],
): ButtonPreset {
  const state = makeVariantState(theme, mood, size, variant);
  const id = `${theme.id}-${mood.id}-${variant}-${size.id}`;
  const name = `${theme.name} ${mood.name} ${VARIANT_LABELS[variant]} ${size.name}`;
  return {
    id,
    name,
    family: theme.name,
    mood: mood.name,
    variant,
    size: size.name,
    summary: `${VARIANT_LABELS[variant]} button with ${mood.name.toLowerCase()} motion on a ${theme.name.toLowerCase()} palette.`,
    tags: [
      theme.id,
      theme.name.toLowerCase(),
      mood.id,
      mood.name.toLowerCase(),
      variant,
      size.id,
      state.animation,
      state.textAnimation,
      state.depthAnimation,
      state.hoverEffect,
      state.clickEffect,
    ],
    preview: makePreview(theme, state),
    state,
  };
}

export const BUTTON_PRESETS: ButtonPreset[] = THEMES.flatMap((theme) =>
  MOODS.flatMap((mood) =>
    SIZES.flatMap((size) =>
      (["solid", "outline", "ghost"] as const).map((variant) =>
        buildPreset(theme, mood, size, variant),
      ),
    ),
  ),
);

export const BUTTON_PRESET_COUNT = BUTTON_PRESETS.length;
