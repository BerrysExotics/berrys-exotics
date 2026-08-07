import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function setCoverImage(
  hatchlingId: number,
  imageId: number
) {
  // Remove existing cover image
  const { error: clearError } = await supabase
    .from("hatchling_images")
    .update({
      is_cover: false,
    })
    .eq("hatchling_id", hatchlingId);

  if (clearError) {
    throw clearError;
  }

  // Set new cover image
  const { error: coverError } = await supabase
    .from("hatchling_images")
    .update({
      is_cover: true,
    })
    .eq("id", imageId);

  if (coverError) {
    throw coverError;
  }
}