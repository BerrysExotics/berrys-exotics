import { createClient } from "@/lib/supabase/client";

export interface InventoryGecko {
  id: string;

  name: string;
  nickname: string | null;

  species: string;
  morph: string;
  sex: string;

  weight: number | null;

  price: number | null;

  availability: string;

  featured: boolean;

  coverImage: string | null;
}

export async function getInventory(): Promise<InventoryGecko[]> {
  const supabase = createClient();

  // Load all geckos
  const { data: geckos, error: geckoError } = await supabase
    .from("geckos")
    .select("*")
    .order("name");

  if (geckoError) {
    throw geckoError;
  }

  // Load cover images
  const { data: images, error: imageError } = await supabase
    .from("gecko_images")
    .select("gecko_id,image")
    .eq("is_cover", true);

  if (imageError) {
    throw imageError;
  }

  // Build a lookup table
  const imageMap = new Map<string, string>();

  images?.forEach((image) => {
    imageMap.set(image.gecko_id, image.image);
  });

  // Merge the data
  return (geckos ?? []).map((gecko) => ({
    id: gecko.id,

    name: gecko.name,
    nickname: gecko.nickname,

    species: gecko.species,
    morph: gecko.morph,
    sex: gecko.sex,

    weight: gecko.weight,

    price: gecko.price,

    availability: gecko.availability,

    featured: gecko.featured,

    coverImage: imageMap.get(gecko.id) ?? null,
  }));
}