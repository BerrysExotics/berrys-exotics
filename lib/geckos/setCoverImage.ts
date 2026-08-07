import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function setCoverImage(
  geckoId: string,
  imageId: number
) {
  // Remove the current cover image
  const { error: clearError } = await supabase
    .from("gecko_images")
    .update({
      is_cover: false,
    })
    .eq("gecko_id", geckoId);

  if (clearError) {
    throw clearError;
  }

  // Set the new cover image
  const { error: coverError } = await supabase
    .from("gecko_images")
    .update({
      is_cover: true,
    })
    .eq("id", imageId);

  if (coverError) {
    throw coverError;
  }

  // Update the geckos table so the main image stays in sync
  const { data: image, error: imageError } = await supabase
    .from("gecko_images")
    .select("image")
    .eq("id", imageId)
    .single();

  if (imageError) {
    throw imageError;
  }

  const { error: geckoError } = await supabase
    .from("geckos")
    .update({
      image: image.image,
    })
    .eq("id", geckoId);

  if (geckoError) {
    throw geckoError;
  }
}