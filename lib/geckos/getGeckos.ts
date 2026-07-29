import { createClient } from "@/lib/supabase/client";
import type { Gecko } from "@/types/gecko";

export async function getGeckos(): Promise<Gecko[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("geckos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Gecko[];
}