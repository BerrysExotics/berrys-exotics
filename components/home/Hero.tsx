import Link from "next/link";
export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/backgrounds/jungle-background.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          Berrys Exotics
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-8">
          Premium Crested Geckos • Leachianus Geckos • Quality You Can Trust
        </p>

        <Link
  href="/collection"
  className="inline-block bg-green-600 hover:bg-green-700 px-8 py-4 rounded-full text-lg font-semibold transition"
>
  View Available Geckos
</Link>
      </div>
    </section>
  );
}