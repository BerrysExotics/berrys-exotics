export interface Gecko {
  id: string;

  name: string;
  nickname: string | null;

  species: string;
  morph: string;
  sex: string;

  weight: number | null;
  hatch_date: string | null;

  price: number | null;
  deposit: number;

  status: string;
  availability: string;

  featured: boolean;
  listed: boolean;
  pet_only: boolean;

  lineage: string | null;
  breeder: string | null;
  produced_by: string | null;

  sire_id: string | null;
  dam_id: string | null;

  description: string;

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