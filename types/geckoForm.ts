export type GeckoAvailability =
  | "Available"
  | "On Hold"
  | "Sold"
  | "Not For Sale";

export type GeckoStatus =
  | "Collection"
  | "Holdback"
  | "Breeder"
  | "Retired";

export interface GeckoFormData {
  // Internal Animal ID
  animal_id: string;

  // Basic Info
  name: string;
  nickname: string;

  species: string;
  morph: string;
  sex: string;

  weight: string;
  hatch_date: string;

  // Pricing
  price: string;
  deposit: string;

  // Collection
  status: GeckoStatus;
  availability: GeckoAvailability;

  featured: boolean;
  listed: boolean;
  pet_only: boolean;

  // Breeding
  lineage: string;
  breeder: string;
  produced_by: string;

  sire_id: string;
  dam_id: string;

  // Notes
  description: string;
}