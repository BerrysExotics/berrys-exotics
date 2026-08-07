"use client";

import UploadImages from "./UploadImages";

interface Props {
  imageCount: number;
  onFilesSelected?: (files: FileList | null) => void;
}

export default function GalleryToolbar({
  imageCount,
  onFilesSelected,
}: Props) {
  return (
    <div className="mb-8 flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Gallery Images
        </h2>

        <p className="text-neutral-400">
          {imageCount} image{imageCount !== 1 ? "s" : ""}
        </p>
      </div>

      <UploadImages
        onFilesSelected={
          onFilesSelected ?? (() => {})
        }
      />
    </div>
  );
}