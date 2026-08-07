"use client";

import { useMemo, useState } from "react";

import BreederCard from "./BreederCard";
import BreederToolbar from "./BreederToolbar";

import { BreederListItem } from "@/lib/breeders/getBreeders";

interface Props {
  breeders: BreederListItem[];
}

export default function BreederManager({
  breeders,
}: Props) {
  const [search, setSearch] = useState("");

  const [species, setSpecies] = useState("All");

  const [sex, setSex] = useState("All");

  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return breeders.filter((breeder) => {
      const matchesSearch =
        breeder.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSpecies =
        species === "All" ||
        breeder.species === species;

      const matchesSex =
        sex === "All" ||
        breeder.sex === sex;

      const matchesStatus =
        status === "All" ||
        breeder.status === status;

      return (
        matchesSearch &&
        matchesSpecies &&
        matchesSex &&
        matchesStatus
      );
    });
  }, [
    breeders,
    search,
    species,
    sex,
    status,
  ]);

  return (
    <div className="space-y-8">

      <BreederToolbar
        search={search}
        setSearch={setSearch}
        species={species}
        setSpecies={setSpecies}
        sex={sex}
        setSex={setSex}
        status={status}
        setStatus={setStatus}
      />

      <p className="text-sm text-neutral-400">
        Showing {filtered.length} of {breeders.length} breeders
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-12 text-center text-neutral-400">
          No breeders match your filters.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {filtered.map((breeder) => (
            <BreederCard
              key={breeder.breederId}
              breeder={breeder}
            />
          ))}

        </div>
      )}

    </div>
  );
}