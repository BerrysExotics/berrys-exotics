export interface Pairing {
  id: number;

  male_id: number;
  female_id: number;

  male_name: string;
  female_name: string;

  male_image: string;
  female_image: string;

  pairing_name: string;

  start_date: string;

  status: "Active" | "Paused" | "Retired";

  notes: string;

  created_at?: string;
}