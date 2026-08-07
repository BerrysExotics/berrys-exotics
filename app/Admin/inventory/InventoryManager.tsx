"use client";

import { useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import {
  getInventory,
  InventoryGecko,
} from "@/lib/geckos/getInventory";

import InventoryCard from "@/app/Admin/inventory/InventoryCard";
import InventoryToolbar from "@/app/Admin/inventory/InventoryToolbar";
import InventoryStats from "@/app/Admin/inventory/InventoryStats";

const supabase = createClient();

export default function InventoryManager() {
  const [loading, setLoading] = useState(true);

  const [geckos, setGeckos] = useState<InventoryGecko[]>([]);

  const [search, setSearch] = useState("");

  const [species, setSpecies] = useState("All");

  const [availability, setAvailability] =
    useState("All");

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    setLoading(true);

    try {
      const animals = await getInventory();
      setGeckos(animals);
    } catch (err) {
      console.error(err);
      alert("Unable to load collection.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleFeatured(
    gecko: InventoryGecko
  ) {
    const { error } = await supabase
      .from("geckos")
      .update({
        featured: !gecko.featured,
      })
      .eq("id", gecko.id);

    if (error) {
      alert(error.message);
      return;
    }

    loadInventory();
  }

  async function deleteGecko(
    gecko: InventoryGecko
  ) {
    const confirmed = window.confirm(
      `Delete "${gecko.name}" permanently?\n\nThis will delete all photos as well.`
    );

    if (!confirmed) return;

    try {
      // Gallery images
      const { data: gallery, error: galleryError } =
        await supabase
          .from("gecko_images")
          .select("image")
          .eq("gecko_id", gecko.id);

      if (galleryError) throw galleryError;

      const files =
        gallery
          ?.map((img) => img.image)
          .filter(Boolean) ?? [];

      if (files.length) {
        const storageDelete =
          await supabase.storage
            .from("geckos")
            .remove(files);

        if (storageDelete.error)
          throw storageDelete.error;
      }

      const galleryDelete = await supabase
        .from("gecko_images")
        .delete()
        .eq("gecko_id", gecko.id);

      if (galleryDelete.error)
        throw galleryDelete.error;

      const geckoDelete = await supabase
        .from("geckos")
        .delete()
        .eq("id", gecko.id);

      if (geckoDelete.error)
        throw geckoDelete.error;

      await loadInventory();

      alert(`${gecko.name} deleted successfully.`);
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Unable to delete gecko.");
      }
    }
  }

  const filtered = useMemo(() => {
    return geckos.filter((gecko) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        (gecko.name ?? "")
          .toLowerCase()
          .includes(searchText) ||
        (gecko.morph ?? "")
          .toLowerCase()
          .includes(searchText) ||
        (gecko.animal_id ?? "")
          .toLowerCase()
          .includes(searchText) ||
        (gecko.species ?? "")
          .toLowerCase()
          .includes(searchText);

      const matchesSpecies =
        species === "All" ||
        gecko.species === species;

      const matchesAvailability =
        availability === "All" ||
        gecko.availability === availability;

      return (
        matchesSearch &&
        matchesSpecies &&
        matchesAvailability
      );
    });
  }, [
    geckos,
    search,
    species,
    availability,
  ]);

  if (loading) {
    return (
      <div className="py-16 text-center text-xl text-white">
        Loading My Collection...
      </div>
    );
  }

  const availableCount = geckos.filter(
    (g) => g.availability === "Available"
  ).length;

  const soldCount = geckos.filter(
    (g) => g.availability === "Sold"
  ).length;

  const featuredCount = geckos.filter(
    (g) => g.featured
  ).length;

  return (
    <div className="space-y-8">

      <InventoryStats
        total={geckos.length}
        available={availableCount}
        sold={soldCount}
        featured={featuredCount}
      />

      <InventoryToolbar
        search={search}
        setSearch={setSearch}
        species={species}
        setSpecies={setSpecies}
        availability={availability}
        setAvailability={setAvailability}
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-900 p-16 text-center">

          <div className="text-7xl">
            🦎
          </div>

          <h2 className="mt-6 text-3xl font-black text-white">
            Your Collection is Empty
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-neutral-400">
            Start building your collection by adding your
            first gecko. Every gecko you own begins here
            before becoming a breeder, holdback, or
            available animal.
          </p>

        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((gecko) => (
            <InventoryCard
              key={gecko.id}
              gecko={gecko}
              onFeature={() =>
                toggleFeatured(gecko)
              }
              onDelete={() =>
                deleteGecko(gecko)
              }
            />
          ))}
        </div>
      )}

    </div>
  );
}