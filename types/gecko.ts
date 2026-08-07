export interface Gecko {
  id: string;

  // Internal ID
  animal_id: string | null;

  // Basic Information
  name: string;
  nickname: string | null;

  species: string;
  morph: string;
  sex: string;

  weight: number | null;
  hatch_date: string | null;

  // Pricing
  price: number | null;
  deposit: number;

  // Status
  status: string;
  availability: string;

  featured: boolean;
  listed: boolean;
  pet_only: boolean;

  // Breeding
  lineage: string | null;
  breeder: string | null;
  produced_by: string | null;

  sire_id: string | null;
  dam_id: string | null;

  // Notes
  description: string;

  // Main Image
  image: string | null;

  created_at: string;
}

export interface GeckoImage {
  id: string;

  gecko_id: string;

  image: string;

  sort_order: number;

  is_cover: boolean;

  created_at: string;
}