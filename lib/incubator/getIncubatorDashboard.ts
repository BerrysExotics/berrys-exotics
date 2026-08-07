import { createClient } from "@/lib/supabase/server";

export async function getIncubatorDashboard() {
  const supabase = await createClient();

  const today = new Date();

  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const { data: eggs, error } = await supabase
    .from("eggs")
    .select(`
      *,
      clutch:clutches (
        clutch_number,
        laid_date,
        pairing:pairings (
  pairing_name,
  group_letter
)
      )
    `)
    .eq("status", "Incubating")
    .order("expected_hatch_date", {
      ascending: true,
    });

  if (error) {
    console.error(error);

    return {
      eggs: [],
      stats: {
        active: 0,
        eggs: 0,
        dueThisWeek: 0,
        hatchedThisWeek: 0,
      },
    };
  }

  const dueThisWeek = (eggs ?? []).filter((egg: any) => {
    if (!egg.expected_hatch_date) return false;

    const hatch = new Date(egg.expected_hatch_date);

    return hatch >= today && hatch <= nextWeek;
  }).length;

  const { count: hatchedThisWeek } = await supabase
    .from("eggs")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "Hatched");

  return {
    eggs: eggs ?? [],

    stats: {
      active: eggs?.length ?? 0,
      eggs: eggs?.length ?? 0,
      dueThisWeek,
      hatchedThisWeek: hatchedThisWeek ?? 0,
    },
  };
}