"use client";

import React, { useState } from "react";
import { type ButtonPreset, BUTTON_PRESET_COUNT } from "../_data/buttonPresets";
import { LabeledField, SectionCard, Segmented } from "./ui";

const PAGE_SIZE = 24;

function Badge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-medium"
      style={{
        borderColor: "color-mix(in oklab, var(--border) 85%, transparent)",
        background: "color-mix(in oklab, var(--surface) 78%, transparent)",
        color: "var(--muted)",
      }}
    >
      {label}
    </span>
  );
}

export default function PresetsSection({
  presets,
  onApplyPreset,
}: {
  presets: ButtonPreset[];
  onApplyPreset: (preset: ButtonPreset) => void;
}) {
  const [query, setQuery] = useState("");
  const [variantFilter, setVariantFilter] = useState("all");
  const [familyFilter, setFamilyFilter] = useState("all");
  const [moodFilter, setMoodFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [page, setPage] = useState(0);

  const families = Array.from(new Set(presets.map((preset) => preset.family)));
  const moods = Array.from(new Set(presets.map((preset) => preset.mood)));
  const sizes = Array.from(new Set(presets.map((preset) => preset.size)));
  const search = query.trim().toLowerCase();

  const filtered = presets.filter((preset) => {
    if (variantFilter !== "all" && preset.variant !== variantFilter) return false;
    if (familyFilter !== "all" && preset.family !== familyFilter) return false;
    if (moodFilter !== "all" && preset.mood !== moodFilter) return false;
    if (sizeFilter !== "all" && preset.size !== sizeFilter) return false;
    if (!search) return true;

    const haystack = [preset.name, preset.summary, ...preset.tags].join(" ").toLowerCase();
    return haystack.includes(search);
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const resetFilters = () => {
    setQuery("");
    setVariantFilter("all");
    setFamilyFilter("all");
    setMoodFilter("all");
    setSizeFilter("all");
    setPage(0);
  };

  const applyRandomPreset = () => {
    if (!filtered.length) return;
    const next = filtered[Math.floor(Math.random() * filtered.length)];
    onApplyPreset(next);
  };

  return (
    <SectionCard
      title="Presets"
      subtitle={`${BUTTON_PRESET_COUNT} editable starting points built from the current button system.`}
    >
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <LabeledField label="Search presets" hint={`${filtered.length} match`}>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Search by name, family, mood, or tag"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>

          <LabeledField label="Variant">
            <Segmented
              value={variantFilter}
              onChange={(value) => {
                setVariantFilter(value);
                setPage(0);
              }}
              items={[
                { value: "all", label: "All" },
                { value: "solid", label: "Solid" },
                { value: "outline", label: "Outline" },
                { value: "ghost", label: "Ghost" },
              ]}
            />
          </LabeledField>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <LabeledField label="Family">
            <select
              value={familyFilter}
              onChange={(event) => {
                setFamilyFilter(event.target.value);
                setPage(0);
              }}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="all">All families</option>
              {families.map((family) => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </LabeledField>

          <LabeledField label="Mood">
            <select
              value={moodFilter}
              onChange={(event) => {
                setMoodFilter(event.target.value);
                setPage(0);
              }}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="all">All moods</option>
              {moods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </LabeledField>

          <LabeledField label="Size">
            <select
              value={sizeFilter}
              onChange={(event) => {
                setSizeFilter(event.target.value);
                setPage(0);
              }}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="all">All sizes</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </LabeledField>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          >
            Reset filters
          </button>

          <button
            type="button"
            onClick={applyRandomPreset}
            className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable"
            style={{
              borderColor: "color-mix(in oklab, var(--primary) 55%, var(--border))",
              background: "color-mix(in oklab, var(--primary) 18%, transparent)",
              color: "var(--text)",
            }}
          >
            Surprise me
          </button>

          <div className="text-xs" style={{ color: "var(--muted)" }}>
            Presets apply a full editable state snapshot. You can keep tweaking from any section after applying one.
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {visible.map((preset) => (
            <div
              key={preset.id}
              className="rounded-2xl border p-3"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 68%, transparent)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                    {preset.name}
                  </div>
                  <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                    {preset.summary}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onApplyPreset(preset)}
                  className="rounded-xl px-3 py-2 text-xs font-semibold uf-clickable"
                  style={{
                    background: "var(--primary)",
                    color: "#ffffff",
                  }}
                >
                  Apply
                </button>
              </div>

              <div
                className="mt-3 rounded-2xl border p-4"
                style={{
                  borderColor: "color-mix(in oklab, var(--border) 80%, transparent)",
                  background: preset.preview.canvas,
                }}
              >
                <div
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold"
                  style={{
                    minWidth: preset.size === "Hero" ? "176px" : "144px",
                    background: preset.preview.background,
                    color: preset.preview.text,
                    borderColor: preset.preview.border,
                    boxShadow: preset.preview.shadow,
                  }}
                >
                  {preset.state.iconName !== "none" ? (
                    <span style={{ opacity: 0.9 }}>+</span>
                  ) : null}
                  <span>{preset.state.label}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge label={preset.family} />
                <Badge label={preset.mood} />
                <Badge label={preset.variant} />
                <Badge label={preset.size} />
                {preset.state.animation !== "none" ? <Badge label={preset.state.animation} /> : null}
                {preset.state.textAnimation !== "none" ? (
                  <Badge label={preset.state.textAnimation} />
                ) : null}
                {preset.state.depthAnimation !== "none" ? (
                  <Badge label={preset.state.depthAnimation} />
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            Page {safePage + 1} of {pageCount}
          </div>

          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              disabled={safePage === 0}
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable disabled:opacity-50"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              Previous
            </button>

            <button
              type="button"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
              className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable disabled:opacity-50"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
