import { createClient } from "@/lib/supabase/client";

export interface InventoryGecko {
  id: string;

  // Internal ID
  animal_id: string | null;

  name: string;
  nickname: string | null;

  species: string;
  morph: string;
  sex: string;

  weight: number | null;

  price: number | null;

  // NEW
  status: string;

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
    .order("animal_id", { ascending: true })
    .order("name", { ascending: true });

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

  const imageMap = new Map<string, string>();

  images?.forEach((image) => {
    imageMap.set(image.gecko_id, image.image);
  });

  return (geckos ?? []).map((gecko) => ({
    id: gecko.id,

    animal_id: gecko.animal_id,

    name: gecko.name,
    nickname: gecko.nickname,

    species: gecko.species,
    morph: gecko.morph,
    sex: gecko.sex,

    weight: gecko.weight,

    price: gecko.price,

    // NEW
    status: gecko.status,

    availability: gecko.availability,

    featured: gecko.featured,

    coverImage: imageMap.get(gecko.id) ?? null,
  }));
}