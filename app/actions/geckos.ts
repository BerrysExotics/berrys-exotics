"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function setCoverImageAction(
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

  // Get image URL
  const { data: image, error: imageError } = await supabase
    .from("gecko_images")
    .select("image")
    .eq("id", imageId)
    .single();

  if (imageError) {
    throw imageError;
  }

  // Keep geckos table synced
  const { error: geckoError } = await supabase
    .from("geckos")
    .update({
      image: image.image,
    })
    .eq("id", geckoId);

  if (geckoError) {
    throw geckoError;
  }

  revalidatePath("/Admin/inventory");
  revalidatePath(`/Admin/inventory/${geckoId}`);
  revalidatePath(`/Admin/inventory/${geckoId}/gallery`);
  revalidatePath(`/collection/${geckoId}`);
  revalidatePath("/collection");
}

export async function promoteToBreederAction(
  geckoId: string
) {
  const supabase = await createClient();

  // Load gecko
  const { data: gecko, error: geckoError } = await supabase
    .from("geckos")
    .select("*")
    .eq("id", geckoId)
    .single();

  if (geckoError) {
    throw geckoError;
  }

  // Already promoted?
  const {
    data: existing,
    error: existingError,
  } = await supabase
    .from("breeders")
    .select("id")
    .eq("gecko_id", geckoId)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  let breeder = existing;

  if (!existing) {
    const {
      data: newBreeder,
      error: breederError,
    } = await supabase
      .from("breeders")
      .insert({
        gecko_id: gecko.id,
        name: gecko.name,
        species: gecko.species,
        morph: gecko.morph,
        sex: gecko.sex,
        weight: gecko.weight,
        hatch_date: gecko.hatch_date,
        status: "Active",
        description: gecko.description,
        featured: gecko.featured,
        cover_image: gecko.image,
      })
      .select()
      .single();

    if (breederError) {
      throw breederError;
    }

    breeder = newBreeder;
  }

  const { error: updateError } = await supabase
    .from("geckos")
    .update({
      status: "Breeder",
      availability: "Not For Sale",
    })
    .eq("id", geckoId);

  if (updateError) {
    throw updateError;
  }

  revalidatePath("/Admin/inventory");
  revalidatePath(`/Admin/inventory/${geckoId}`);
  revalidatePath("/Admin/breeders");
  revalidatePath("/Admin/breeders/manage");
  revalidatePath("/collection");
  revalidatePath(`/collection/${geckoId}`);

  return breeder;
}