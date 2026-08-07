export interface Breeder {
  id: number;
  name: string;
  species: string;
  sex: string;
  morph: string;
  lineage: string | null;
  image: string | null;
  status: string;
}

export interface Pairing {
  id: number;
  pairing_name: string;
  male_id: number;
  female_id: number;
}

export interface Clutch {
  id: number;
  pairing_id: number;
  clutch_number: number;
  laid_date: string;
  incubation_method: string | null;
}

export interface Hatchling {
  id: number;
  clutch_id: number;
  hatchling_number: number;
  name: string | null;
  species: string | null;
  morph: string | null;
  sex: string;
  hatch_date: string;
  weight: number | null;
  status: string;
  notes: string | null;

  transferred: boolean;
  gecko_id: string | null;
}

export interface Gecko {
  id: string;

  name: string | null;
  species: string | null;
  morph: string | null;
  sex: string | null;

  hatch_date: string | null;
  weight: number | null;

  image: string | null;

  status: string;
  availability: string;

  listed: boolean;
}