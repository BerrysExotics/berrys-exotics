import { createClient } from "@/lib/supabase/client";
import { ClutchFormData } from "@/types/clutchForm";

const supabase = createClient();

export async function createClutch(
  form: ClutchFormData
) {
  // Create the clutch
  const { data: clutch, error } = await supabase
    .from("clutches")
    .insert({
      pairing_id: form.pairing_id,

      // Convert empty string to null for BIGINT column
      dam_id: form.dam_id ? Number(form.dam_id) : null,

      clutch_number: form.clutch_number,

      laid_date: form.laid_date || null,

      expected_hatch: form.expected_hatch || null,

      actual_hatch: form.actual_hatch || null,

      eggs: form.eggs,

      fertile: form.fertile,

      incubator: form.incubator || null,

      status: form.status,

      notes: form.notes || null,
    })
    .select()
    .single();

  if (error) {
    console.error("SUPABASE INSERT ERROR:", error);
    alert(JSON.stringify(error, null, 2));
    throw error;
  }

  // Automatically create egg records
  const eggRows = Array.from(
    { length: form.eggs },
    (_, index) => ({
      clutch_id: clutch.id,

      egg_number: index + 1,

      status: "Incubating",

      expected_hatch_date:
        form.expected_hatch || null,
    })
  );

  const { error: eggError } = await supabase
    .from("eggs")
    .insert(eggRows);

  if (eggError) {
    console.error("EGG INSERT ERROR:", eggError);
    alert(JSON.stringify(eggError, null, 2));
    throw eggError;
  }

  return clutch;
}