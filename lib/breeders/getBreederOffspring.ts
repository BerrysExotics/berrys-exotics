import { createClient } from "@/lib/supabase/server";

export async function getBreederOffspring(name: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("geckos")
    .select(`
      id,
      name,
      morph,
      sex,
      status,
      price,
      featured,
      gecko_images (
        image,
        sort_order
      ),
      sire,
      dam
    `)
    .or(`sire.eq.${name},dam.eq.${name}`)
    .order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}