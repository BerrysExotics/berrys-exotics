"use client";

interface Props {
  image: any;
  pending: boolean;
  onSetCover: () => void;
  onDelete: () => void;
}

export default function GalleryImage({
  image,
  pending,
  onSetCover,
  onDelete,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-2xl">

      <div className="relative overflow-hidden">

        <img
          src={image.image_url}
          alt={image.caption || "Gallery Image"}
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {image.is_cover && (
          <div className="absolute left-4 top-4 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black shadow-lg">
            ⭐ Cover Photo
          </div>
        )}

      </div>

      <div className="space-y-4 p-5">

        {image.caption && (
          <p className="line-clamp-2 text-sm text-neutral-400">
            {image.caption}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={onSetCover}
            disabled={pending || image.is_cover}
            className="rounded-xl bg-emerald-600 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ⭐ Cover
          </button>

          <button
            onClick={onDelete}
            disabled={pending}
            className="rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            🗑 Delete
          </button>

        </div>

      </div>

    </div>
  );
}