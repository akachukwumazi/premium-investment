import { client } from "./sanity";

export async function uploadImage(file, options = {}) {
  if (!file) throw new Error("No file provided");

  // Optional file validation
  if (!file.type?.startsWith("image/")) {
    throw new Error("Invalid file type. Only images are allowed.");
  }

  const maxSize = options.maxSize || 5 * 1024 * 1024; // 5MB default
  if (file.size > maxSize) {
    throw new Error("File too large. Max 5MB allowed.");
  }

  // Convert to buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Sanity as an image asset
  const uploadedImage = await client.assets.upload("image", buffer, {
    filename: file.name || "proof_image.jpg",
    contentType: file.type,
  });

  // Return Sanity reference
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: uploadedImage._id,
    },
  };
}






// import { client } from "./sanity";
// import { v4 as uuid } from "uuid";

// export async function uploadImageToSanity(file, slug) {
//   if (!file) throw new Error("No image file provided");
//   try {
//     const filename = `${slug}-${uuid()}`;
//     const uploaded = await client.assets.upload("image", file, { filename });
//     return uploaded._id;
//   } catch (err) {
//     console.error("Sanity image upload error:", err);
//     throw new Error("Failed to upload image");
//   }
// }
