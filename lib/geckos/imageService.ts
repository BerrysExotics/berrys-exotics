import { createClient } from "@/lib/supabase/client";
import { GeckoImageItem } from "@/types/geckoImage";

const BUCKET = "geckos";

function getStoragePath(publicUrl: string): string {
  try {
    const url = new URL(publicUrl);
    const marker = `/storage/v1/object/public/${BUCKET}/`;
    const idx = url.pathname.indexOf(marker);
    if (idx === -1) return "";
    return decodeURIComponent(url.pathname.substring(idx + marker.length));
  } catch {
    return "";
  }
}

export async function getImages(geckoId: string): Promise<GeckoImageItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("gecko_images")
    .select("*")
    .eq("gecko_id", geckoId)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((image) => ({
  id: image.id,
  image: image.image,
  existing: true,
  isCover: image.is_cover,
}));
}
export async function uploadNewImages(geckoId: string, images: GeckoImageItem[]) {
  const supabase = createClient();

  let sortOrder = 0;

  for (const image of images) {
    if (image.existing || !image.file) {
      sortOrder++;
      continue;
    }

    const extension = image.file.name.split(".").pop();
    const fileName = `${geckoId}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(fileName, image.file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

    const { error: insertError } = await supabase.from("gecko_images").insert({
      gecko_id: geckoId,
      image: publicUrl,
      sort_order: sortOrder,
      is_cover: image.isCover,
    });

    if (insertError) throw insertError;

    sortOrder++;
  }
}

export async function deleteImage(imageId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.from("gecko_images").select("image").eq("id", imageId).single();

  if (error) throw error;

  const storagePath = getStoragePath(data.image);

  if (storagePath) {
    await supabase.storage.from(BUCKET).remove([storagePath]);
  }

  const { error: deleteError } = await supabase.from("gecko_images").delete().eq("id", imageId);

  if (deleteError) throw deleteError;
}

export async function setCoverImage(imageId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.from("gecko_images").select("gecko_id").eq("id", imageId).single();

  if (error) throw error;

  await supabase.from("gecko_images").update({ is_cover: false }).eq("gecko_id", data.gecko_id);

  const { error: coverError } = await supabase.from("gecko_images").update({ is_cover: true }).eq("id", imageId);

  if (coverError) throw coverError;
}

export async function updateImageOrder(images: GeckoImageItem[]) {
  const supabase = createClient();

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    if (!image.id) continue;

    const { error } = await supabase.from("gecko_images").update({
      sort_order: i,
      is_cover: image.isCover,
    }).eq("id", image.id);

    if (error) throw error;
  }
}