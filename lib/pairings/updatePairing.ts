import { createClient } from "@/lib/supabase/client";
import { PairingFormData } from "@/types/pairingForm";

const supabase = createClient();

export async function updatePairing(
  pairingId: number,
  form: PairingFormData
) {
  // Update the pairing itself
  const { error: pairingError } = await supabase
    .from("pairings")
    .update({
      group_letter: form.group_letter,
      pairing_name: form.pairing_name,
      season: form.season,
      male_id: form.male_id,
      status: form.status,
      notes: form.notes,
    })
    .eq("id", pairingId);

  if (pairingError) throw pairingError;

  // Remove existing females
  const { error: deleteError } = await supabase
    .from("pairing_females")
    .delete()
    .eq("pairing_id", pairingId);

  if (deleteError) throw deleteError;

  // Re-add selected females
  if (form.female_ids.length > 0) {
    const femaleRows = form.female_ids.map((femaleId) => ({
      pairing_id: pairingId,
      female_id: femaleId,
    }));

    const { error: insertError } = await supabase
      .from("pairing_females")
      .insert(femaleRows);

    if (insertError) throw insertError;
  }
}