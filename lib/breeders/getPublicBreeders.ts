import { createClient } from "@/lib/supabase/server";

export async function getPublicBreeders() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("breeders")
    .select(`
      *,
      breeder_images (
        image_url,
        is_cover
      )
    `)
    .eq("status", "Active")
    .order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}