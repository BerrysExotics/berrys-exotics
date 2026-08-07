import { createClient } from "@/lib/supabase/client";

export interface BreederStats {
  total: number;
  active: number;
  retired: number;
  males: number;
  females: number;
}

export async function getBreederStats(): Promise<BreederStats> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("breeders")
    .select(`
      status,
      gecko_id,
      geckos (
        id,
        sex
      )
    `);

  if (error) {
    throw error;
  }

  const stats: BreederStats = {
    total: 0,
    active: 0,
    retired: 0,
    males: 0,
    females: 0,
  };

  for (const breeder of data ?? []) {
    // Skip orphaned breeder records
    if (!(breeder as any).geckos) {
      continue;
    }

    stats.total++;

    if (breeder.status === "Active") {
      stats.active++;
    }

    if (breeder.status === "Retired") {
      stats.retired++;
    }

    const sex = (breeder as any).geckos.sex;

    if (sex === "Male") {
      stats.males++;
    }

    if (sex === "Female") {
      stats.females++;
    }
  }

  return stats;
}