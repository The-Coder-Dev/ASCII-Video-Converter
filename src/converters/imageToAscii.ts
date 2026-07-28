import sharp from "sharp";

export async function imageToAscii(imagePath: string) {
  // Resize image to make ASCII manageable
  const image = sharp(imagePath).resize({
    width: 100,
  });

  // Get raw pixel data
  const { data, info } = await image
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const chars = " .·°○◌●@";

  let ascii = "";

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const index = (y * info.width + x) * info.channels;

      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      const brightness =
        0.299 * r +
        0.587 * g +
        0.114 * b;

      const charIndex = Math.floor(
        (brightness / 255) * (chars.length - 1)
      );

      ascii += chars[charIndex];
    }

    ascii += "\n";
  }

  return ascii;
}