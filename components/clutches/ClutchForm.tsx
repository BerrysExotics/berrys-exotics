"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BasicClutchSection from "./BasicClutchSection";
import ClutchNotes from "./ClutchNotes";

import { ClutchFormData } from "@/types/clutchForm";

import { getPairingOptions } from "@/lib/clutches/getPairingOptions";
import { createClutch } from "@/lib/clutches/createClutch";

interface Pairing {
  id: number;
  pairing_name: string;
}

interface Props {
  defaultPairingId?: string | undefined;
}

export default function ClutchForm({
  defaultPairingId,
}: Props) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [pairings, setPairings] = useState<Pairing[]>([]);

  const [form, setForm] = useState<ClutchFormData>({
    pairing_id: defaultPairingId
      ? Number(defaultPairingId)
      : "",

    // NEW
    dam_id: "",

    clutch_number: 1,

    laid_date: "",
    expected_hatch: "",
    actual_hatch: "",

    eggs: 2,
    fertile: 2,

    incubator: "",

    status: "Incubating",

    notes: "",
  });

  useEffect(() => {
    async function loadPairings() {
      try {
        const data = await getPairingOptions();
        setPairings(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadPairings();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (saving) return;

    if (!form.pairing_id) {
      alert("Please select a pairing.");
      return;
    }

    try {
      setSaving(true);

      await createClutch(form);

      alert("Clutch created successfully!");

      if (defaultPairingId) {
        router.push(`/Admin/pairings/${defaultPairingId}`);
      } else {
        router.push("/Admin/clutches");
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to create clutch.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <BasicClutchSection
        form={form}
        setForm={setForm}
        pairings={pairings}
      />

      <ClutchNotes
        form={form}
        setForm={setForm}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Create Clutch"}
        </button>
      </div>
    </form>
  );
}