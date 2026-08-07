import { createClient } from "@/lib/supabase/client";

export interface ParentOption {
  id: string;
  name: string;
  sex: string;
  species: string;
}

export async function getParentOptions(): Promise<ParentOption[]> {
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
    .filter((row: any) => row.geckos)
    .map((row: any) => ({
      id: row.geckos.id,
      name: row.geckos.name,
      sex: row.geckos.sex,
      species: row.geckos.species,
    }));
}