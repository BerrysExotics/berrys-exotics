import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface ClutchOption {
  id: number;
  clutch_number: number;
  pairing: {
    pairing_name: string;
  };
}

export async function getClutchOptions(): Promise<ClutchOption[]> {
  const { data, error } = await supabase
    .from("clutches")
    .select(`
      id,
      clutch_number,
      pairing:pairings(
        pairing_name
      )
    `)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  return (data ?? []) as unknown as ClutchOption[];
}