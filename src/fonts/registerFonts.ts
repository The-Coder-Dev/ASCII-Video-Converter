import { GlobalFonts } from "@napi-rs/canvas";
import path from "node:path";
import fs from "node:fs";

const fontPath = path.resolve(process.cwd(), "assets/fonts/JetBrainsMono-Regular.ttf");
if (fs.existsSync(fontPath)) {
  GlobalFonts.registerFromPath(fontPath, "JetBrains Mono");
}