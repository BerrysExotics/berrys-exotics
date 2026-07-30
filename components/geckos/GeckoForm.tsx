"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BasicInfoSection from "./BasicInfoSection";
import PricingSection from "./PricingSection";
import BreedingSection from "./BreedingSection";
import NotesSection from "./NotesSection";
import ImageUploader from "./ImageUploader";

import { GeckoFormData } from "@/types/geckoForm";
import { GeckoImageItem } from "@/types/geckoImage";
import {
  getImages,
  uploadNewImages,
} from "@/lib/geckos/imageService";
import { createGecko } from "@/lib/geckos/createGecko";
import { getGecko } from "@/lib/geckos/getGecko";
import { updateGecko } from "@/lib/geckos/updateGecko";

interface GeckoFormProps {
  geckoId?: string;
}

export default function GeckoForm({ geckoId }: GeckoFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!geckoId);
  const [images, setImages] = useState<GeckoImageItem[]>([]);

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

  useEffect(() => {
    if (!geckoId) {
      setLoading(false);
      return;
    }

    async function loadGecko() {
      try {
        const gecko = await getGecko(geckoId!);

        setForm({
          name: gecko.name ?? "",
          nickname: gecko.nickname ?? "",
          species: gecko.species ?? "Crested Gecko",
          morph: gecko.morph ?? "",
          sex: gecko.sex ?? "Unknown",
          weight: gecko.weight?.toString() ?? "",
          hatch_date: gecko.hatch_date ?? "",
          price: gecko.price?.toString() ?? "",
          deposit: gecko.deposit?.toString() ?? "",
          status: gecko.status ?? "Available",
          availability: gecko.availability ?? "Available",
          featured: gecko.featured ?? false,
          listed: gecko.listed ?? true,
          pet_only: gecko.pet_only ?? false,
          lineage: gecko.lineage ?? "",
          breeder: gecko.breeder ?? "",
          produced_by: gecko.produced_by ?? "",
          sire_id: gecko.sire_id ?? "",
          dam_id: gecko.dam_id ?? "",
          description: gecko.description ?? "",
        });
        const gallery = await getImages(geckoId!);
console.log("Gallery:", gallery);
setImages(gallery);

   } catch (error) {
      console.error("Failed to load gecko:", error);

    } finally {
        setLoading(false);
      }
    }

    loadGecko();
  }, [geckoId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    try {
      const gecko = geckoId
        ? await updateGecko(geckoId, form)
        : await createGecko(form);

      if (images.length) {
        await uploadNewImages(gecko.id, images);
      }

      alert(geckoId ? "Gecko updated successfully!" : "Gecko added successfully!");
      router.push("/Admin/inventory");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("There was an error saving the gecko.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="py-16 text-center text-white">Loading Gecko...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BasicInfoSection form={form} setForm={setForm} />
      <PricingSection form={form} setForm={setForm} />
      <BreedingSection form={form} setForm={setForm} />
      <NotesSection form={form} setForm={setForm} />

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">Image Gallery</h2>
        <ImageUploader images={images} setImages={setImages} />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white"
        >
          {saving ? (geckoId ? "Updating Gecko..." : "Saving Gecko...") : (geckoId ? "Update Gecko" : "Save Gecko")}
        </button>
      </div>
    </form>
  );
}
