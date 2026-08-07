import { createClient } from "@/lib/supabase/server";

export type WebsiteSettings = {
  business_name: string | null;
  business_email: string | null;
  instagram: string | null;
  tiktok: string | null;
  morphmarket: string | null;

  homepage_title: string | null;
  homepage_subtitle: string | null;
  homepage_description: string | null;
};

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("settings")
    .select(`
      business_name,
      business_email,
      instagram,
      tiktok,
      morphmarket,
      homepage_title,
      homepage_subtitle,
      homepage_description
    `)
    .eq("id", 1)
    .single();

  if (error || !data) {
    return {
      business_name: "Berry's Exotics",
      business_email: "",
      instagram: "",
      tiktok: "",
      morphmarket: "",
      homepage_title: "Premium Crested & Leachianus Geckos",
      homepage_subtitle: "Quality Genetics. Healthy Animals.",
      homepage_description:
        "Berry's Exotics is dedicated to producing exceptional New Caledonian geckos with outstanding genetics, health, and customer support.",
    };
  }

  return data;
}