import { createCanvas } from "@napi-rs/canvas";
import fs from "node:fs";
import path from "node:path";
import type { RendererOptions } from "../types/renderer.js";
import { renderConfig } from "../config/renderConfig.js";
import "../fonts/registerFonts.js";

export async function renderAscii({ ascii, outputPath }: RendererOptions) {
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
  const width = Math.ceil(columns * charWidth + renderConfig.paddingX * 2);

  const height = Math.ceil(
    rows * renderConfig.lineHeight + renderConfig.paddingY * 2,
  );

  // Create the actual canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = renderConfig.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const startX = (canvas.width - columns * charWidth) / 2;
  const startY = (canvas.height - rows * renderConfig.lineHeight) / 2;

  // Text settings
  ctx.font = `${renderConfig.fontSize}px ${renderConfig.fontFamily}`;
  ctx.fillStyle = renderConfig.foreground;
  ctx.textBaseline = "top";

  // Draw ASCII
  let y = renderConfig.paddingY;

  // Glow in ascii characters
  
  // ctx.shadowColor = "#66ccff";
  // ctx.shadowBlur = 12;

  for (const line of lines) {
    ctx.fillText(line, startX, y);
    y += renderConfig.lineHeight;
  }

  // Ensure output directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Save image
  fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));

  console.log(`✅ PNG created: ${outputPath}`);
}

