import { SYSTEM_FONTS } from "../_data/buttonConstants";
import { type ActionButtonState } from "../types";
import { buildGradient, clamp, hexWithAlpha, norm } from "./colorUtils";

export type PresetPreviewModel = {
  canvas: string;
  width: string;
  minHeight: string;
  padding: string;
  background: string;
  color: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  boxShadow: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  letterSpacing: string;
  lineHeight: string;
  topGradient: string;
  iconSize: string;
  iconGap: string;
  iconColor: string;
  isHero: boolean;
};

function toLength(value: string, fallback: number) {
  const numeric = Number(value);
  return `${Number.isFinite(numeric) ? numeric : fallback}px`;
}

function getPreviewCanvas(state: ActionButtonState) {
  if (state.previewBgMode === "white") return "#ffffff";
  if (state.previewBgMode === "black") return "#000000";
  return norm(state.previewBgInput).ok ? norm(state.previewBgInput).hex : state.previewBgInput;
}

function getBaseBackground(state: ActionButtonState) {
  if (state.variant !== "solid") return "transparent";
  if (!state.useGradient) {
    return norm(state.bgInput).ok ? norm(state.bgInput).hex : state.bgInput;
  }
  return buildGradient(
    state.gradAngleText,
    state.gradStartInput,
    state.gradMidEnabled,
    state.gradMidInput,
    state.gradEndInput,
  );
}

function getBaseShadow(state: ActionButtonState) {
  const layers: string[] = [];
  const shadowColor = norm(state.shColorInput).ok ? norm(state.shColorInput).hex : state.shColorInput;
  const shadowOpacity = clamp(Number(state.shOpacityText) || 0, 0, 1);

  if (state.shadowEnabled) {
    layers.push(
      `${Number(state.shXText) || 0}px ${Number(state.shYText) || 0}px ${
        Number(state.shBlurText) || 0
      }px ${Number(state.shSpreadText) || 0}px ${hexWithAlpha(shadowColor, shadowOpacity)}`,
    );
  }

  if (state.bevelEnabled) {
    const bevelSize = Math.max(0, Number(state.bevelSizeText) || 0);
    const bevelBlur = Math.max(0, Number(state.bevelSoftnessText) || 0);
    if (bevelSize > 0) {
      layers.push(`inset -${bevelSize}px -${bevelSize}px ${bevelBlur}px 0px rgba(255, 255, 255, 0.35)`);
      layers.push(`inset ${bevelSize}px ${bevelSize}px ${bevelBlur}px 0px rgba(0, 0, 0, 0.25)`);
    }
  }

  return layers.join(", ") || "none";
}

function getTopGradient(state: ActionButtonState) {
  if (!state.topGradientEnabled) return "none";
  const opacity = clamp(Number(state.topGradOpacityText) || 0.15, 0, 1);
  const topStart = norm(state.topGradStartInput).ok
    ? norm(state.topGradStartInput).hex
    : state.topGradStartInput;
  const topMid = norm(state.topGradMidInput).ok
    ? norm(state.topGradMidInput).hex
    : state.topGradMidInput;
  const topEnd = norm(state.topGradEndInput).ok
    ? norm(state.topGradEndInput).hex
    : state.topGradEndInput;
  return state.topGradMidEnabled
    ? `linear-gradient(${Number(state.topGradAngleText) || 180}deg, ${hexWithAlpha(
        topStart,
        opacity,
      )}, ${hexWithAlpha(topMid, opacity)}, ${hexWithAlpha(topEnd, opacity)})`
    : `linear-gradient(${Number(state.topGradAngleText) || 180}deg, ${hexWithAlpha(
        topStart,
        opacity,
      )}, ${hexWithAlpha(topEnd, opacity)})`;
}

function getFontFamily(state: ActionButtonState) {
  if (state.fontBucket === "google" && state.googleFontFamily) {
    return `"${state.googleFontFamily}", system-ui`;
  }
  return SYSTEM_FONTS[state.systemFontIdx]?.css ?? "Arial, system-ui";
}

export function buildPresetPreviewModel(state: ActionButtonState): PresetPreviewModel {
  return {
    canvas: getPreviewCanvas(state),
    width: toLength(state.widthText, 180),
    minHeight: toLength(state.heightText, 40),
    padding: `${toLength(state.paddingYText, 0)} ${toLength(state.paddingXText, 16)}`,
    background: getBaseBackground(state),
    color: norm(state.textInput).ok ? norm(state.textInput).hex : state.textInput,
    borderColor: norm(state.borderInput).ok ? norm(state.borderInput).hex : state.borderInput,
    borderWidth: toLength(state.borderWidthText, 1),
    borderRadius: `${toLength(state.radiusTLText, 12)} ${toLength(
      state.radiusTRText,
      12,
    )} ${toLength(state.radiusBRText, 12)} ${toLength(state.radiusBLText, 12)}`,
    boxShadow: getBaseShadow(state),
    fontFamily: getFontFamily(state),
    fontSize: toLength(state.fontSizeText, 14),
    fontWeight: state.fontWeight,
    letterSpacing: `${state.letterSpacingText}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeightText || "1",
    topGradient: getTopGradient(state),
    iconSize: toLength(state.iconSizeText, 18),
    iconGap: toLength(state.iconGapText, 10),
    iconColor:
      state.iconColorMode === "custom" &&
      (norm(state.iconColorInput).ok ? norm(state.iconColorInput).hex : state.iconColorInput)
        ? norm(state.iconColorInput).ok
          ? norm(state.iconColorInput).hex
          : state.iconColorInput
        : "currentColor",
    isHero: state.widthText === "260" || Number(state.widthText) >= 240,
  };
}
