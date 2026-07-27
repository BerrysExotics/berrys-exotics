"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/Lib/supabase";

export default function GeckoList() {
  const [geckos, setGeckos] = useState<any[]>([]);
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
      console.error("Load Error:", error);
    } else {
      setGeckos(data || []);
    }

    setLoading(false);
  }

  async function deleteGecko(id: string) {
    console.log("Delete clicked:", id);

    const confirmed = window.confirm(
      "Are you sure you want to delete this gecko?"
    );

    if (!confirmed) return;

    const { data, error } = await supabase
      .from("geckos")
      .delete()
      .eq("id", id)
      .select();

    console.log("Deleted Data:", data);
    console.log("Delete Error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Gecko deleted!");

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
    <section className="p-10">
      <h2 className="text-3xl font-bold mb-8">
        Current Inventory
      </h2>

      {geckos.length === 0 ? (
        <p>No geckos have been added yet.</p>
      ) : (
        <div className="space-y-6">
          {geckos.map((gecko) => (
            <div
              key={gecko.id}
              className="bg-neutral-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div className="flex items-center gap-5">
                {gecko.image ? (
                  <img
                    src={gecko.image}
                    alt={gecko.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-28 h-28 bg-neutral-700 rounded-lg flex items-center justify-center text-4xl">
                    🦎
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold">
                    {gecko.name}
                  </h3>

                  <p>{gecko.species}</p>

                  <p>{gecko.morph}</p>

                  <p className="text-gray-400">
                    {gecko.status}
                  </p>

                  <p className="text-green-400 text-xl font-bold mt-2">
                    ${gecko.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
                >
                  ✏ Edit
                </button>

                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold"
                >
                  ⭐ Feature
                </button>

                <button
                  onClick={() => deleteGecko(gecko.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}