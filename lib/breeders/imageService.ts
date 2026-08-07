import { createClient } from "@/lib/supabase/client";
import { GeckoImageItem } from "@/types/geckoImage";

export interface UploadedBreederImage {
  url: string;
  isCover: boolean;
  sortOrder: number;
}

export async function uploadBreederImages(
  images: GeckoImageItem[]
): Promise<UploadedBreederImage[]> {
  const supabase = createClient();

  const uploaded: UploadedBreederImage[] = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    if (!image.file) continue;

    const fileName = `${crypto.randomUUID()}-${image.file.name}`;

    const { error } = await supabase.storage
      .from("breeders")
      .upload(fileName, image.file);

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("breeders")
      .getPublicUrl(fileName);

    uploaded.push({
      url: data.publicUrl,
      isCover: image.isCover,
      sortOrder: i,
    });
  }

  return uploaded;
}

export async function deleteBreederImage(
  imageUrl: string
) {
  const supabase = createClient();

  const fileName = imageUrl.split("/").pop();

  if (!fileName) return;

  const { error } = await supabase.storage
    .from("breeders")
    .remove([fileName]);

  if (error) {
    throw error;
  }
}