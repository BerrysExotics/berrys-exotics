"use client";

import Image from "next/image";
import { GeckoImageItem } from "@/types/geckoImage";

interface ImageCardProps {
  image: GeckoImageItem;
  preview: string;
  onRemove: () => void;
  onMakeCover: () => void;
}

export default function ImageCard({
  image,
  preview,
  onRemove,
  onMakeCover,
}: ImageCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
        image.isCover
          ? "border-green-500 shadow-lg shadow-green-500/20"
          : "border-neutral-800 hover:border-neutral-600"
      } bg-neutral-900`}
    >
      <div className="relative aspect-square">
        {preview ? (
  <Image
    src={preview}
    alt="Gecko"
    fill
    sizes="(max-width: 768px) 100vw, 33vw"
    className="object-cover"
    unoptimized={preview.startsWith("blob:")}
  />
) : (
  <div className="flex h-full items-center justify-center bg-neutral-800 text-sm text-neutral-400">
    No Preview
  </div>
)}

        <div className="absolute left-3 top-3 flex gap-2">
          {image.isCover && (
            <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
              ★ Cover
            </span>
          )}

          {image.existing ? (
            <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold text-white">
              Existing
            </span>
          ) : (
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              New
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3 p-4">
        {!image.isCover && (
          <button
            type="button"
            onClick={onMakeCover}
            className="w-full rounded-lg bg-green-600 py-2 font-semibold text-white transition hover:bg-green-700"
          >
            Set as Cover
          </button>
        )}

        <button
          type="button"
          onClick={onRemove}
          className="w-full rounded-lg bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Remove Image
        </button>
      </div>
    </div>
  );
}