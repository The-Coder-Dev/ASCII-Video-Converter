import { createCanvas } from "canvas";
import fs from "node:fs";
import type { RendererOptions } from "../types/renderer.js";
import { renderConfig } from "../config/renderConfig.js";

export async function renderAscii({
  ascii,
  outputPath,
}: RendererOptions) {
  // Split ASCII into lines
  const lines = ascii.split("\n");

  const rows = lines.length;
  const columns = lines[0]?.length ?? 0;

  // Temporary canvas for measuring text
  const measureCanvas = createCanvas(1, 1);
  const measureCtx = measureCanvas.getContext("2d");

  // Set the font BEFORE measuring
  measureCtx.font = `${renderConfig.fontSize}px ${renderConfig.fontFamily}`;

  const metrics = measureCtx.measureText("M");
  const charWidth = metrics.width;

  // Calculate canvas size
  const width =
    Math.ceil(columns * charWidth + renderConfig.paddingX * 2);

  const height =
    Math.ceil(rows * renderConfig.lineHeight + renderConfig.paddingY * 2);

  // Create the actual canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = renderConfig.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text settings
  ctx.font = `${renderConfig.fontSize}px ${renderConfig.fontFamily}`;
  ctx.fillStyle = renderConfig.foreground;
  ctx.textBaseline = "top";

  // Draw ASCII
  let y = renderConfig.paddingY;

  for (const line of lines) {
    ctx.fillText(line, renderConfig.paddingX, y);
    y += renderConfig.lineHeight;
  }

  // Save image
  fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));

  console.log(`✅ PNG created: ${outputPath}`);
}