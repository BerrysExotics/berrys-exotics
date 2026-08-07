import Image from "next/image";
import Link from "next/link";

interface Props {
  breeder: any;
  label: string;
  color: string;
  isPublic?: boolean;
  compact?: boolean;
}

function getCoverImage(breeder: any) {
  return (
    breeder?.geckos?.gecko_images?.find(
      (img: any) => img.is_cover
    )?.image ?? null
  );
}

export default function BreederCard({
  breeder,
  label,
  color,
  isPublic = false,
  compact = false,
}: Props) {
  const image = getCoverImage(breeder);

  if (!breeder) {
    return (
      <div className="rounded-2xl bg-neutral-800 p-6 text-neutral-500">
        No breeder assigned.
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-neutral-800 p-5">

      <p
        className={`mb-4 text-xs font-bold uppercase tracking-[0.3em] ${color}`}
      >
        {label}
      </p>

      <div
        className={`relative overflow-hidden rounded-xl bg-neutral-700 ${
          compact ? "h-40" : "h-64"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={breeder.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl">
            🦎
          </div>
        )}
      </div>

      {isPublic ? (
        <h3 className="mt-5 text-2xl font-black text-white">
          {breeder.name}
        </h3>
      ) : (
        <Link href={`/Admin/breeders/${breeder.id}`}>
          <h3 className="mt-5 text-2xl font-black text-white transition hover:text-emerald-400">
            {breeder.name}
          </h3>
        </Link>
      )}

      <p className="mt-2 text-emerald-400">
        {breeder.morph}
      </p>

      <p className="text-neutral-400">
        {breeder.species}
      </p>

      <p className="mt-3 font-bold text-white">
        ⚖ {breeder.weight ?? "--"} g
      </p>

    </div>
  );
}