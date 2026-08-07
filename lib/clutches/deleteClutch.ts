import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function deleteClutch(clutchId: number) {
  // Delete eggs first
  const { error: eggError } = await supabase
    .from("eggs")
    .delete()
    .eq("clutch_id", clutchId);

  if (eggError) {
    throw eggError;
  }

  // Delete clutch
  const { error } = await supabase
    .from("clutches")
    .delete()
    .eq("id", clutchId);

  if (error) {
    throw error;
  }

  return true;
}