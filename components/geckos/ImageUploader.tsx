"use client";

import { useRef } from "react";

type ImageUploaderProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  coverIndex: number;
  setCoverIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function ImageUploader({
  files,
  setFiles,
  coverIndex,
  setCoverIndex,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(fileList: FileList | null) {
    if (!fileList) return;

    const newFiles = Array.from(fileList);

    setFiles((prev) => [...prev, ...newFiles]);
  }

  function removeImage(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));

    if (coverIndex === index) {
      setCoverIndex(0);
    } else if (coverIndex > index) {
      setCoverIndex((prev) => prev - 1);
    }
  }

  return (
    <div className="space-y-6">
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-green-600 p-10 text-center hover:bg-neutral-900 transition"
      >
        <h2 className="text-2xl font-bold text-white">
          Upload Gecko Images
        </h2>

        <p className="mt-2 text-gray-400">
          Click here to select one or more photos
        </p>

        <input
          ref={inputRef}
          hidden
          multiple
          accept="image/*"
          type="file"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-neutral-900"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-52 w-full object-cover"
              />

              <div className="space-y-3 p-4">
                <p className="truncate text-sm text-white">
                  {file.name}
                </p>

                <label className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    checked={coverIndex === index}
                    onChange={() => setCoverIndex(index)}
                  />

                  Cover Image
                </label>

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="w-full rounded-lg bg-red-600 py-2 font-semibold text-white hover:bg-red-700"
                >
                  Remove Image
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}