"use client";

import { useRef } from "react";

interface ImageDropzoneProps {
  onFilesSelected: (files: FileList | null) => void;
}

export default function ImageDropzone({
  onFilesSelected,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        className="
          cursor-pointer
          rounded-2xl
          border-2
          border-dashed
          border-green-600
          bg-neutral-900
          p-10
          text-center
          transition-all
          duration-200
          hover:border-green-500
          hover:bg-neutral-800
        "
      >
        <div className="space-y-3">
          <div className="text-5xl">📷</div>

          <h2 className="text-2xl font-bold text-white">
            Upload Gecko Images
          </h2>

          <p className="text-neutral-400">
            Click here to select one or more images
          </p>

          <p className="text-sm text-neutral-500">
            JPG • PNG • WEBP
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        hidden
        multiple
        accept="image/*"
        type="file"
        onChange={(e) => onFilesSelected(e.target.files)}
      />
    </>
  );
}