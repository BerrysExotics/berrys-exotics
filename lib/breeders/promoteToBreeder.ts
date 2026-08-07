import { createClient } from "@/lib/supabase/client";

export async function promoteToBreeder(geckoId: string) {
  const supabase = createClient();

  // Check if breeder already exists
  const { data: existing, error: existingError } = await supabase
    .from("breeders")
    .select("id")
    .eq("gecko_id", geckoId)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    return existing.id;
  }

  // Create breeder
  const { data, error } = await supabase
    .from("breeders")
    .insert({
      gecko_id: geckoId,
      status: "Active",
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data.id;
}