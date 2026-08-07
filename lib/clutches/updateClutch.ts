import { createClient } from "@/lib/supabase/client";
import { ClutchFormData } from "@/types/clutchForm";

const supabase = createClient();

export async function updateClutch(
  id: number,
  form: ClutchFormData
) {
  const { error } = await supabase
    .from("clutches")
    .update({
      pairing_id: form.pairing_id,
      clutch_number: form.clutch_number,
      laid_date: form.laid_date || null,
      expected_hatch: form.expected_hatch || null,
      actual_hatch: form.actual_hatch || null,
      eggs: form.eggs,
      fertile: form.fertile,
      incubator: form.incubator,
      status: form.status,
      notes: form.notes,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
}