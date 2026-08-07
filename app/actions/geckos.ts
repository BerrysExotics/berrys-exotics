"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function setCoverImageAction(
  geckoId: string,
  imageId: number
) {
  const supabase = await createClient();

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

  // Set the selected image as cover
  const { error: coverError } = await supabase
    .from("gecko_images")
    .update({
      is_cover: true,
    })
    .eq("id", imageId);

  if (coverError) {
    throw coverError;
  }

  // Get the image URL
  const { data: image, error: imageError } = await supabase
    .from("gecko_images")
    .select("image")
    .eq("id", imageId)
    .single();

  if (imageError) {
    throw imageError;
  }

  // Keep the geckos table in sync
  const { error: geckoError } = await supabase
    .from("geckos")
    .update({
      image: image.image,
    })
    .eq("id", geckoId);

  if (geckoError) {
    throw geckoError;
  }

  // Refresh affected pages
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

  // Get the gecko
  const { data: gecko, error: geckoError } = await supabase
    .from("geckos")
    .select("*")
    .eq("id", geckoId)
    .single();

  if (geckoError) {
    throw geckoError;
  }

  // Make sure this gecko isn't already a breeder
  const { data: existing, error: existingError } =
    await supabase
      .from("breeders")
      .select("id")
      .eq("gecko_id", geckoId)
      .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    return existing;
  }

  // Create linked breeder profile
  const { data: breeder, error: breederError } =
    await supabase
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

  // Update the gecko so it becomes a breeder
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

  // Refresh pages
  revalidatePath("/Admin/inventory");
  revalidatePath(`/Admin/inventory/${geckoId}`);

  revalidatePath("/Admin/breeders");
  revalidatePath("/Admin/breeders/manage");

  revalidatePath("/collection");
  revalidatePath(`/collection/${geckoId}`);

  return breeder;
}