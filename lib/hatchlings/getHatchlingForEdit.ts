import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getHatchlingForEdit(
  id: number
) {
  const { data, error } = await supabase
    .from("hatchlings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}