"use client";

import { useRef } from "react";

interface Props {
  onFilesSelected: (files: FileList | null) => void;
}

export default function UploadImages({
  onFilesSelected,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={(e) => onFilesSelected(e.target.files)}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
      >
        Upload Images
      </button>
    </>
  );
}