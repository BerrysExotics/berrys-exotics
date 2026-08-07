import { createClient } from "@/lib/supabase/server";

export interface GalleryImage {
  id: number;
  image: string;
  caption: string | null;
  is_cover: boolean;
  sort_order: number;
  created_at: string;
}

export async function getGalleryImages(
  table:
    | "gecko_images"
    | "breeder_images"
    | "hatchling_images",
  column:
    | "gecko_id"
    | "breeder_id"
    | "hatchling_id",
  id: number
): Promise<GalleryImage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq(column, id)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as GalleryImage[];
}