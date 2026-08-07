import { createClient } from "@/lib/supabase/client";
import { PairingFormData } from "@/types/pairingForm";

const supabase = createClient();

export async function createPairing(
  form: PairingFormData
) {
  // Get the next available group letter
  const { data: groupLetter, error: groupError } =
    await supabase.rpc("next_group_letter");

  if (groupError) throw groupError;

  // Primary female (used for pedigree)
  const primaryFemale =
    form.female_ids.length > 0
      ? form.female_ids[0]
      : null;

  // Create breeding group
  const { data: pairing, error: pairingError } =
    await supabase
      .from("pairings")
      .insert({
        group_letter: groupLetter,
        pairing_name: form.pairing_name,

        male_id: form.male_id,
        female_id: primaryFemale,

        status: form.status,
        notes: form.notes,
      })
      .select("id")
      .single();

  if (pairingError) throw pairingError;

  // Store all females
  if (form.female_ids.length > 0) {
    const femaleRows = form.female_ids.map(
      (femaleId) => ({
        pairing_id: pairing.id,
        female_id: femaleId,
      })
    );

    const { error: femalesError } =
      await supabase
        .from("pairing_females")
        .insert(femaleRows);

    if (femalesError) throw femalesError;
  }

  return pairing;
}