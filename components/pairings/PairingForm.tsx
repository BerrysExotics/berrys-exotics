"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BasicPairingSection from "./BasicPairingSection";
import PairingNotes from "./PairingNotes";

import { PairingFormData } from "@/types/pairingForm";

import { getBreederOptions } from "@/lib/pairings/getBreederOptions";
import { createPairing } from "@/lib/pairings/createPairing";
import { updatePairing } from "@/lib/pairings/updatePairing";

interface Breeder {
  id: number;
  name: string;
}

interface Props {
  initialData?: PairingFormData;
  pairingId?: number;
}

export default function PairingForm({
  initialData,
  pairingId,
}: Props) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [males, setMales] = useState<Breeder[]>([]);
  const [females, setFemales] = useState<Breeder[]>([]);

  const [form, setForm] = useState<PairingFormData>(
    initialData ?? {
      group_letter: "",
      pairing_name: "",
      season: new Date().getFullYear(),
      male_id: "",
      female_ids: [],
      status: "Active",
      notes: "",
    }
  );

  useEffect(() => {
    async function loadBreeders() {
      try {
        const breeders = await getBreederOptions();

        setMales(breeders.males);
        setFemales(breeders.females);
      } catch (err) {
        console.error(err);
      }
    }

    loadBreeders();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (saving) return;

    if (!form.male_id) {
      alert("Please select a male.");
      return;
    }

    if (form.female_ids.length === 0) {
      alert("Please select at least one female.");
      return;
    }

    try {
      setSaving(true);

      if (pairingId) {
        await updatePairing(pairingId, form);

        alert("Breeding Group updated successfully!");
      } else {
        await createPairing(form);

        alert("Breeding Group created successfully!");
      }

      router.push("/Admin/pairings");
      router.refresh();
    } catch (err: any) {
      console.error(err);

      alert(
        err?.message ??
          JSON.stringify(err, null, 2)
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <BasicPairingSection
        form={form}
        setForm={setForm}
        males={males}
        females={females}
      />

      <PairingNotes
        form={form}
        setForm={setForm}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : pairingId
            ? "Save Changes"
            : "Create Breeding Group"}
        </button>
      </div>
    </form>
  );
}