import { createClient } from "@/lib/supabase/server";

export async function getHatchling(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hatchlings")
    .select(`
      *,
      clutch:clutches(
        id,
        clutch_number,
        laid_date,
        pairing:pairings(
          id,
          pairing_name,
          group_letter,

          male:breeders!pairings_male_id_fkey(
            id,
            name,
            morph,
            species,
            weight
          ),

          pairing_females(
            female:breeders(
              id,
              name,
              morph,
              species,
              weight
            )
          )
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}