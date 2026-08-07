import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

import SectionHeader from "@/components/ui/SectionHeader";

export default async function FeaturedGeckos() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("geckos")
    .select(`
      id,
      name,
      morph,
      sex,
      price,
      status,
      gecko_images (
        image,
        is_cover
      )
    `)
    .eq("featured", true)
    .eq("availability", "Available")
.eq("listed", true)
.order("created_at", { ascending: false });

  if (error) {
    console.error(error);

    return (
      <section className="py-24 bg-neutral-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Featured Geckos
        </h2>

        <p>Unable to load featured geckos.</p>
      </section>
    );
  }

  const geckos =
    data?.map((gecko: any) => {
      const cover =
        gecko.gecko_images?.find((img: any) => img.is_cover) ??
        gecko.gecko_images?.[0];

      return {
        ...gecko,
        coverImage: cover?.image ?? null,
      };
    }) ?? [];

  return (
    <section className="bg-neutral-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          eyebrow="Available Now"
          title="Featured Geckos"
          description="Explore a selection of exceptional geckos from our current collection. Every animal is raised with care, exceptional genetics, and a commitment to lifelong customer support."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {geckos.map((gecko) => (
            <Link
              key={gecko.id}
              href={`/collection/${gecko.id}`}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-neutral-800
                bg-neutral-900
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-emerald-500/40
                hover:shadow-2xl
                hover:shadow-emerald-500/20
              "
            >
              <div className="relative h-72 overflow-hidden bg-neutral-800">
                {gecko.coverImage ? (
                  <Image
                    src={gecko.coverImage}
                    alt={gecko.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl">
                    🦎
                  </div>
                )}
              </div>

              <div className="space-y-4 p-6">

                <div>
                  <h3 className="text-2xl font-bold transition group-hover:text-emerald-400">
                    {gecko.name}
                  </h3>

                  <p className="mt-1 text-emerald-400">
                    {gecko.morph}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-300">
                    {gecko.sex}
                  </span>

                  <span className="text-2xl font-bold text-white">
                    {gecko.price != null
                      ? `$${gecko.price}`
                      : "Contact"}
                  </span>
                </div>

                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      gecko.status === "Available"
                        ? "bg-green-600"
                        : gecko.status === "Hold"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-600"
                    }`}
                  >
                    {gecko.status}
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}