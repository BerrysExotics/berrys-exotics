import { createClient } from "@/lib/supabase/server";

export async function getHatchlingImages(
  hatchlingId: number
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hatchling_images")
    .select("*")
    .eq("hatchling_id", hatchlingId)
    .order("sort_order", {
      ascending: true,
    });

  console.log("Images Query:", data);
  console.log("Images Error:", error);

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}