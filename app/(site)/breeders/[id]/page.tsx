import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBreederServer } from "@/lib/breeders/getBreederServer";

export default async function BreederProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const breeder = await getBreederServer(id);

  if (!breeder || !breeder.geckos) {
    notFound();
  }

  const gecko = breeder.geckos;

  const images =
    gecko.gecko_images?.sort(
      (a: any, b: any) =>
        Number(b.is_cover) - Number(a.is_cover)
    ) ?? [];

  const cover =
    images.find((img: any) => img.is_cover)?.image ??
    images[0]?.image ??
    null;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">

      {/* HERO */}

      <section className="border-b border-neutral-800 bg-neutral-900">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <Link
            href="/breeders"
            className="inline-flex rounded-xl bg-neutral-800 px-5 py-3 font-semibold hover:bg-neutral-700"
          >
            ← Back to Breeders
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">

            <div>

              <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-800">

                {cover ? (
                  <Image
                    src={cover}
                    alt={gecko.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-8xl">
                    🦎
                  </div>
                )}

              </div>

            </div>

            <div className="flex flex-col justify-center">

              <p className="uppercase tracking-[0.35em] text-emerald-400 font-semibold">
                Breeder Profile
              </p>

              <h1 className="mt-4 text-6xl font-black">
                {gecko.name}
              </h1>

              <p className="mt-4 text-2xl text-emerald-400">
                {gecko.morph}
              </p>

              <p className="mt-2 text-xl text-neutral-400">
                {gecko.species}
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6">

                <div className="rounded-2xl bg-neutral-800 p-5">
                  <p className="text-neutral-500">
                    Sex
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {gecko.sex}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-800 p-5">
                  <p className="text-neutral-500">
                    Weight
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {gecko.weight ?? "--"} g
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-800 p-5">
                  <p className="text-neutral-500">
                    Status
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-400">
                    {breeder.status}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-800 p-5">
                  <p className="text-neutral-500">
                    Gecko ID
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {gecko.id}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PHOTO GALLERY */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <h2 className="text-4xl font-black">
          Photo Gallery
        </h2>

        {images.length === 0 ? (

          <div className="mt-8 rounded-3xl bg-neutral-900 p-20 text-center">

            <div className="text-7xl">
              🦎
            </div>

            <p className="mt-6 text-xl text-neutral-400">
              No photos have been uploaded yet.
            </p>

          </div>

        ) : (

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {images.map((image: any) => (

              <div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-900"
              >

                <Image
                  src={image.image}
                  alt={gecko.name}
                  fill
                  className="object-cover transition duration-300 hover:scale-105"
                />

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}