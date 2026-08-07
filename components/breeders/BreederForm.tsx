"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BasicInfoSection from "./BasicInfoSection";
import DetailsSection from "./DetailsSection";
import NotesSection from "./NotesSection";
import ImageUploader from "./ImageUploader";

import { createBreeder } from "@/lib/breeders/createBreeder";
import { updateBreeder } from "@/lib/breeders/updateBreeder";

import { BreederFormData } from "@/types/breederForm";
import { GeckoImageItem } from "@/types/geckoImage";

interface BreederFormProps {
  initialData?: {
    id: number;
    name: string;
    species: string;
    sex: string;
    morph: string | null;
    weight: number | null;
    hatch_date: string | null;
    status: "Active" | "Retired" | "Archived";
    featured: boolean;
    description: string | null;
  };
}

export default function BreederForm({
  initialData,
}: BreederFormProps) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [images, setImages] = useState<GeckoImageItem[]>([]);

  const [form, setForm] = useState<BreederFormData>({
    name: initialData?.name ?? "",
    species: initialData?.species ?? "Leachianus",
    sex: initialData?.sex ?? "Unknown",
    morph: initialData?.morph ?? "",
    weight: initialData?.weight?.toString() ?? "",
    hatch_date: initialData?.hatch_date ?? "",
    status: initialData?.status ?? "Active",
    featured: initialData?.featured ?? false,
    description: initialData?.description ?? "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (saving) return;

    try {
      setSaving(true);

      if (initialData) {
        await updateBreeder(initialData.id, form);
      } else {
        await createBreeder(form, images);
      }

      alert(
        initialData
          ? "Breeder updated successfully!"
          : "Breeder saved successfully!"
      );

      router.push("/Admin/breeders/manage");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to save breeder."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BasicInfoSection
        form={form}
        setForm={setForm}
      />

      <DetailsSection
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
          images={images}
          setImages={setImages}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : initialData
            ? "Update Breeder"
            : "Save Breeder"}
        </button>
      </div>
    </form>
  );
}