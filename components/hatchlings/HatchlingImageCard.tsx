"use client";

import Image from "next/image";

import {
  deleteHatchlingImageAction,
  setCoverImageAction,
} from "@/app/actions/hatchlings";

interface Props {
  image: {
    id: number;
    hatchling_id: number;
    image_url: string;
    storage_path: string | null;
    is_cover: boolean;
  };
}

export default function HatchlingImageCard({
  image,
}: Props) {
  async function handleDelete() {
    if (!confirm("Delete this image?")) {
      return;
    }

    try {
      await deleteHatchlingImageAction(
        image.id,
        image.storage_path ?? "",
        image.hatchling_id
      );

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to delete image.");
    }
  }

  async function handleCover() {
    try {
      await setCoverImageAction(
        image.hatchling_id,
        image.id
      );

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to set cover image.");
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
      <div className="relative">
        {image.is_cover && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
            ★ Cover
          </div>
        )}

        <Image
          src={image.image_url}
          alt="Hatchling"
          width={600}
          height={600}
          className="aspect-square w-full object-cover"
        />
      </div>

      <div className="space-y-3 p-4">
        <button
          onClick={handleCover}
          disabled={image.is_cover}
          className={`w-full rounded-lg py-2 font-bold transition ${
            image.is_cover
              ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
              : "bg-yellow-500 text-black hover:bg-yellow-400"
          }`}
        >
          {image.is_cover ? "Current Cover" : "Set as Cover"}
        </button>

        <button
          onClick={handleDelete}
          className="w-full rounded-lg bg-red-600 py-2 font-bold text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}