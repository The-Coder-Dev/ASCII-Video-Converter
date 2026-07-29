import { imageToAscii } from "./converters/imageToAscii.js";
import { renderAscii } from "./renderers/asciiRenderer.js";
import { getFrames } from "./utils/getFrames.js";
import path from "node:path";

async function main() {
  const frames = await getFrames();

  console.log(`Found ${frames.length} frames`);

  for (const frame of frames) {
    const ascii = await imageToAscii(frame);

    const filename = path.basename(frame);

    await renderAscii({
      ascii,
      outputPath: `output/${filename}`,
    });

    console.log(`✓ ${filename}`);
  }

  console.log("🎉 All frames rendered");
}

main();