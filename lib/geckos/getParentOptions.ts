import { createClient } from "@/lib/supabase/client";

export interface ParentOption {
  id: string;
  name: string;
  species: string;
  sex: string;
  morph: string | null;
}

export async function getParentOptions(): Promise<ParentOption[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("breeders")
    .select(`
      gecko_id,
      geckos (
        id,
        name,
        species,
        sex,
        morph
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
      species: row.geckos.species,
      sex: row.geckos.sex,
      morph: row.geckos.morph,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}