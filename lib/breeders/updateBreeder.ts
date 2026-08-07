import { createClient } from "@/lib/supabase/client";
import { BreederFormData } from "@/types/breederForm";

export async function updateBreeder(
  id: number,
  form: BreederFormData
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("breeders")
    .update({
      name: form.name,
      species: form.species,
      sex: form.sex,
      morph: form.morph,
      weight: form.weight ? Number(form.weight) : null,
      hatch_date: form.hatch_date || null,
      status: form.status,
      description: form.description,
      featured: form.featured,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}