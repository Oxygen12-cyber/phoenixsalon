import crypto from "node:crypto";

const FOLDER = "phoenix-salon/products";

/**
 * Uploads an image to Cloudinary with a signed request.
 * Server-only: uses CLOUDINARY_API_SECRET.
 */
export async function uploadImage(file: File): Promise<string> {
  const cloud = process.env.CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud || !apiKey || !apiSecret) {
    throw new Error("Cloudinary env vars are missing (CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET).");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto
    .createHash("sha1")
    .update(`folder=${FOLDER}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", apiKey);
  body.append("timestamp", String(timestamp));
  body.append("folder", FOLDER);
  body.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
    { method: "POST", body },
  );

  if (!res.ok) {
    throw new Error(`Cloudinary upload failed (${res.status}): ${await res.text()}`);
  }

  const data = (await res.json()) as { secure_url: string };
  return data.secure_url;
}
