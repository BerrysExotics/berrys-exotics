import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const today = new Date();

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const [
    { count: totalGeckos },
    { count: available },
    { count: inquiries },
    { count: hatchlings },
    { data: clutches },
    { data: geckos },
  ] = await Promise.all([
    supabase
      .from("geckos")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("geckos")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("availability", "Available"),

    supabase
      .from("inquiries")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("hatchlings")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("clutches")
      .select("expected_hatch_date,status")
      .eq("status", "Incubating"),

    supabase
      .from("geckos")
      .select("id,name,weight"),
  ]);

  // Count clutches due this week
  const activeClutches = clutches?.length ?? 0;

  const dueThisWeek =
    clutches?.filter((clutch) => {
      if (!clutch.expected_hatch_date) return false;

      const hatch = new Date(clutch.expected_hatch_date);

      return hatch >= today && hatch <= nextWeek;
    }).length ?? 0;

  // Placeholder until we add automatic weight reminders
  const weightsDue = 0;

  // Placeholder until we add photo reminders
  const photosDue = 0;

  return {
    totalGeckos: totalGeckos ?? 0,
    available: available ?? 0,
    inquiries: inquiries ?? 0,
    hatchlings: hatchlings ?? 0,
    activeClutches,
    dueThisWeek,
    weightsDue,
    photosDue,
  };
}