export interface HatchlingImage {
  id: number;
  hatchling_id: number;
  image_url: string;
  storage_path: string | null;
  sort_order: number;
  created_at: string;
}