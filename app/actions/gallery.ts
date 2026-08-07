"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function setCoverImage(
  geckoId: string,
  imageId: number
) {
  const supabase = await createClient();

  // Remove current cover
  const { error: clearError } = await supabase
    .from("gecko_images")
    .update({
      is_cover: false,
    })
    .eq("gecko_id", geckoId);

  if (clearError) {
    throw clearError;
  }

  // Set new cover
  const { error: coverError } = await supabase
    .from("gecko_images")
    .update({
      is_cover: true,
    })
    .eq("id", imageId);

  if (coverError) {
    throw coverError;
  }

  revalidatePath(`/Admin/inventory/${geckoId}/gallery`);
  revalidatePath(`/Admin/inventory/${geckoId}`);
  revalidatePath(`/collection/${geckoId}`);
}

export async function deleteGalleryImage(
  geckoId: string,
  imageId: number,
  imageUrl: string
) {
  const supabase = await createClient();

  // Extract storage path from the public URL
  const marker = "/geckos/";
  const index = imageUrl.indexOf(marker);

  if (index !== -1) {
    const storagePath = imageUrl.substring(index + marker.length);

    await supabase.storage
      .from("geckos")
      .remove([storagePath]);
  }

  const { error } = await supabase
    .from("gecko_images")
    .delete()
    .eq("id", imageId);

  if (error) {
    throw error;
  }

  revalidatePath(`/Admin/inventory/${geckoId}/gallery`);
  revalidatePath(`/Admin/inventory/${geckoId}`);
  revalidatePath(`/collection/${geckoId}`);
}