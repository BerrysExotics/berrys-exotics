import Image from "next/image";
import Link from "next/link";

interface Props {
  male: any;
}

export default function PublicMaleCard({
  male,
}: Props) {
  const coverImage =
    male?.geckos?.gecko_images?.find(
      (img: any) => img.is_cover
    )?.image ?? null;

  return (
    <div className="rounded-3xl border border-blue-700 bg-neutral-900 p-8">

      <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
        ♂ Male
      </p>

      <Link
        href={`/breeders/${male?.gecko_id}`}
        className="block"
      >

        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-800">

          {coverImage ? (
            <Image
              src={coverImage}
              alt={male?.name}
              fill
              className="object-cover transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-7xl">
              🦎
            </div>
          )}

        </div>

        <h2 className="mt-6 text-4xl font-black transition hover:text-emerald-400">
          {male?.name}
        </h2>

      </Link>

      <p className="mt-3 text-xl text-emerald-400">
        {male?.morph}
      </p>

      <p className="mt-2 text-neutral-400">
        {male?.species}
      </p>

      <p className="mt-6 text-xl font-bold text-white">
        ⚖ {male?.weight ?? "--"} g
      </p>

    </div>
  );
}