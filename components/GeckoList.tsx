"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Gecko = {
  id: string;
  name: string;
  species: string;
  morph: string;
  sex: string;
  price: number;
  status: string;
  image: string;
  featured: boolean;
};

export default function GeckoList() {
    const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [speciesFilter, setSpeciesFilter] = useState("All");

const [geckos, setGeckos] = useState<Gecko[]>([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGeckos();
  }, []);

  async function loadGeckos() {
    setLoading(true);

    const { data, error } = await supabase
  .from("geckos")
  .select("*")
  .order("name");

console.log("Loaded geckos:", data);

    if (error) {
      console.error(error);
    } else {
      setGeckos(data || []);
    }

    setLoading(false);
  }

  async function toggleFeatured(gecko: Gecko) {
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

    loadGeckos();
  }

 async function deleteGecko(id: string) {
  const confirmed = window.confirm(
    "Delete this gecko permanently?\n\nThis will also delete every photo."
  );

  if (!confirmed) return;

  // Get all gallery images
  const { data: gallery } = await supabase
    .from("gecko_images")
    .select("image")
    .eq("gecko_id", id);

  // Get cover image
  const { data: gecko } = await supabase
    .from("geckos")
    .select("image")
    .eq("id", id)
    .single();

  // Build file list
  const files = new Set<string>();

  if (gecko?.image) {
    files.add(gecko.image);
  }

  gallery?.forEach((img) => {
    if (img.image) {
      files.add(img.image);
    }
  });

console.log("Files to delete:", Array.from(files));

  // Delete storage files
  if (files.size > 0) {
    await supabase.storage
      .from("geckos")
      .remove(Array.from(files));
  }

  // Delete gallery rows
  await supabase
    .from("gecko_images")
    .delete()
    .eq("gecko_id", id);

  console.log("Deleting gecko:", id);

// Delete gecko row
const geckoDelete = await supabase
  .from("geckos")
  .delete()
  .eq("id", id)
  .select();

console.log("Gecko Delete:", geckoDelete);

if (geckoDelete.error) {
  console.error(geckoDelete.error);
  alert(geckoDelete.error.message);
  return;
}

console.log("Deleted rows:", geckoDelete.data);

alert("Deleted!");

loadGeckos();

}

  if (loading) {
    return (
      <section className="p-10">
        <h2 className="text-3xl font-bold mb-6">
          Current Inventory
        </h2>

        <p>Loading geckos...</p>
      </section>
    );
  }
const filteredGeckos = geckos.filter((gecko) => {
  const matchesSearch =
    gecko.name.toLowerCase().includes(search.toLowerCase()) ||
    gecko.morph.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || gecko.status === statusFilter;

  const matchesSpecies =
    speciesFilter === "All" || gecko.species === speciesFilter;

  return matchesSearch && matchesStatus && matchesSpecies;
});
  return (
    <section className="space-y-6">
    <div className="grid md:grid-cols-3 gap-4">
  <input
    type="text"
    placeholder="Search geckos..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white"
  >
    <option value="All">All Status</option>
    <option value="Available">Available</option>
    <option value="Hold">Hold</option>
    <option value="Sold">Sold</option>
  </select>

  <select
    value={speciesFilter}
    onChange={(e) => setSpeciesFilter(e.target.value)}
    className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white"
  >
    <option value="All">All Species</option>
    <option value="Crested Gecko">Crested Gecko</option>
    <option value="Leachianus">Leachianus</option>
    <option value="Gargoyle Gecko">Gargoyle Gecko</option>
    <option value="Chahoua">Chahoua</option>
  </select>
</div>
      {filteredGeckos.length === 0 ? (
        <p>No geckos have been added yet.</p>
      ) : (
        filteredGeckos.map((gecko) => {
          const imageUrl = gecko.image
            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/geckos/${gecko.image}`
            : "";

          return (
            <div
              key={gecko.id}
              className="bg-neutral-800 rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-6 justify-between"
            >
              <div className="flex gap-6">
                {gecko.image ? (
                  <img
                    src={imageUrl}
                    alt={gecko.name}
                    className="w-32 h-32 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-xl bg-neutral-700 flex items-center justify-center text-5xl">
                    🦎
                  </div>
                )}

                <div>
                  <h2 className="text-3xl font-bold">
                    {gecko.name}
                  </h2>

                  <p className="text-neutral-300">
                    {gecko.species}
                  </p>

                  <p>{gecko.morph}</p>

                  <p>{gecko.sex}</p>

                  <p
                    className={`mt-2 font-semibold ${
                      gecko.status === "Available"
                        ? "text-green-400"
                        : gecko.status === "Sold"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {gecko.status}
                  </p>

                  <p className="text-2xl font-bold text-green-400 mt-3">
                    ${gecko.price}
                  </p>

                  {gecko.featured && (
                    <span className="inline-block mt-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ Featured
                    </span>
                  )}
                </div>
              </div>
                            <div className="flex flex-wrap gap-3 items-start">

                <Link
                  href={`/collection/${gecko.id}`}
                  target="_blank"
                  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg font-semibold transition"
                >
                  👁 Preview
                </Link>

                <Link
                  href={`/Admin/edit/${gecko.id}`}
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold transition"
                >
                  ✏ Edit
                </Link>

                <button
                  onClick={() => toggleFeatured(gecko)}
                  className={`px-5 py-3 rounded-lg font-semibold transition ${
                    gecko.featured
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-yellow-500 hover:bg-yellow-600 text-black"
                  }`}
                >
                  {gecko.featured ? "⭐ Featured" : "☆ Feature"}
                </button>

                <button
                  onClick={() => deleteGecko(gecko.id)}
                  className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold transition"
                >
                  🗑 Delete
                </button>

              </div>
            </div>
          );
        })
      )}
    </section>
  );
}