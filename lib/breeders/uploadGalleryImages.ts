import { createClient } from "@/lib/supabase/client";

export async function uploadGalleryImages(
  breederId: number,
  files: FileList
) {
  const supabase = createClient();

  // Get current image count for sort order
  const { data: existingImages, error: fetchError } = await supabase
    .from("breeder_images")
    .select("id")
    .eq("breeder_id", breederId);

  if (fetchError) throw fetchError;

  let sortOrder = existingImages?.length ?? 0;

  for (const file of Array.from(files)) {
    const fileName = `${crypto.randomUUID()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("breeders")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("breeders")
      .getPublicUrl(fileName);

    const { error: insertError } = await supabase
      .from("breeder_images")
      .insert({
        breeder_id: breederId,
        image_url: data.publicUrl,
        is_cover: false,
        sort_order: sortOrder++,
      });

    if (insertError) throw insertError;
  }
}