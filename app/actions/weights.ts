"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function addWeightAction(
  geckoId: string,
  weight: number,
  notes?: string
) {
  const supabase = await createClient();

  // Save weight history
  const { error: historyError } = await supabase
    .from("gecko_weights")
    .insert({
      gecko_id: geckoId,
      weight,
      notes: notes || null,
    });

  if (historyError) {
    throw historyError;
  }

  // Update current weight on gecko
  const { error: geckoError } = await supabase
    .from("geckos")
    .update({
      weight,
    })
    .eq("id", geckoId);

  if (geckoError) {
    throw geckoError;
  }

  // Refresh all affected pages
  revalidatePath("/Admin/inventory");
  revalidatePath(`/Admin/inventory/${geckoId}`);
  revalidatePath(`/collection/${geckoId}`);
}