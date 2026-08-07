"use client";

import GalleryImage from "./GalleryImage";

interface Props {
  images: any[];
  pending: boolean;
  onSetCover: (imageId: number) => void;
  onDelete: (image: any) => void;
}

export default function GalleryGrid({
  images,
  pending,
  onSetCover,
  onDelete,
}: Props) {
  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-700 p-16 text-center text-neutral-400">
        No images uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {images.map((image) => (
        <GalleryImage
          key={image.id}
          image={image}
          pending={pending}
          onSetCover={() => onSetCover(image.id)}
          onDelete={() => onDelete(image)}
        />
      ))}
    </div>
  );
}