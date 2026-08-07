"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

function revalidateHatchlingPages(hatchlingId: number) {
  revalidatePath("/Admin/hatchlings");
  revalidatePath(`/Admin/hatchlings/${hatchlingId}`);
  revalidatePath(`/Admin/hatchlings/${hatchlingId}/gallery`);
  revalidatePath("/Admin/geckos");
}

export async function deleteHatchlingImageAction(
  imageId: number,
  storagePath: string,
  hatchlingId: number
) {
  const supabase = await createClient();

  if (storagePath) {
    const { error: storageError } = await supabase.storage
      .from("hatchlings")
      .remove([storagePath]);

    if (storageError) throw storageError;
  }

  const { error } = await supabase
    .from("hatchling_images")
    .delete()
    .eq("id", imageId);

  if (error) throw error;

  revalidateHatchlingPages(hatchlingId);
}

export async function setCoverImageAction(
  hatchlingId: number,
  imageId: number
) {
  const supabase = await createClient();

  const { error: clearError } = await supabase
    .from("hatchling_images")
    .update({ is_cover: false })
    .eq("hatchling_id", hatchlingId);

  if (clearError) throw clearError;

  const { error: coverError } = await supabase
    .from("hatchling_images")
    .update({ is_cover: true })
    .eq("id", imageId);

  if (coverError) throw coverError;

  revalidateHatchlingPages(hatchlingId);
}

export async function moveToInventoryAction(
  hatchlingId: number
) {
  const supabase = await createClient();

  const { data: hatchling, error: hatchlingError } =
    await supabase
      .from("hatchlings")
      .select("*")
      .eq("id", hatchlingId)
      .single();

  if (hatchlingError) throw hatchlingError;

  if (hatchling.transferred) {
    throw new Error("This hatchling has already been transferred.");
  }

  const { data: images, error: imagesError } =
    await supabase
      .from("hatchling_images")
      .select("*")
      .eq("hatchling_id", hatchlingId)
      .order("sort_order");

  if (imagesError) throw imagesError;

  const { data: gecko, error: geckoError } =
    await supabase
      .from("geckos")
      .insert({
        name: hatchling.name,
        species: hatchling.species ?? "Crested Gecko",
        morph: hatchling.morph,
        sex: hatchling.sex,
        hatch_date: hatchling.hatch_date,
        weight: hatchling.weight,
        description: hatchling.notes,
        image: images?.[0]?.image_url ?? null,
        status: "Available",
        availability: "Available",
        listed: true,
      })
      .select()
      .single();

  if (geckoError) throw geckoError;

  if (images && images.length > 0) {
    const gallery = images.map((img: any, index: number) => ({
      gecko_id: gecko.id,
      image: img.image_url,
      sort_order: index,
      is_cover: img.is_cover ?? index === 0,
    }));

    const { error: galleryError } =
      await supabase
        .from("gecko_images")
        .insert(gallery);

    if (galleryError) throw galleryError;
  }

  const { error: updateError } =
    await supabase
      .from("hatchlings")
      .update({
        transferred: true,
        gecko_id: gecko.id,
      })
      .eq("id", hatchlingId);

  if (updateError) throw updateError;

  revalidateHatchlingPages(hatchlingId);

  return gecko.id;
}