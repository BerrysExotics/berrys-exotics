"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";
import CollectionToolbar from "@/components/collection/CollectionToolbar";

const supabase = createClient();

type Gecko = {
  id: string;
  name: string;
  species: string;
  morph: string;
  sex: string;
  price: number | null;
  availability: string;
  coverImage: string | null;
  created_at: string;
};

export default function CollectionPage() {
  const [geckos, setGeckos] = useState<Gecko[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [species, setSpecies] = useState("All");
  const [sex, setSex] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Newest");

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
        availability,
        created_at,
        gecko_images (
          image,
          is_cover
        )
      `)
      .eq("listed", true)
      .eq("availability", "Available")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const formatted: Gecko[] = (data ?? []).map((gecko: any) => {
      const cover =
        gecko.gecko_images?.find((img: any) => img.is_cover) ??
        gecko.gecko_images?.[0];

      return {
        id: gecko.id,
        name: gecko.name,
        species: gecko.species,
        morph: gecko.morph,
        sex: gecko.sex,
        price: gecko.price,
        availability: gecko.availability,
        coverImage: cover?.image ?? null,
        created_at: gecko.created_at,
      };
    });

    setGeckos(formatted);
    setLoading(false);
  }

  const filteredGeckos = useMemo(() => {
    let results = [...geckos];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();

      results = results.filter(
        (g) =>
          g.name.toLowerCase().includes(search) ||
          g.species.toLowerCase().includes(search) ||
          g.morph.toLowerCase().includes(search)
      );
    }

    if (species !== "All") {
      results = results.filter((g) => g.species === species);
    }

    if (sex !== "All") {
      results = results.filter((g) => g.sex === sex);
    }

    if (status !== "All") {
      results = results.filter(
        (g) => g.availability === status
      );
    }

    switch (sort) {
      case "Oldest":
        results.reverse();
        break;

      case "Name":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "PriceHigh":
        results.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;

      case "PriceLow":
        results.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
    }

    return results;
  }, [geckos, searchTerm, species, sex, status, sort]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-900 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-900 p-10 text-white">
      <h1 className="mb-8 text-center text-5xl font-bold">
        Available Geckos
      </h1>

      <CollectionToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        species={species}
        setSpecies={setSpecies}
        sex={sex}
        setSex={setSex}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        resultCount={filteredGeckos.length}
      />

      {filteredGeckos.length === 0 ? (
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold">
            No geckos found.
          </h2>

          <p className="mt-4 text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredGeckos.map((gecko) => (
            <Link
              key={gecko.id}
              href={`/collection/${gecko.id}`}
              className="overflow-hidden rounded-xl bg-neutral-800 shadow-lg transition duration-300 hover:scale-105"
            >
              <div className="relative h-72 bg-neutral-700">
                {gecko.coverImage ? (
                  <Image
                    src={gecko.coverImage}
                    alt={gecko.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl">
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