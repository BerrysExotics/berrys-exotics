import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface PairingFemale {
  id: number;
  name: string;
}

export interface PairingOption {
  id: number;
  pairing_name: string;
  females: PairingFemale[];
}

export async function getPairingOptions(): Promise<PairingOption[]> {
  const { data, error } = await supabase
    .from("pairings")
    .select(`
      id,
      pairing_name,
      pairing_females(
        female:breeders(
          id,
          name
        )
      )
    `)
    .eq("status", "Active")
    .order("pairing_name", {
      ascending: true,
    });

  if (error) {
    console.error(error);
    throw error;
  }

  return (
    data?.map((pairing: any) => ({
      id: pairing.id,
      pairing_name: pairing.pairing_name,
      females:
        pairing.pairing_females
          ?.map((row: any) => row.female)
          .filter(Boolean) ?? [],
    })) ?? []
  );
}