import { createClient } from "@/lib/supabase/client";

export async function saveWeight(
  geckoId: string,
  weight: number,
  notes?: string
) {
  const supabase = createClient();

  // Save to weight history
  const { error: historyError } = await supabase
    .from("gecko_weights")
    .insert({
      gecko_id: geckoId,
      weight,
      notes: notes ?? null,
    });

  if (historyError) {
    throw historyError;
  }

  // Update current weight
  const { error: geckoError } = await supabase
    .from("geckos")
    .update({
      weight,
    })
    .eq("id", geckoId);

  if (geckoError) {
    throw geckoError;
  }

  return true;
}