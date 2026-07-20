import { supabase } from "./supabase";

export type MenuCategory = "lunch" | "diner" | "suggesties";

const BUCKET_NAME = "menu-images";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

/**
 * Supabase Storage accepteert alleen "veilige" object keys: spaties, accenten
 * (café), haakjes en andere leestekens leiden tot een "Invalid key"-fout of tot
 * URL's die stuk gaan. Foto's van een telefoon of Mac heten vaak
 * "Menu Café (1).JPG", dus we maken de naam eerst schoon.
 */
const sanitizeFileName = (name: string): string => {
  const lastDot = name.lastIndexOf(".");
  const rawBase = lastDot > 0 ? name.slice(0, lastDot) : name;
  const rawExt = lastDot > 0 ? name.slice(lastDot + 1) : "";

  const base = rawBase
    .normalize("NFD") // "café" -> "cafe" + los accent-teken
    .replace(/[\u0300-\u036f]/g, "") // accenten weg
    .replace(/[^a-zA-Z0-9]+/g, "-") // rest -> streepje
    .replace(/^-+|-+$/g, "") // streepjes aan de randen weg
    .toLowerCase()
    .slice(0, 60);

  const ext = rawExt.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";

  return `${base || "foto"}.${ext}`;
};

/**
 * Upload een afbeelding naar Supabase Storage
 */
export const uploadImage = async (
  file: File,
  category: MenuCategory
): Promise<string> => {
  if (!file.type.startsWith("image/")) {
    throw new Error(`"${file.name}" is geen afbeelding.`);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `"${file.name}" is te groot (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximaal 10 MB.`
    );
  }

  // Timestamp + random suffix: bij het uploaden van meerdere foto's tegelijk
  // kan Date.now() identiek zijn, wat met upsert:false een botsing geeft.
  const uniquePrefix = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const filePath = `${category}/${uniquePrefix}_${sanitizeFileName(file.name)}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw new Error(`Upload van "${file.name}" mislukt: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};

/**
 * Upload meerdere afbeeldingen.
 *
 * Bewust geen Promise.all: als één foto faalt, moeten de andere gewoon
 * doorgaan. De opgetelde fouten worden aan het eind gemeld, zodat een
 * gedeeltelijk geslaagde upload niet als "alles mislukt" oogt.
 */
export const uploadMultipleImages = async (
  files: File[],
  category: MenuCategory
): Promise<{ urls: string[]; errors: string[] }> => {
  const results = await Promise.allSettled(
    files.map((file) => uploadImage(file, category))
  );

  const urls: string[] = [];
  const errors: string[] = [];

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      urls.push(result.value);
    } else {
      errors.push(
        result.reason instanceof Error
          ? result.reason.message
          : String(result.reason)
      );
    }
  });

  return { urls, errors };
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

    // Get public URLs for all files and append a version query param.
    // This prevents stale browser cache when a file is updated in place.
    //
    // Supabase maakt in een lege map een verborgen ".emptyFolderPlaceholder"
    // aan. Die komt gewoon mee in list() maar is geen echte foto: zonder deze
    // filter verschijnt er een gebroken afbeelding op de menupagina's. Een
    // placeholder herken je aan id === null.
    const urls = data
      .filter(
        (file) =>
          !!file.name && file.id !== null && file.name !== ".emptyFolderPlaceholder"
      )
      .map((file) => {
        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(`${category}/${file.name}`);

        const url = new URL(urlData.publicUrl);
        url.searchParams.set("v", file.updated_at || file.created_at || file.name);
        return url.toString();
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
    const encodedPath = pathParts.slice(publicIndex + 2).join("/");
    const path = decodeURIComponent(encodedPath);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      console.error("Error deleting image:", error);
      throw error;
    }

    // Supabase geeft geen error als een DELETE-policy ontbreekt: het
    // verwijdert simpelweg niets en geeft een lege lijst terug. Dat zou
    // er anders uitzien als een geslaagde verwijdering terwijl de foto
    // blijft staan, dus controleren we dat hier expliciet.
    if (!data || data.length === 0) {
      throw new Error(
        `Verwijderen mislukt: geen rechten om "${path}" te verwijderen. ` +
          `Controleer de DELETE-policy op de "${BUCKET_NAME}" bucket in Supabase.`
      );
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

