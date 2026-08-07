import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function setCoverImage(
  breederId: number,
  imageId: number
) {
  // Remove current cover
  const { error: resetError } = await supabase
    .from("breeder_images")
    .update({ is_cover: false })
    .eq("breeder_id", breederId);

  if (resetError) throw resetError;

  // Set new cover
  const { error } = await supabase
    .from("breeder_images")
    .update({ is_cover: true })
    .eq("id", imageId);

  if (error) throw error;
}