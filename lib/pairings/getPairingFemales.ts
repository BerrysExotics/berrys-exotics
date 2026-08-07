import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface PairingMale {
  id: number;
  name: string;
}

export interface PairingFemale {
  id: number;
  name: string;
}

export interface PairingFamily {
  male: PairingMale | null;
  females: PairingFemale[];
}

export async function getPairingFemales(
  pairingId: number
): Promise<PairingFamily> {
  // Get the male
  const { data: pairing, error: pairingError } = await supabase
    .from("pairings")
    .select(`
      male:breeders!pairings_male_id_fkey(
        id,
        name
      )
    `)
    .eq("id", pairingId)
    .single();

  if (pairingError) throw pairingError;

  // Get the females
  const { data: females, error: femaleError } = await supabase
    .from("pairing_females")
    .select(`
      female:breeders(
        id,
        name
      )
    `)
    .eq("pairing_id", pairingId);

  if (femaleError) throw femaleError;

  return {
    male: Array.isArray(pairing?.male)
  ? pairing.male[0] ?? null
  : pairing?.male ?? null,
    females:
      females
        ?.map((row: any) => row.female)
        .filter(Boolean) ?? [],
  };
}