import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import InventoryImageUploader from "@/components/geckos/InventoryImageUploader";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InventoryGalleryPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: gecko, error } = await supabase
    .from("geckos")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !gecko) {
    notFound();
  }

  const { data: images } = await supabase
    .from("gecko_images")
    .select("*")
    .eq("gecko_id", id)
    .order("sort_order", {
      ascending: true,
    });

  return (
    <main className="min-h-screen bg-neutral-900 pt-36 pb-12 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <Link
          href={`/Admin/inventory/${id}`}
          className="inline-flex rounded-lg bg-neutral-800 px-4 py-2 hover:bg-neutral-700"
        >
          ← Back to Gecko
        </Link>

        <div className="mt-8">
          <h1 className="text-5xl font-black">
            Gallery
          </h1>

          <p className="mt-2 text-neutral-400">
            {gecko.name}
          </p>
        </div>

        <div className="mt-10">
          <InventoryImageUploader
            geckoId={id}
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {images?.map((image: any) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800"
            >
              <Image
                src={image.image}
                alt={gecko.name}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />

              <div className="p-4">

                {image.is_cover && (
                  <div className="mb-3 inline-block rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold text-black">
                    ⭐ Cover Image
                  </div>
                )}

                <div className="space-y-2">

                  <button
                    className="w-full rounded-lg bg-yellow-500 py-2 font-bold text-black"
                  >
                    Set Cover
                  </button>

                  <button
                    className="w-full rounded-lg bg-red-600 py-2 font-bold text-white"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

          {(!images || images.length === 0) && (
            <div className="col-span-3 rounded-xl border border-dashed border-neutral-700 p-12 text-center text-neutral-500">
              No images uploaded yet.
            </div>
          )}

        </div>

      </div>
    </main>
  );
}