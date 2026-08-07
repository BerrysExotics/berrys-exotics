import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getBreeders() {
  const { data, error } = await supabase
    .from("breeders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getBreeder(id: number) {
  const { data, error } = await supabase
    .from("breeders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}