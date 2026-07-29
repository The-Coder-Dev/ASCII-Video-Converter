import fg from "fast-glob";

export async function getFrames() {
  return await fg("frames/*.png", {
    absolute: true,
  });
}