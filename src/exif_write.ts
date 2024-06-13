import sharp from "npm:sharp";
import { ExifTool } from "npm:exiftool-vendored";
import { setting } from "./settings.ts";

export async function exifWrite(filepath: string) {
  const outputPath = `./${setting.output}/${filepath.split("/").pop()}`;
  const image = sharp(filepath).clone();
  await image.toFile(outputPath);

  const metadata = await new ExifTool().read(outputPath);
  const creationDate = metadata.FileCreateDate ?? metadata.FileModifyDate;
  metadata.DateTimeOriginal = creationDate;
  await new ExifTool().write(outputPath, metadata);
}
