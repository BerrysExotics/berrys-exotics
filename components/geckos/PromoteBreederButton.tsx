"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { promoteToBreeder } from "@/lib/breeders/promoteToBreeder";

interface Props {
  geckoId: string;
}

export default function PromoteBreederButton({
  geckoId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      const breederId = await promoteToBreeder(geckoId);

      router.push(`/Admin/breeders/edit/${breederId}`);
    } catch (error: any) {
      console.error("Promote Breeder Error:", error);

      let message = "Unknown error";

      if (error?.message) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else {
        try {
          message = JSON.stringify(error, null, 2);
        } catch {
          message = "Unknown error";
        }
      }

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="rounded-xl bg-emerald-600 px-6 py-3 font-bold transition hover:bg-emerald-700 disabled:opacity-50"
    >
      {loading ? "Creating..." : "🧬 Make Breeder"}
    </button>
  );
}