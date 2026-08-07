import { notFound } from "next/navigation";

import HatchlingImageUploader from "@/components/hatchlings/HatchlingImageUploader";
import HatchlingImageCard from "@/components/hatchlings/HatchlingImageCard";
import MoveToInventoryButton from "@/components/hatchlings/MoveToInventoryButton";

import { getHatchling } from "@/lib/hatchlings/getHatchling";
import { getHatchlingImages } from "@/lib/hatchlings/getHatchlingImages";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function HatchlingGalleryPage({
  params,
}: Props) {
  const { id } = await params;

  const hatchling = await getHatchling(Number(id));

  if (!hatchling) {
    notFound();
  }

  const images = await getHatchlingImages(hatchling.id);

  return (
    <div className="space-y-8">

      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-4xl font-black text-white">
            Gallery
          </h1>

          <p className="mt-2 text-neutral-400">
            {hatchling.name ||
              `Hatchling #${hatchling.hatchling_number}`}
          </p>
        </div>

        <MoveToInventoryButton
          hatchlingId={hatchling.id}
          transferred={hatchling.transferred}
        />

      </div>

      <HatchlingImageUploader
        hatchlingId={hatchling.id}
      />

      <div className="grid gap-6 md:grid-cols-3">

        {images.map((image: any) => (
          <HatchlingImageCard
            key={image.id}
            image={image}
          />
        ))}

        {images.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-700 p-10 text-center text-neutral-500 md:col-span-3">
            No images uploaded yet.
          </div>
        )}

      </div>

    </div>
  );
}