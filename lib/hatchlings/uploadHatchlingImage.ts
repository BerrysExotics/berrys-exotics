import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function uploadHatchlingImage(
  hatchlingId: number,
  file: File
) {
  const fileExt = file.name.split(".").pop();

  const fileName =
    `${hatchlingId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } =
    await supabase.storage
      .from("hatchlings")
      .upload(fileName, file);

  if (uploadError) {
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("hatchlings")
    .getPublicUrl(fileName);

  const { error } = await supabase
    .from("hatchling_images")
    .insert({
  hatchling_id: hatchlingId,
  image_url: publicUrl,
  storage_path: fileName,
});

  if (error) {
    throw error;
  }

  return publicUrl;
}