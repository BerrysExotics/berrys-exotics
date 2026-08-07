import { createClient } from "@/lib/supabase/client";

export interface WeightQueueGecko {
  id: string;

  animal_id: string | null;

  name: string;
  nickname: string | null;

  species: string;
  morph: string;
  sex: string;

  current_weight: number | null;

  last_weight: number | null;

  previous_weight: number | null;

  last_recorded: string | null;

  coverImage: string | null;
}

export async function getWeightQueue(): Promise<
  WeightQueueGecko[]
> {
  const supabase = createClient();

  const { data: geckos, error } = await supabase
    .from("geckos")
    .select(`
      id,
      animal_id,
      name,
      nickname,
      species,
      morph,
      sex,
      weight
    `)
    .order("animal_id", { ascending: true });

  if (error) {
    throw error;
  }

  const { data: images } = await supabase
    .from("gecko_images")
    .select("gecko_id,image")
    .eq("is_cover", true);

  const imageMap = new Map<string, string>();

  images?.forEach((img) => {
    imageMap.set(img.gecko_id, img.image);
  });

  const queue: WeightQueueGecko[] = [];

  for (const gecko of geckos ?? []) {
    const { data: history } = await supabase
      .from("gecko_weights")
      .select("weight, recorded_at")
      .eq("gecko_id", gecko.id)
      .order("recorded_at", {
        ascending: false,
      })
      .limit(2);

    queue.push({
      id: gecko.id,

      animal_id: gecko.animal_id,

      name: gecko.name,
      nickname: gecko.nickname,

      species: gecko.species,
      morph: gecko.morph,
      sex: gecko.sex,

      current_weight: gecko.weight,

      last_weight:
        history?.[0]?.weight ?? null,

      previous_weight:
        history?.[1]?.weight ?? null,

      last_recorded:
        history?.[0]?.recorded_at ?? null,

      coverImage:
        imageMap.get(gecko.id) ?? null,
    });
  }

  return queue;
}