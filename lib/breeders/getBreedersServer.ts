import { createClient } from "@/lib/supabase/server";

export interface BreederListItem {
  breederId: number;
  geckoId: string;

  name: string;
  species: string;
  morph: string;
  sex: string;

  weight: number | null;

  status: string;

  coverImage: string | null;
}

export async function getBreedersServer(): Promise<BreederListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("breeders")
    .select(`
      id,
      status,
      gecko_id,
      geckos (
        id,
        name,
        species,
        morph,
        sex,
        weight,
        gecko_images (
          image,
          is_cover
        )
      )
    `);

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? [])
    .filter((breeder: any) => breeder.geckos)
    .map((breeder: any) => ({
      breederId: breeder.id,

      geckoId: breeder.geckos.id,

      name: breeder.geckos.name,
      species: breeder.geckos.species,
      morph: breeder.geckos.morph ?? "",
      sex: breeder.geckos.sex,

      weight: breeder.geckos.weight,

      status: breeder.status,

      coverImage:
        breeder.geckos.gecko_images?.find(
          (img: any) => img.is_cover
        )?.image ?? null,
    }));
}