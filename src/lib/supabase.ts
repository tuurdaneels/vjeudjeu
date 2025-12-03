import { createClient } from "@supabase/supabase-js";

// Supabase configuratie
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase configuratie ontbreekt. Zorg dat VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY zijn ingesteld in .env");
}

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

