import { extractFrames } from "./extractFrames.js";

async function main() {
  try {
    console.log("🚀 ASCII Video Converter");

    await extractFrames();

    console.log("🎉 Pipeline completed.");
  } catch (error) {
    console.error("❌ Something went wrong:");
    console.error(error);
  }
}

main();