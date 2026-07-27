"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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

    if (error) {
      console.error(error);
    } else {
      setGeckos(data || []);
    }

    setLoading(false);
  }

  async function deleteGecko(id: string) {
    const confirmed = window.confirm(
      "Delete this gecko permanently?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("geckos")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

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

  return (
    <section className="space-y-6">
      {geckos.length === 0 ? (
        <p>No geckos have been added yet.</p>
      ) : (
        geckos.map((gecko) => {
          const imageUrl = gecko.image
            ? `https://ehkgiocffxogqbwvuvnx.supabase.co/storage/v1/object/public/geckos/${gecko.image}`
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
                  href={`/Admin/edit/${gecko.id}`}
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold transition"
                >
                  ✏ Edit
                </Link>

                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-3 rounded-lg font-semibold transition"
                >
                  ⭐ Feature
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