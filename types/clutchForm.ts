export interface ClutchFormData {
  pairing_id: number | "";

  // NEW
  dam_id: number | "";

  clutch_number: number;

  laid_date: string;

  expected_hatch: string;

  actual_hatch: string;

  eggs: number;

  fertile: number;

  incubator: string;

  status: "Incubating" | "Hatched" | "Failed";

  notes: string;
}