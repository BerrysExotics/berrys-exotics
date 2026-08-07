import { createClient } from "@/lib/supabase/server";

export interface GeckoWeight {
  id: number;
  weight: number;
  recorded_at: string;
  notes: string | null;
}

export async function getWeightHistory(
  geckoId: string
): Promise<GeckoWeight[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gecko_weights")
    .select("*")
    .eq("gecko_id", geckoId)
    .order("recorded_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}