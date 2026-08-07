import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function hatchClutch(
  clutchId: number,
  hatchlings: number,
  hatchDate: string
) {
  // Get the clutch
  const { data: clutch, error: clutchError } = await supabase
    .from("clutches")
    .select("*")
    .eq("id", clutchId)
    .single();

  if (clutchError) throw clutchError;

  // Find the current highest hatchling number
  const { data: existing, error: existingError } = await supabase
    .from("hatchlings")
    .select("hatchling_number")
    .order("hatchling_number", {
      ascending: false,
    })
    .limit(1);

  if (existingError) throw existingError;

  const nextNumber =
    existing && existing.length > 0
      ? existing[0].hatchling_number + 1
      : 1;

  const babies = [];

  for (let i = 0; i < hatchlings; i++) {
    babies.push({
      clutch_id: clutchId,

      hatchling_number: nextNumber + i,

      hatch_date: hatchDate,

      status: "Growing",

      weight: 0,

      morph: "Unknown",

      sex: "Unknown",

      notes: "",
    });
  }

  const { error: insertError } = await supabase
    .from("hatchlings")
    .insert(babies);

  if (insertError) throw insertError;

  const { error: updateError } = await supabase
    .from("clutches")
    .update({
      status: "Hatched",
      actual_hatch: hatchDate,
    })
    .eq("id", clutchId);

  if (updateError) throw updateError;

  return babies;
}