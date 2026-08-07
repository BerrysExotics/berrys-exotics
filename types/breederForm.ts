export interface BreederFormData {
  name: string;

  species: string;

  sex: string;

  morph: string;

  weight: string;

  hatch_date: string;

  status: "Active" | "Retired" | "Archived";

  featured: boolean;

  description: string;
}