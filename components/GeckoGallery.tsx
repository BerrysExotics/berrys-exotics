"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  name: string;
};

export default function GeckoGallery({ images, name }: Props) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div>
      {/* Main Image */}
      <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={selected}
          alt={name}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelected(img)}
              className={`relative h-24 w-24 rounded-lg overflow-hidden border-2 transition ${
                selected === img
                  ? "border-green-500"
                  : "border-transparent"
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
      )}
    </div>
  );
}