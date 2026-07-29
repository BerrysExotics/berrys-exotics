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
      alert("Unable to load inventory.");
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

  const filtered = useMemo(() => {
    return geckos.filter((gecko) => {
      const matchesSearch =
        gecko.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        gecko.morph
          .toLowerCase()
          .includes(search.toLowerCase());

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
        Loading inventory...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <InventoryStats
        total={geckos.length}
        available={
          geckos.filter(
            (g) =>
              g.availability === "Available"
          ).length
        }
        sold={
          geckos.filter(
            (g) =>
              g.availability === "Sold"
          ).length
        }
        featured={
          geckos.filter(
            (g) => g.featured
          ).length
        }
      />

      <InventoryToolbar
        search={search}
        setSearch={setSearch}
        species={species}
        setSpecies={setSpecies}
        availability={availability}
        setAvailability={
          setAvailability
        }
      />

      <div className="space-y-6">

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400">
            No geckos found.
          </p>
        ) : (
          filtered.map((gecko) => (
            <InventoryCard
              key={gecko.id}
              gecko={gecko}
              onFeature={() =>
                toggleFeatured(gecko)
              }
              onDelete={() =>
                alert(
                  "Delete is the next feature we'll build."
                )
              }
            />
          ))
        )}

      </div>

    </div>
  );
}