"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  name: string;
};

export default function GeckoGallery({
  images,
  name,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  const selected = images[current];

  function previous() {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }

  function next() {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }

      if (!open) return;

      if (e.key === "ArrowLeft") {
        previous();
      }

      if (e.key === "ArrowRight") {
        next();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <div>

        <button
          onClick={() => setOpen(true)}
          className="group relative aspect-square w-full overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl"
        >
          <Image
            src={selected}
            alt={name}
            fill
            priority
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute bottom-4 right-4 rounded-xl bg-black/70 px-3 py-2 text-sm font-semibold text-white">
            🔍 Tap to Enlarge
          </div>

        </button>

        {images.length > 1 && (
          <>
            <div className="mt-5 flex items-center justify-between">

              <button
                onClick={previous}
                className="rounded-xl bg-neutral-800 px-4 py-3 font-bold transition hover:bg-neutral-700"
              >
                ← Previous
              </button>

              <p className="text-sm text-neutral-400">
                Image {current + 1} of {images.length}
              </p>

              <button
                onClick={next}
                className="rounded-xl bg-neutral-800 px-4 py-3 font-bold transition hover:bg-neutral-700"
              >
                Next →
              </button>

            </div>

            <div className="mt-5 flex gap-3 overflow-x-auto pb-2">

              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                    current === index
                      ? "scale-105 border-emerald-500 shadow-lg shadow-emerald-500/20"
                      : "border-neutral-700 hover:border-emerald-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}

            </div>
          </>
        )}

      </div>

      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
        >
          <div className="relative h-[90vh] w-[95vw]">

            <Image
              src={selected}
              alt={name}
              fill
              className="object-contain"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-black/70 px-4 py-2 text-sm font-semibold text-white">
              Tap anywhere or press ESC to close
            </div>

          </div>
        </button>
      )}
    </>
  );
}