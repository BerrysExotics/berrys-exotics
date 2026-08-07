"use client";

import { useEffect, useState } from "react";

import BreederForm from "./BreederForm";

import { getBreeder } from "@/lib/breeders/getBreeder";

type Props = {
  breederId: number;
};

export default function EditBreederForm({
  breederId,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [breeder, setBreeder] = useState<any>(null);

  useEffect(() => {
    async function loadBreeder() {
      try {
        const data = await getBreeder(breederId);
        setBreeder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadBreeder();
  }, [breederId]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center text-white">
        Loading breeder...
      </div>
    );
  }

  if (!breeder) {
    return (
      <div className="rounded-2xl border border-red-700 bg-red-950 p-8 text-center text-white">
        Unable to load breeder.
      </div>
    );
  }

  return <BreederForm initialData={breeder} />;
}