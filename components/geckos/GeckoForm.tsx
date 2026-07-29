"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BasicInfoSection from "./BasicInfoSection";
import PricingSection from "./PricingSection";
import BreedingSection from "./BreedingSection";
import NotesSection from "./NotesSection";
import ImageUploader from "./ImageUploader";

import { GeckoFormData } from "@/types/geckoForm";

import { createGecko } from "@/lib/geckos/createGecko";
import { getGecko } from "@/lib/geckos/getGecko";
import { updateGecko } from "@/lib/geckos/updateGecko";
import { uploadImages } from "@/lib/geckos/uploadImages";
interface GeckoFormProps {
  geckoId?: string;
}

export default function GeckoForm({
  geckoId,
}: GeckoFormProps) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [coverIndex, setCoverIndex] = useState(0);

  const [form, setForm] = useState<GeckoFormData>({
    name: "",
    nickname: "",

    species: "Crested Gecko",
    morph: "",
    sex: "Unknown",

    weight: "",
    hatch_date: "",

    price: "",
    deposit: "",

    status: "Available",
    availability: "Available",

    featured: false,
    listed: true,
    pet_only: false,

    lineage: "",
    breeder: "",
    produced_by: "",

    sire_id: "",
    dam_id: "",

    description: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (saving) return;

    setSaving(true);

    try {
      const gecko = await createGecko(form);

      if (files.length > 0) {
        await uploadImages(
          gecko.id,
          files,
          coverIndex
        );
      }

      alert("Gecko added successfully!");

      router.push("/Admin/inventory");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert("There was an error saving the gecko.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <BasicInfoSection
        form={form}
        setForm={setForm}
      />

      <PricingSection
        form={form}
        setForm={setForm}
      />

      <BreedingSection
        form={form}
        setForm={setForm}
      />

      <NotesSection
        form={form}
        setForm={setForm}
      />

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Image Gallery
        </h2>

        <ImageUploader
          files={files}
          setFiles={setFiles}
          coverIndex={coverIndex}
          setCoverIndex={setCoverIndex}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving Gecko..." : "Save Gecko"}
        </button>
      </div>
    </form>
  );
}