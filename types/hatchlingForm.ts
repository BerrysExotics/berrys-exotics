export interface HatchlingFormData {
  clutch_id: number | "";
  hatchling_number: number;
  name: string;
  morph: string;
  sex: string;
  hatch_date: string;
  weight: string;
  status:
    | "Growing"
    | "Holdback"
    | "Available"
    | "Sold";

  notes: string;
}