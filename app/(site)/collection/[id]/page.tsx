import { createClient } from "@/lib/supabase/server";
import GeckoGallery from "@/components/gecko/GeckoGallery";
import GeckoInfo from "@/components/gecko/GeckoInfo";
import PriceCard from "@/components/gecko/PriceCard";
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
    console.error(error);
    notFound();
  }

  let sireName = gecko.sire ?? "Unknown";
  let damName = gecko.dam ?? "Unknown";

  // Look up sire by UUID
  if (gecko.sire_id) {
    const { data: sire } = await supabase
      .from("geckos")
      .select("name")
      .eq("id", gecko.sire_id)
      .single();

    if (sire?.name) {
      sireName = sire.name;
    }
  }

  // Look up dam by UUID
  if (gecko.dam_id) {
    const { data: dam } = await supabase
      .from("geckos")
      .select("name")
      .eq("id", gecko.dam_id)
      .single();

    if (dam?.name) {
      damName = dam.name;
    }
  }

  const images: GeckoImage[] = [...(gecko.gecko_images || [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  const imageUrls = images.map((img) => img.image);

  return (
    <main className="min-h-screen bg-neutral-950 pt-36 pb-16 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-12 lg:grid-cols-2">

          <div>
            <GeckoGallery
              images={imageUrls}
              name={gecko.name}
            />
          </div>

          <div className="space-y-8">

            <div>
              <h1 className="text-5xl font-black">
                {gecko.name}
              </h1>

              <p className="mt-2 text-2xl text-green-400">
                {gecko.morph}
              </p>
            </div>

            <PriceCard
              price={gecko.price}
              availability={gecko.availability}
              geckoId={gecko.id}
              geckoName={gecko.name}
            />

            <GeckoInfo
              species={gecko.species}
              morph={gecko.morph}
              sex={gecko.sex}
              weight={gecko.weight}
              hatchDate={gecko.hatch_date}
              sire={sireName}
              dam={damName}
            />

          </div>

        </div>

        <section className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">
            Description
          </h2>

          <p className="whitespace-pre-line leading-8 text-gray-300">
            {gecko.description || "No description provided."}
          </p>
        </section>

        <div className="mt-10">
          <Link
            href="/collection"
            className="font-semibold text-green-400 transition hover:text-green-300"
          >
            ← Back to Collection
          </Link>
        </div>

      </div>
    </main>
  );
}