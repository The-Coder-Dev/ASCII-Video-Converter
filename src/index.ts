import { imageToAscii } from "./converters/imageToAscii.js";
import { renderAscii } from "./renderers/asciiRenderer.js";

async function main() {
  const ascii = await imageToAscii(
    "frames/frame-0001.png"
  );

  await renderAscii({
    ascii,
    outputPath: "output/frame-0001.png",
  });

  console.log("Done!");
}

main();