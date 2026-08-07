"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BasicClutchSection from "./BasicClutchSection";
import ClutchNotes from "./ClutchNotes";

import { ClutchFormData } from "@/types/clutchForm";

import { getPairingOptions } from "@/lib/clutches/getPairingOptions";
import { getClutch } from "@/lib/clutches/getClutch";
import { updateClutch } from "@/lib/clutches/updateClutch";

interface Pairing {
  id: number;
  pairing_name: string;
}

export default function EditClutchForm({
  clutchId,
}: {
  clutchId: number;
}) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [pairings, setPairings] = useState<Pairing[]>([]);

  const [form, setForm] = useState<ClutchFormData>({
    pairing_id: "",

    // Added
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
    async function load() {
      try {
        const [pairingData, clutch] = await Promise.all([
          getPairingOptions(),
          getClutch(clutchId),
        ]);

        setPairings(pairingData);

        setForm({
          pairing_id: clutch.pairing_id,

          // Added
          dam_id: clutch.dam_id ?? "",

          clutch_number: clutch.clutch_number,

          laid_date: clutch.laid_date ?? "",
          expected_hatch: clutch.expected_hatch ?? "",
          actual_hatch: clutch.actual_hatch ?? "",

          eggs: clutch.eggs ?? 2,
          fertile: clutch.fertile ?? 2,

          incubator: clutch.incubator ?? "",

          status: clutch.status,

          notes: clutch.notes ?? "",
        });
      } catch (err) {
        console.error(err);
        alert("Unable to load clutch.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [clutchId]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (saving) return;

    try {
      setSaving(true);

      await updateClutch(clutchId, form);

      alert("Clutch updated!");

      router.push("/Admin/clutches");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update clutch.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-neutral-900 p-10 text-center text-white">
        Loading...
      </div>
    );
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
          className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}