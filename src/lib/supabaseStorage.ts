import { supabase } from "./supabase";

export type MenuCategory = "lunch" | "diner" | "suggesties";

const BUCKET_NAME = "menu-images";

/**
 * Upload een afbeelding naar Supabase Storage
 */
export const uploadImage = async (
  file: File,
  category: MenuCategory
): Promise<string> => {
  const timestamp = Date.now();
  const fileName = `${category}/${timestamp}_${file.name}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};

/**
 * Upload meerdere afbeeldingen
 */
export const uploadMultipleImages = async (
  files: File[],
  category: MenuCategory
): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadImage(file, category));
  return Promise.all(uploadPromises);
};

/**
 * Haal alle afbeeldingen op voor een categorie
 */
export const getImages = async (category: MenuCategory): Promise<string[]> => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(category, {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "asc" },
      });

    if (error) {
      console.error("Error fetching images:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Get public URLs for all files
    const urls = data.map((file) => {
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(`${category}/${file.name}`);
      return urlData.publicUrl;
    });

    return urls;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

/**
 * Verwijder een afbeelding
 */
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract the path from the URL
    // Supabase URL format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split("/").filter(p => p); // Remove empty strings
    
    // Find index of "public" in the path
    const publicIndex = pathParts.indexOf("public");
    
    if (publicIndex === -1) {
      throw new Error("Invalid Supabase Storage URL");
    }

    // Path is everything after "public/[bucket]/"
    // We know bucket is at publicIndex + 1, so path starts at publicIndex + 2
    const path = pathParts.slice(publicIndex + 2).join("/");

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

