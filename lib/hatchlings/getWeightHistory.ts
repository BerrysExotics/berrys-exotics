import { createClient } from "@/lib/supabase/server";

export async function getWeightHistory(
  hatchlingId: number
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hatchling_weights")
    .select("*")
    .eq("hatchling_id", hatchlingId)
    .order("recorded_at", {
      ascending: true,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}