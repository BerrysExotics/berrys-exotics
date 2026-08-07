"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { uploadHatchlingImage } from "@/lib/hatchlings/uploadHatchlingImage";

interface Props {
  hatchlingId: number;
}

export default function HatchlingImageUploader({
  hatchlingId,
}: Props) {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  async function handleFiles(
    files: FileList | null
  ) {
    if (!files?.length) return;

    try {
      setUploading(true);

      const list = Array.from(files);

      setTotal(list.length);
      setCurrent(0);

      for (let i = 0; i < list.length; i++) {
        await uploadHatchlingImage(
          hatchlingId,
          list[i]
        );

        setCurrent(i + 1);
      }

      router.refresh();

      alert("Images uploaded successfully!");

    } catch (err) {
      console.error(err);

      alert("Upload failed.");

    } finally {
      setUploading(false);

      setCurrent(0);
      setTotal(0);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="text-3xl font-black text-white">
            📷 Gallery
          </h2>

          <p className="mt-2 text-neutral-400">
            Upload one or multiple hatchling photos.
          </p>

        </div>

        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700 disabled:opacity-60"
        >
          {uploading
            ? "Uploading..."
            : "📷 Upload Photos"}
        </button>

      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        multiple
        accept="image/*"
        onChange={(e) =>
          handleFiles(e.target.files)
        }
      />

      {uploading && (

        <div className="mt-8 rounded-2xl border border-green-700 bg-green-950 p-6">

          <p className="text-lg font-bold text-green-400">
            Uploading Images...
          </p>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-neutral-800">

            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{
                width: `${
                  total === 0
                    ? 0
                    : (current / total) * 100
                }%`,
              }}
            />

          </div>

          <p className="mt-3 text-sm text-neutral-300">
            {current} of {total} uploaded
          </p>

        </div>

      )}

    </div>
  );
}