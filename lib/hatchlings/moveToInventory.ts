import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function moveToInventory(hatchlingId: number) {
  // -----------------------------
  // Load Hatchling
  // -----------------------------

  const { data: hatchling, error: hatchlingError } = await supabase
    .from("hatchlings")
    .select("*")
    .eq("id", hatchlingId)
    .single();

  if (hatchlingError) throw hatchlingError;

  // -----------------------------
  // Load Clutch
  // -----------------------------

  const { data: clutch, error: clutchError } = await supabase
    .from("clutches")
    .select("pairing_id")
    .eq("id", hatchling.clutch_id)
    .single();

  if (clutchError) throw clutchError;

  // -----------------------------
  // Load Pairing
  // -----------------------------

  const { data: pairing, error: pairingError } = await supabase
    .from("pairings")
    .select("male_id, female_id")
    .eq("id", clutch.pairing_id)
    .single();

  if (pairingError) throw pairingError;

  // -----------------------------
  // Load Male Breeder
  // -----------------------------

  const { data: sireBreeder, error: sireError } = await supabase
    .from("breeders")
    .select("gecko_id")
    .eq("id", pairing.male_id)
    .single();

  if (sireError) throw sireError;

  // -----------------------------
  // Load Female Breeder
  // -----------------------------

  const { data: damBreeder, error: damError } = await supabase
    .from("breeders")
    .select("gecko_id")
    .eq("id", pairing.female_id)
    .single();

  if (damError) throw damError;

  // -----------------------------
  // Load Hatchling Images
  // -----------------------------

  const { data: images, error: imageError } = await supabase
    .from("hatchling_images")
    .select("*")
    .eq("hatchling_id", hatchlingId)
    .order("sort_order");

  if (imageError) throw imageError;

  // -----------------------------
  // Create Inventory Gecko
  // -----------------------------

  const { data: gecko, error: geckoError } = await supabase
    .from("geckos")
    .insert({
      name: hatchling.name,
      species: "Crested Gecko",
      morph: hatchling.morph,
      sex: hatchling.sex,

      hatch_date: hatchling.hatch_date,
      weight: hatchling.weight,

      description: hatchling.notes,

      image: images?.[0]?.image_url ?? null,

      hatchling_id: hatchling.id,

      // Automatically preserve pedigree
      sire_id: sireBreeder.gecko_id,
      dam_id: damBreeder.gecko_id,

      status: "Available",
      availability: "Available",
      listed: true,
    })
    .select()
    .single();

  if (geckoError) throw geckoError;
    // -----------------------------
  // Copy Gallery Images
  // -----------------------------

  if (images?.length) {
    const gallery = images.map((img: any, index: number) => ({
      gecko_id: gecko.id,
      image: img.image_url,
      sort_order: index,
      is_cover: index === 0,
    }));

    const { error: galleryError } = await supabase
      .from("gecko_images")
      .insert(gallery);

    if (galleryError) throw galleryError;
  }

  // -----------------------------
  // Mark Hatchling As Transferred
  // -----------------------------

  const { error: updateError } = await supabase
    .from("hatchlings")
    .update({
      transferred: true,
      gecko_id: gecko.id,
      status: "Transferred",
    })
    .eq("id", hatchlingId);

  if (updateError) throw updateError;

  return gecko;
}