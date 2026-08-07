import { createClient } from "@/lib/supabase/client";

export interface BreederParent {
  id: string;
  name: string;
  sex: string;
  species: string;
}

export async function getBreederParents(): Promise<BreederParent[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("breeders")
    .select(`
      geckos (
        id,
        name,
        sex,
        species
      )
    `);

  if (error) {
    throw error;
  }

  return (data ?? [])
    .map((breeder: any) => breeder.geckos)
    .filter(Boolean)
    .map((gecko: any) => ({
      id: gecko.id,
      name: gecko.name,
      sex: gecko.sex,
      species: gecko.species,
    }));
}