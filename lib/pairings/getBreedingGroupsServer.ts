import { createClient } from "@/lib/supabase/server";

export async function getBreedingGroupsServer() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pairings")
    .select(`
      *,
      male:breeders!pairings_male_id_fkey (
        id,
        gecko_id,
        name,
        species,
        morph,
        weight,
        status,
        geckos (
          gecko_images (
            image,
            is_cover
          )
        )
      ),
      pairing_females (
        female:breeders (
          id,
          gecko_id,
          name,
          species,
          morph,
          weight,
          status,
          geckos (
            gecko_images (
              image,
              is_cover
            )
          )
        )
      )
    `)
    .order("group_letter");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}