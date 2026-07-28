import { imageToAscii } from "./converters/imageToAscii.js";

async function main() {
  const ascii = await imageToAscii(
    "frames/frame-0001.png"
  );

  console.log(ascii);
}

main();