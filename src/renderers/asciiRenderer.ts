import { createCanvas } from "canvas";
import fs from "node:fs";
import type { RendererOptions } from "../types/renderer.js";
import { renderConfig } from "../config/renderConfig.js";

export async function renderAscii({ ascii, outputPath }: RendererOptions) {
  // Split ASCII into lines FIRST
  const lines = ascii.split("\n");

  // Now we know rows and columns
  const rows = lines.length;
  const columns = lines[0]?.length ?? 0;

  // Calculate canvas size
  const width = columns * renderConfig.charWidth + renderConfig.paddingX * 2;

  const height = rows * renderConfig.lineHeight + renderConfig.paddingY * 2;

  // Create canvas
  const canvas = createCanvas(width, height);

  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = renderConfig.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  ctx.font = `${renderConfig.fontSize}px ${renderConfig.fontFamily}`;
  ctx.fillStyle = renderConfig.foreground;

  let y = renderConfig.paddingY;
  for (const line of lines) {
    ctx.fillText(line, renderConfig.paddingX, y);

    y += renderConfig.lineHeight;
  }

  console.log(lines.length);
  console.log(lines[0]);
  console.log(lines[1]);

  // Save image
  fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));

  console.log("✅ PNG created: output/test.png");
}
