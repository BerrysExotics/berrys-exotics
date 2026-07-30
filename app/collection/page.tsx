"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Gecko = {
  id: string;
  name: string;
  species: string;
  morph: string;
  sex: string;
  price: number | null;
  status: string;
  coverImage: string | null;
};

export default function CollectionPage() {
  const [geckos, setGeckos] = useState<Gecko[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGeckos();
  }, []);

  async function fetchGeckos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("geckos")
      .select(`
        id,
        name,
        species,
        morph,
        sex,
        price,
        status,
        gecko_images (
          image,
          is_cover
        )
      `)
      .eq("status", "Available")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const formatted: Gecko[] = (data ?? []).map((gecko: any) => {
      const cover =
        gecko.gecko_images?.find(
          (img: any) => img.is_cover
        ) ??
        gecko.gecko_images?.[0];

      return {
        id: gecko.id,
        name: gecko.name,
        species: gecko.species,
        morph: gecko.morph,
        sex: gecko.sex,
        price: gecko.price,
        status: gecko.status,
        coverImage: cover?.image ?? null,
      };
    });

    setGeckos(formatted);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-900 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-900 p-10 text-white">
      <h1 className="mb-10 text-center text-5xl font-bold">
        Available Geckos
      </h1>

      {geckos.length === 0 ? (
        <p className="text-center">
          No geckos available.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {geckos.map((gecko) => (
            <Link
              key={gecko.id}
              href={`/collection/${gecko.id}`}
              className="overflow-hidden rounded-xl bg-neutral-800 shadow-lg transition duration-300 hover:scale-105"
            >
              <div className="relative h-72 w-full bg-neutral-700">
                {gecko.coverImage ? (
                  <Image
                    src={gecko.coverImage}
                    alt={gecko.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-7xl">
                    🦎
                  </div>
                )}
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

                <div className="mt-4 flex justify-between">
                  <span>{gecko.sex}</span>

                  <span className="text-xl font-bold text-green-500">
                    {gecko.price != null
                      ? `$${gecko.price}`
                      : "Contact"}
                  </span>
                </div>

                <button className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold transition hover:bg-green-700">
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