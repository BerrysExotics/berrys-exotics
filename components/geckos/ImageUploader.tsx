"use client";

import { useMemo } from "react";

import ImageDropzone from "./ImageDropzone";
import ImageCard from "./ImageCard";
import { GeckoImageItem } from "@/types/geckoImage";

type ImageUploaderProps = {
  images: GeckoImageItem[];
  setImages: React.Dispatch<React.SetStateAction<GeckoImageItem[]>>;
};

export default function ImageUploader({
  images,
  setImages,
}: ImageUploaderProps) {
  function handleFileSelect(fileList: FileList | null) {
    if (!fileList) return;

   const newImages: GeckoImageItem[] = Array.from(fileList).map(
  (file, index) => ({
    id: crypto.randomUUID(),
    file,
    image: "",
    existing: false,
    isCover: images.length === 0 && index === 0,
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
      <ImageDropzone onFilesSelected={handleFileSelect} />

      {images.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3">
          {images.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              preview={previews[index] ?? ""}
              onMakeCover={() => makeCover(index)}
              onRemove={() => removeImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}