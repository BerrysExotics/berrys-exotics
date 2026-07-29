"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import Link from "next/link";
import Image from "next/image";

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
      <h1 className="text-5xl font-bold mb-10 text-center">
        Available Geckos
      </h1>

      {geckos.length === 0 ? (
        <p className="text-center">No geckos available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {geckos.map((gecko) => (
            <Link
              key={gecko.id}
              href={`/collection/${gecko.id}`}
              className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >
              <div className="relative w-full h-72">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/geckos/${gecko.image}`}
                  alt={gecko.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h2 className="text-2xl font-bold">
                  {gecko.name}
                </h2>

                <p className="text-gray-300">
                  {gecko.species}
                </p>

                <p className="text-green-400">
                  {gecko.morph}
                </p>

                <div className="flex justify-between mt-4">
                  <span>{gecko.sex}</span>

                  <span className="text-green-500 font-bold text-xl">
                    ${gecko.price}
                  </span>
                </div>

                <button className="mt-6 w-full bg-green-600 hover:bg-green-700 rounded-lg py-3 font-semibold transition">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}