import { createClient } from "@/lib/supabase/client";

export async function uploadImages(
  geckoId: string,
  files: File[],
  coverIndex: number
) {
  const supabase = createClient();

  const uploadedImages: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const extension = file.name.split(".").pop();

    const fileName = `${geckoId}/${Date.now()}-${i}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("geckos")
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("geckos")
      .getPublicUrl(fileName);

    uploadedImages.push(publicUrl);

    const { error: imageError } = await supabase
      .from("gecko_images")
      .insert({
        gecko_id: geckoId,
        image: publicUrl,
        sort_order: i,
        is_cover: i === coverIndex,
      });

    if (imageError) {
      throw imageError;
    }
  }

  return uploadedImages;
}