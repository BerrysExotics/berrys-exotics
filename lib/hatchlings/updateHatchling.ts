import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function updateHatchling(
  id: number,
  form: {
    name: string;
    morph: string;
    sex: string;
    weight: number | null;
    hatch_date: string;
    status: string;
    notes: string;
  }
) {
  const { error } = await supabase
    .from("hatchlings")
    .update({
      name: form.name || null,
      morph: form.morph || null,
      sex: form.sex || null,
      weight: form.weight,
      hatch_date: form.hatch_date || null,
      status: form.status,
      notes: form.notes || null,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
}