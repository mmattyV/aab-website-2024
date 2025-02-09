// app/lib/convertHeic.ts
import sharp from "sharp";

/**
 * Reads a File (from FormData) and returns a Buffer + contentType
 * If it’s .heic/.heif, we convert to .jpg via Sharp
 */
export async function maybeConvertHeicToJpg(file: File) {
  // Convert the File’s ArrayBuffer to a Node Buffer
  const originalBuffer = Buffer.from(await file.arrayBuffer());

  // Grab file extension from `file.name`
  const extMatch = file.name.match(/\.(\w+)$/i);
  const ext = extMatch ? extMatch[1].toLowerCase() : null;

  // Check extension or MIME type
  const isHeic =
    ext === "heic" ||
    ext === "heif" ||
    file.type === "image/heic" ||
    file.type === "image/heif";

  if (!isHeic) {
    // Not a HEIC/HEIF file → return original
    return {
      buffer: originalBuffer,
      contentType: file.type, // e.g. image/jpeg, image/png, etc.
      fileName: file.name,    // unchanged
    };
  }

  // Convert HEIC/HEIF to JPEG (quality=90 is just an example)
  const convertedBuffer = await sharp(originalBuffer).jpeg({ quality: 90 }).toBuffer();

  // Replace extension with .jpg
  const newFileName = file.name.replace(/\.(heic|heif)$/i, ".jpg");

  return {
    buffer: convertedBuffer,
    contentType: "image/jpeg",
    fileName: newFileName,
  };
}