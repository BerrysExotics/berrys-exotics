import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Berrys_Exotics",
    short_name: "Berrys",
    description: "Breeder Management System",
    start_url: "/",
    display: "standalone",
    background_color: "#171717",
    theme_color: "#16a34a",
    orientation: "portrait",
    scope: "/",
    lang: "en-US",

    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}