import { execa } from "execa";
import { config } from "./config.js";

export async function extractFrames() {
  console.log("🎞 Extracting frames...");

  await execa("ffmpeg", [
    "-y",
    "-i",
    config.inputVideo,
    "-vf",
    `fps=${config.fps}`,
    `${config.framesDir}/frame-%04d.png`,
  ]);

  console.log("✅ Frames extracted successfully!");
}