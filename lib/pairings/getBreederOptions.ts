import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getBreederOptions() {
  const { data, error } = await supabase
    .from("breeders")
    .select(`
      id,
      name,
      sex
    `);

  if (error) {
    console.error(error);
    throw error;
  }

  const breeders = data ?? [];

  return {
    males: breeders.filter((b) => b.sex === "Male"),
    females: breeders.filter((b) => b.sex === "Female"),
  };
}