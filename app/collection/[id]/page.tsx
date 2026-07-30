import { createClient } from "@/lib/supabase/server";
import GeckoGallery from "@/components/GeckoGallery";
import Link from "next/link";
import { notFound } from "next/navigation";

type GeckoImage = {
  image: string;
  sort_order: number;
};

export default async function GeckoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: gecko, error } = await supabase
    .from("geckos")
    .select(
      `
      *,
      gecko_images (
        image,
        sort_order
      )
    `
    )
    .eq("id", id)
    .single();

  if (error || !gecko) {
    notFound();
  }

  const images: GeckoImage[] = [...(gecko.gecko_images || [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  const imageUrls =
  images.length > 0
    ? images.map((img) => img.image)
    : gecko.image
      ? [gecko.image]
      : [];

  return (
    <main className="min-h-screen bg-neutral-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Gallery */}
          <GeckoGallery
            images={imageUrls}
            name={gecko.name}
          />

          {/* Information */}
          <div>

            <h1 className="text-5xl font-black">
              {gecko.name}
            </h1>

            <p className="text-green-400 text-2xl mt-2">
              {gecko.morph}
            </p>

            <div className="mt-8 space-y-4 text-lg">

              <p>
                <strong>Species:</strong> {gecko.species}
              </p>

              <p>
                <strong>Sex:</strong> {gecko.sex}
              </p>

              <p>
                <strong>Weight:</strong>{" "}
                {gecko.weight ? `${gecko.weight} g` : "Unknown"}
              </p>

              <p>
                <strong>Hatch Date:</strong>{" "}
                {gecko.hatch_date || "Unknown"}
              </p>

              <p>
                <strong>Sire:</strong>{" "}
                {gecko.sire || "Unknown"}
              </p>

              <p>
                <strong>Dam:</strong>{" "}
                {gecko.dam || "Unknown"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="text-green-400 font-semibold">
                  {gecko.status}
                </span>
              </p>

            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-3">
                Description
              </h2>

              <p className="text-gray-300 leading-8 whitespace-pre-line">
                {gecko.description || "No description provided."}
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

              <div className="text-5xl font-black text-green-500">
                ${gecko.price}
              </div>

              <Link
                href={`/contact?gecko=${encodeURIComponent(
                  gecko.name
                )}&id=${gecko.id}`}
                className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl text-lg font-semibold transition text-center"
              >
                Inquire About This Gecko
              </Link>

            </div>

          </div>

        </div>

        <div className="mt-16">
          <Link
            href="/collection"
            className="text-green-400 hover:text-green-300 font-semibold"
          >
            ← Back to Collection
          </Link>
        </div>

      </div>
    </main>
  );
}