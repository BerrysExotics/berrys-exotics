import { createClient } from "@/lib/supabase/client";
import { BreederFormData } from "@/types/breederForm";
import { GeckoImageItem } from "@/types/geckoImage";
import { uploadBreederImages } from "./imageService";

export async function createBreeder(
  form: BreederFormData,
  images: GeckoImageItem[]
) {
  const supabase = createClient();

  // Upload all breeder images
  const uploadedImages = await uploadBreederImages(images);

  // Find the selected cover image
  const coverImage =
    uploadedImages.find((img) => img.isCover)?.url ?? null;

  // Create the breeder
  const { data: breeder, error } = await supabase
    .from("breeders")
    .insert({
      name: form.name,
      species: form.species,
      sex: form.sex,
      morph: form.morph,
      weight: form.weight ? Number(form.weight) : null,
      hatch_date: form.hatch_date || null,
      status: form.status,
      description: form.description,
      featured: form.featured,
      cover_image: coverImage,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  // Save all gallery images
  if (uploadedImages.length > 0) {
    const gallery = uploadedImages.map((image) => ({
      breeder_id: breeder.id,
      image_url: image.url,
      is_cover: image.isCover,
      sort_order: image.sortOrder,
    }));

    const { error: galleryError } = await supabase
      .from("breeder_images")
      .insert(gallery);

    if (galleryError) {
      throw galleryError;
    }
  }

  return breeder;
}