"use client";

import { useRef, useState } from "react";

interface Props {
  onUpload: (files: File[]) => Promise<void>;
}

export default function GalleryUploader({
  onUpload,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [count, setCount] = useState(0);

  async function handleFiles(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(e.target.files ?? []);

    if (files.length === 0) return;

    try {
      setUploading(true);
      setCount(files.length);

      await onUpload(files);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
      setCount(0);
    }
  }

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="text-3xl font-black text-white">
            📷 Gallery Upload
          </h2>

          <p className="mt-2 text-neutral-400">
            Upload one or multiple images at the same time.
          </p>

        </div>

        <label className="cursor-pointer rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700">

          📸 Upload Photos

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="hidden"
          />

        </label>

      </div>

      {uploading && (

        <div className="mt-8 rounded-2xl border border-green-700 bg-green-950 p-6">

          <p className="text-lg font-bold text-green-400">
            Uploading...
          </p>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-neutral-800">

            <div className="h-full w-full animate-pulse bg-green-500" />

          </div>

          <p className="mt-3 text-sm text-neutral-300">
            Processing {count} image{count !== 1 ? "s" : ""}...
          </p>

        </div>

      )}

    </div>
  );
}