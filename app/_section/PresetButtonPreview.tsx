import React from "react";

import { type ButtonPreset } from "../_data/buttonPresets";
import { resolveIconSvg } from "../_utils/iconMarkup";
import { buildPresetPreviewModel } from "../_utils/presetPreviewModel";

export default function PresetButtonPreview({ preset }: { preset: ButtonPreset }) {
  const model = buildPresetPreviewModel(preset.state);
  const baseIconSvg = resolveIconSvg(
    preset.state.iconSource,
    preset.state.iconName,
    preset.state.iconCustomSvg,
  );

  return (
    <div
      className="mt-3 rounded-2xl border p-4"
      style={{
        borderColor: "color-mix(in oklab, var(--border) 80%, transparent)",
        background: model.canvas,
      }}
    >
      <div
        className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl border text-sm font-semibold"
        style={{
          width: model.isHero ? "100%" : `min(100%, ${model.width})`,
          minHeight: model.minHeight,
          padding: model.padding,
          background: model.background,
          color: model.color,
          borderColor: model.borderColor,
          boxShadow: model.boxShadow,
          borderWidth: model.borderWidth,
          borderStyle: "solid",
          borderRadius: model.borderRadius,
          fontFamily: model.fontFamily,
          fontSize: model.fontSize,
          fontWeight: model.fontWeight,
          letterSpacing: model.letterSpacing,
          lineHeight: model.lineHeight,
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      >
        {model.topGradient !== "none" ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: model.topGradient, mixBlendMode: "overlay" }}
          />
        ) : null}
        <span
          className="relative z-[1] inline-flex items-center justify-center"
          style={{
            gap: baseIconSvg ? model.iconGap : "0px",
            flexDirection: preset.state.iconPosition === "right" ? "row-reverse" : "row",
          }}
        >
          {baseIconSvg ? (
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
              style={{
                width: model.iconSize,
                height: model.iconSize,
                fontSize: model.iconSize,
                color: model.iconColor,
              }}
              dangerouslySetInnerHTML={{ __html: baseIconSvg }}
            />
          ) : null}
          <span>{preset.state.label}</span>
        </span>
      </div>
    </div>
  );
}
