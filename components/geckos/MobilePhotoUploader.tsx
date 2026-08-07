"use client";

import { useRef, useState } from "react";

interface Props {
  onFilesSelected(files: File[]): void;
}

export default function MobilePhotoUploader({
  onFilesSelected,
}: Props) {
  const cameraInput = useRef<HTMLInputElement>(null);
  const libraryInput = useRef<HTMLInputElement>(null);

  const [selected, setSelected] = useState<File[]>([]);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;

    const files = Array.from(fileList);

    setSelected((prev) => [...prev, ...files]);

    onFilesSelected(files);
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-800 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        📷 Add Photos
      </h2>

      {/* Hidden Inputs */}

      <input
        ref={cameraInput}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
        onChange={(e) =>
          handleFiles(e.target.files)
        }
      />

      <input
        ref={libraryInput}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) =>
          handleFiles(e.target.files)
        }
      />

      {/* Buttons */}

      <div className="grid gap-4 sm:grid-cols-2">

        <button
          onClick={() => cameraInput.current?.click()}
          className="rounded-xl bg-green-600 px-6 py-5 text-xl font-bold text-white hover:bg-green-700"
        >
          📷 Take Photo
        </button>

        <button
          onClick={() => libraryInput.current?.click()}
          className="rounded-xl bg-blue-600 px-6 py-5 text-xl font-bold text-white hover:bg-blue-700"
        >
          🖼 Choose From Library
        </button>

      </div>

      {selected.length > 0 && (

        <div className="mt-8">

          <h3 className="mb-4 text-lg font-bold text-white">
            Selected Photos ({selected.length})
          </h3>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

            {selected.map((file, index) => (

              <div
                key={index}
                className="rounded-lg bg-neutral-900 p-3 text-center text-sm text-neutral-300"
              >
                {file.name}
              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}