import { createCanvas } from "canvas";
import fs from "node:fs";
import type { RendererOptions } from "../types/renderer.js";

export async function renderAscii({ ascii, outputPath }: RendererOptions) {
  const canvas = createCanvas(1200, 1200);

  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text
  ctx.font = "16px monospace";
  ctx.fillStyle = "#FFFFFF";

  const lines = ascii.split("\n");

  let y = 50;
  for (const line of lines) {
    ctx.fillText(line, 20, y);

    y += 18;
  }

  console.log(lines.length);
  console.log(lines[0]);
  console.log(lines[1]);

  // Save image
  fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));

  console.log("✅ PNG created: output/test.png");
}
