"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import GalleryGrid from "./GalleryGrid";
import GalleryToolbar from "./GalleryToolbar";

import { setCoverImage } from "@/lib/breeders/setCoverImage";
import { deleteBreederImage } from "@/lib/breeders/imageService";

interface Props {
  breederId: number;
  images: any[];
}

export default function GalleryManager({
  breederId,
  images,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function handleSetCover(imageId: number) {
    try {
      await setCoverImage(breederId, imageId);

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error(err);
      alert("Failed to set cover image.");
    }
  }

  async function handleDelete(image: any) {
    if (!confirm("Delete this image?")) return;

    try {
      await deleteBreederImage(image.image_url);

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error(err);
      alert("Failed to delete image.");
    }
  }

  return (
    <>
      <GalleryToolbar imageCount={images.length} />

      <GalleryGrid
        images={images}
        pending={pending}
        onSetCover={handleSetCover}
        onDelete={handleDelete}
      />
    </>
  );
}