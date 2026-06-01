import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const checks = [];

function check(name, passed, detail) {
  checks.push({ name, passed, detail });
}

const exportUtils = read("app/_utils/exportUtils.ts");
const page = read("app/page.tsx");
const panel = read("components/shared/layout/SharedPreviewDownloadPanel.tsx");
const exportOptions = read("components/shared/export/ExportOptionsControl.tsx");
const codeBlock = read("components/shared/layout/CodeBlock.tsx");
const animatedToggle = read("components/shared/layout/AnimatedToggle.tsx");
const undoRedo = read("components/shared/layout/UndoRedoButtons.tsx");
const types = read("app/types.ts");

check(
  "Export utility is React-only",
  exportUtils.includes('export type DownloadFormat = "react";') &&
    !exportUtils.includes('DownloadFormat = "react" |') &&
    !exportUtils.includes("buildHtmlContent") &&
    !exportUtils.includes("text/html"),
  "No hidden HTML/Tailwind/CSS export branch should remain in the button export utility.",
);

check(
  "Export payload returns React JSX filename",
  exportUtils.includes("content: buildReactContent(config)") &&
    exportUtils.includes("filename: `${base}.jsx`"),
  "buildExportPayload must produce the same React payload used by code/copy/download.",
);

check(
  "Download helper uses the same payload builder",
  exportUtils.includes("const { content, filename } = buildExportPayload(payload)") &&
    exportUtils.includes('type: "text/plain;charset=utf-8"'),
  "downloadExportPayload must derive from buildExportPayload and use React-text MIME.",
);

check(
  "Shared panel exposes only React download format",
  panel.includes('export type DownloadFormat = "react";') &&
    exportOptions.includes('export type DownloadFormat = "react";') &&
    exportOptions.includes('{ value: "react", label: "React / JSX" }') &&
    !exportOptions.includes('value: "html"') &&
    !exportOptions.includes('value: "tailwind"'),
  "SharedPreviewDownloadPanel must not advertise non-shipping formats.",
);

check(
  "Visible code panel receives exportCode.content",
  page.includes("code={exportCode.content}") &&
    page.includes("const exportCode = useMemo(") &&
    page.includes("() => buildExportPayload(exportPayload)"),
  "The visible code panel must be sourced from the same buildExportPayload result.",
);

check(
  "Page download uses the same exportCode object",
  page.includes("const { filename, content } = exportCode") &&
    page.includes('const blob = new Blob([content], { type: "text/plain;charset=utf-8" })'),
  "The page-level download path must use the currently visible export payload.",
);

check(
  "Copy button copies the rendered code prop",
  codeBlock.includes("navigator.clipboard.writeText(code)") &&
    codeBlock.includes('data-testid="copy-code-button"'),
  "Copy output must be the CodeBlock code prop, not a separately generated payload.",
);

check(
  "Preset apply resets transient preview state",
  /const applyButtonPreset = \(preset: ButtonPreset\) => \{[\s\S]*?setPreviewResetKey\(\(current\) => current \+ 1\);[\s\S]*?\n  \};/.test(page),
  "Preset application must clear stale hover/click/focus/transient state.",
);

check(
  "Reset action clears transient preview state",
  /reset=\{\(\) => \{[\s\S]*?reset\(\);[\s\S]*?setPreviewResetKey\(\(current\) => current \+ 1\);[\s\S]*?\}\}/.test(page),
  "Full reset must also clear stale transient preview state.",
);

check(
  "App state default remains React-only",
  types.includes('downloadFormat: "react"') && !types.includes('downloadFormat: "html"'),
  "Initial state must not contain stale non-React export defaults.",
);

check(
  "Shared editor action buttons are explicit non-submit controls",
  exportOptions.includes('type="button"') &&
    codeBlock.includes('type="button"') &&
    animatedToggle.includes('type="button"') &&
    undoRedo.match(/type="button"/g)?.length >= 3,
  "Common editor buttons should not accidentally submit enclosing forms.",
);

check(
  "Icon/action controls expose accessible names or pressed state",
  exportOptions.includes("aria-label={isDownloading") &&
    codeBlock.includes('aria-label="Copy code"') &&
    animatedToggle.includes("aria-pressed={value === option.value}") &&
    undoRedo.includes('aria-label="Reset to default"'),
  "Common editor action controls need accessible names and honest toggle state.",
);

const failed = checks.filter((item) => !item.passed);

for (const item of checks) {
  const marker = item.passed ? "PASS" : "FAIL";
  console.log(`${marker}: ${item.name}`);
  if (!item.passed) console.log(`  ${item.detail}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} parity check(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${checks.length} button parity checks passed.`);
