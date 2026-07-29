import { createClient } from "@/lib/supabase/client";
import { GeckoFormData } from "@/types/geckoForm";

export async function createGecko(data: GeckoFormData) {
  const supabase = createClient();

  const { data: gecko, error } = await supabase
    .from("geckos")
    .insert({
      name: data.name,
      nickname: data.nickname,

      species: data.species,
      morph: data.morph,
      sex: data.sex,

      weight: data.weight === "" ? null : Number(data.weight),
      hatch_date: data.hatch_date || null,

      price: data.price === "" ? null : Number(data.price),
      deposit: data.deposit === "" ? 0 : Number(data.deposit),

      status: data.status,
      availability: data.availability,

      featured: data.featured,
      listed: data.listed,
      pet_only: data.pet_only,

      lineage: data.lineage || null,
      breeder: data.breeder || null,
      produced_by: data.produced_by || null,

      sire_id: data.sire_id || null,
      dam_id: data.dam_id || null,

      description: data.description,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return gecko;
}
