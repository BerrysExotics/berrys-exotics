import { createClient } from "@/lib/supabase/client";
import { HatchlingFormData } from "@/types/hatchlingForm";

const supabase = createClient();

export async function createHatchling(
  form: HatchlingFormData
) {
  const { error } = await supabase
    .from("hatchlings")
    .insert({
      clutch_id: form.clutch_id,
      hatchling_number: form.hatchling_number,
      name: form.name,
      morph: form.morph,
      sex: form.sex,
      hatch_date: form.hatch_date || null,
      weight: form.weight || null,
      status: form.status,
      notes: form.notes,
    });

  if (error) {
    console.error("SUPABASE ERROR:", error);
    alert(JSON.stringify(error, null, 2));
    throw error;
  }
}