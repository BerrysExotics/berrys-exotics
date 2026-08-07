import Link from "next/link";

import GalleryManager from "@/components/gallery/GalleryManager";

import { getBreederImages } from "@/lib/breeders/getBreederImages";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function GalleryPage({
  params,
}: Props) {
  const { id } = await params;

  const breederId = Number(id);

  const images = await getBreederImages(breederId);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-white">
            Breeder Gallery
          </h1>

          <p className="mt-2 text-neutral-400">
            Manage breeder images.
          </p>
        </div>

        <Link
          href="/Admin/breeders/manage"
          className="rounded-xl bg-neutral-800 px-6 py-3 font-semibold text-white transition hover:bg-neutral-700"
        >
          ← Back
        </Link>
      </div>

      <GalleryManager
        breederId={breederId}
        images={images}
      />
    </div>
  );
}