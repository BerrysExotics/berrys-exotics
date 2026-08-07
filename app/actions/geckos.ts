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
  console.log("========== PROMOTE START ==========");
  console.log("Incoming Gecko ID:", geckoId);

  const supabase = await createClient();

  // Load gecko
  const { data: gecko, error: geckoError } = await supabase
    .from("geckos")
    .select("*")
    .eq("id", geckoId)
    .single();

  console.log("GECKO:");
  console.log(gecko);
  console.log("GECKO ERROR:");
  console.log(geckoError);

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

  console.log("EXISTING BREEDER:");
  console.log(existing);
  console.log("EXISTING ERROR:");
  console.log(existingError);

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    console.log("Already exists.");
    return existing;
  }

  console.log("INSERTING BREEDER...");

  const {
    data: breeder,
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

  console.log("BREEDER:");
  console.log(breeder);
  console.log("BREEDER ERROR:");
  console.log(breederError);

  if (breederError) {
    throw breederError;
  }

  console.log("UPDATING GECKO STATUS...");

  const { error: updateError } = await supabase
    .from("geckos")
    .update({
      status: "Breeder",
      availability: "Not For Sale",
    })
    .eq("id", geckoId);

  console.log("UPDATE ERROR:");
  console.log(updateError);

  if (updateError) {
    throw updateError;
  }

  console.log("REVALIDATING...");

  revalidatePath("/Admin/inventory");
  revalidatePath(`/Admin/inventory/${geckoId}`);
  revalidatePath("/Admin/breeders");
  revalidatePath("/Admin/breeders/manage");
  revalidatePath("/collection");
  revalidatePath(`/collection/${geckoId}`);

  console.log("========== PROMOTE COMPLETE ==========");

  return breeder;
}