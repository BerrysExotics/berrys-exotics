import { createClient } from "@/lib/supabase/server";

export async function getHatchlings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hatchlings")
    .select(`
      *,
      clutch:clutches(
        id,
        clutch_number,
        pairing:pairings(
          pairing_name
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}