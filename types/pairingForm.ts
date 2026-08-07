export interface PairingFormData {
  // Group Information
  group_letter: string;

  pairing_name: string;

  season: number;

  // Animals
  male_id: number | "";

  female_ids: number[];

  // Status
  status: "Active" | "Paused" | "Retired";

  // Notes
  notes: string;
}