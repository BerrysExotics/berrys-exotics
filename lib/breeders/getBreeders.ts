import { createClient } from "@/lib/supabase/client";

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

export async function getBreeders(): Promise<BreederListItem[]> {
  const supabase = createClient();

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

  console.log("=================================");
  console.log("BREEDERS RAW DATA");
  console.log(JSON.stringify(data, null, 2));
  console.log("BREEDERS ERROR");
  console.log(error);
  console.log("=================================");

  if (error) {
    throw error;
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