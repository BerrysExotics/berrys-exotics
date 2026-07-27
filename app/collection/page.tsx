"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Gecko = {
  id: string;
  name: string;
  species: string;
  morph: string;
  sex: string;
  price: number;
  image: string;
  status: string;
};

export default function CollectionPage() {
  const [geckos, setGeckos] = useState<Gecko[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGeckos();
  }, []);

  async function fetchGeckos() {
    const { data, error } = await supabase
      .from("geckos")
      .select("*")
      .eq("status", "Available")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setGeckos(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Available Geckos
      </h1>

      {geckos.length === 0 ? (
        <p>No geckos available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {geckos.map((gecko) => (
            <div
              key={gecko.id}
              className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg"
            >
              {gecko.image && (
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/geckos/${gecko.image}`}
                  alt={gecko.name}
                  className="w-full h-72 object-cover"
                />
              )}

              <div className="p-5">
                <h2 className="text-2xl font-bold">
                  {gecko.name}
                </h2>

                <p>{gecko.species}</p>

                <p>{gecko.morph}</p>

                <p>{gecko.sex}</p>

                <p className="text-green-400 text-xl font-bold mt-3">
                  ${gecko.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}