import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function deleteHatchlingImage(image: any) {
  // Delete from Storage first
  if (image.storage_path) {
    const { error: storageError } = await supabase.storage
      .from("hatchlings")
      .remove([image.storage_path]);

    if (storageError) {
      throw storageError;
    }
  }

  // Delete database record
  const { error } = await supabase
    .from("hatchling_images")
    .delete()
    .eq("id", image.id);

  if (error) {
    throw error;
  }
}