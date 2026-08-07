import { createClient } from "@/lib/supabase/server";

export async function getPairing(id: number | string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pairings")
    .select(`
      *,
      pairing_females (
        female_id
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return {
    group_letter: data.group_letter,
    pairing_name: data.pairing_name,
    season: data.season,
    male_id: data.male_id,
    female_ids:
      data.pairing_females?.map(
        (f: any) => f.female_id
      ) ?? [],
    status: data.status,
    notes: data.notes,
  };
}