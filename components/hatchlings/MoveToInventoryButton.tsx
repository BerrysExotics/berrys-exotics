"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { moveToInventoryAction } from "@/app/actions/hatchlings";

interface Props {
  hatchlingId: number;
  transferred: boolean;
}

export default function MoveToInventoryButton({
  hatchlingId,
  transferred,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (transferred) return;

    const confirmed = confirm(
      "Move this hatchling to inventory?\n\nThis will create a new inventory gecko and copy all gallery images."
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await moveToInventoryAction(hatchlingId);

      alert("Hatchling successfully moved to inventory!");

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Transfer failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || transferred}
      className={`rounded-xl px-6 py-3 font-bold text-white transition ${
        transferred
          ? "cursor-not-allowed bg-neutral-700"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {transferred
        ? "Already in Inventory"
        : loading
        ? "Moving..."
        : "Move to Inventory"}
    </button>
  );
}