import { createClient } from "@/lib/supabase/client";

export async function getBreederImages(
  breederId: number
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("breeder_images")
    .select("*")
    .eq("breeder_id", breederId)
    .order("sort_order", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}