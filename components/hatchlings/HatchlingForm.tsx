"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BasicHatchlingSection from "./BasicHatchlingSection";
import HatchlingNotes from "./HatchlingNotes";
import HatchlingImageUploader from "./HatchlingImageUploader";

import { HatchlingFormData } from "@/types/hatchlingForm";

import { getClutchOptions } from "@/lib/hatchlings/getClutchOptions";
import { createHatchling } from "@/lib/hatchlings/createHatchling";

interface Clutch {
  id: number;
  clutch_number: number;
  pairing: {
    pairing_name: string;
  };
}

export default function HatchlingForm() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [clutches, setClutches] = useState<Clutch[]>([]);

  const [form, setForm] = useState<HatchlingFormData>({
    clutch_id: "",
    hatchling_number: 1,
    name: "",
    morph: "",
    sex: "Unknown",
    hatch_date: "",
    weight: "",
    status: "Growing",
    notes: "",
  });

  useEffect(() => {
    async function loadClutches() {
      try {
        const data = await getClutchOptions();
        setClutches(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadClutches();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (saving) return;

    if (!form.clutch_id) {
      alert("Please select a clutch.");
      return;
    }

    try {
      setSaving(true);

      await createHatchling(form);

      alert("Hatchling created successfully!");

      router.push("/Admin/hatchlings");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to create hatchling.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <BasicHatchlingSection
        form={form}
        setForm={setForm}
        clutches={clutches}
      />


      <HatchlingNotes
        form={form}
        setForm={setForm}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Create Hatchling"}
        </button>
      </div>
    </form>
  );
}