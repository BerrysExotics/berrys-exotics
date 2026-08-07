import { createClient } from "@/lib/supabase/server";

export async function getBreederServer(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("breeders")
    .select(`
      *,
      geckos (
        *,
        gecko_images (
          *
        )
      )
    `)
    .eq("gecko_id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}