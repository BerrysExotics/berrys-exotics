import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function deleteHatchling(
  hatchlingId: number
) {
  // Delete hatchling images first
  const { error: imageError } = await supabase
    .from("hatchling_images")
    .delete()
    .eq("hatchling_id", hatchlingId);

  if (imageError) {
    throw imageError;
  }

  // Delete weight history
  const { error: weightError } = await supabase
    .from("hatchling_weights")
    .delete()
    .eq("hatchling_id", hatchlingId);

  if (weightError) {
    throw weightError;
  }

  // Delete the hatchling
  const { error } = await supabase
    .from("hatchlings")
    .delete()
    .eq("id", hatchlingId);

  if (error) {
    throw error;
  }

  return true;
}