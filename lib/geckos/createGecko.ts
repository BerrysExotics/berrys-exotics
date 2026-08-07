import { createClient } from "@/lib/supabase/client";
import { GeckoFormData } from "@/types/geckoForm";

export async function createGecko(data: GeckoFormData) {
  const supabase = createClient();

  const { data: gecko, error } = await supabase
    .from("geckos")
    .insert({
      // Internal ID
      animal_id: data.animal_id || null,

      // Basic Information
      name: data.name,
      nickname: data.nickname,

      species: data.species,
      morph: data.morph,
      sex: data.sex,

      weight: data.weight === "" ? null : Number(data.weight),
      hatch_date: data.hatch_date || null,

      // Pricing
      price: data.price === "" ? null : Number(data.price),
      deposit: data.deposit === "" ? 0 : Number(data.deposit),

      // Status
      status: data.status,
      availability: data.availability,

      featured: data.featured,
      listed: data.listed,
      pet_only: data.pet_only,

      // Breeding
      lineage: data.lineage || null,
      breeder: data.breeder || null,
      produced_by: data.produced_by || null,

      sire_id: data.sire_id || null,
      dam_id: data.dam_id || null,

      // Notes
      description: data.description,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return gecko;
}