import { createClient } from "@/lib/supabase/server";

export async function getClutches() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clutches")
    .select(`
      *,
      pairing:pairings(
        id,
        pairing_name
      ),
      eggs(
        id,
        egg_number,
        status,
        hatch_date,
        expected_hatch_date,
        notes
      )
    `)
    .order("laid_date", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}