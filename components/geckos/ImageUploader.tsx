"use client";

import { useMemo, useRef } from "react";

import { GeckoImageItem } from "@/types/geckoImage";

type ImageUploaderProps = {
  images: GeckoImageItem[];
  setImages: React.Dispatch<React.SetStateAction<GeckoImageItem[]>>;
};

export default function ImageUploader({
  images,
  setImages,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(fileList: FileList | null) {
    if (!fileList) return;

   const newImages: GeckoImageItem[] = Array.from(fileList).map(
  (file, index) => ({
    file,
    image: "",
    existing: false,
    isCover:
      images.length === 0 && index === 0,
  })
);

    setImages((prev) => [...prev, ...newImages]);
  }

  function removeImage(index: number) {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      if (
        updated.length > 0 &&
        !updated.some((img) => img.isCover)
      ) {
        updated[0].isCover = true;
      }

      return [...updated];
    });
  }

  function makeCover(index: number) {
    setImages((prev) =>
      prev.map((image, i) => ({
        ...image,
        isCover: i === index,
      }))
    );
  }

  const previews = useMemo(() => {
    return images.map((image) => {
      if (image.existing) return image.image;

      if (image.file) {
        return URL.createObjectURL(image.file);
      }

      return "";
    });
  }, [images]);
    return (
    <div className="space-y-6">
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-green-600 p-10 text-center transition hover:bg-neutral-900"
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

      {images.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-neutral-900"
            >
              <img
                src={previews[index]}
                alt={`Gecko ${index + 1}`}
                className="h-52 w-full object-cover"
              />

              <div className="space-y-3 p-4">
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    checked={image.isCover}
                    onChange={() => makeCover(index)}
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