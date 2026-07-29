import { createClient } from "@/lib/supabase/client";
import type { Gecko } from "@/types/gecko";

export async function getGecko(id: string): Promise<Gecko> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("geckos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as Gecko;
}