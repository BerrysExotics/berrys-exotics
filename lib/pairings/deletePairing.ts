import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function deletePairing(
  pairingId: number
) {
  // Remove female assignments
  const { error: femaleError } = await supabase
    .from("pairing_females")
    .delete()
    .eq("pairing_id", pairingId);

  if (femaleError) {
    throw femaleError;
  }

  // Delete the pairing
  const { error } = await supabase
    .from("pairings")
    .delete()
    .eq("id", pairingId);

  if (error) {
    throw error;
  }

  return true;
}