export default function FeaturedGeckos() {
  return (
    <section className="py-24 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Geckos
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-neutral-800 rounded-2xl p-6 text-center"
            >
              <div className="h-56 bg-neutral-700 rounded-xl mb-4 flex items-center justify-center">
                Image Coming Soon
              </div>

              <h3 className="text-2xl font-semibold mb-2">
                Gecko #{item}
              </h3>

              <p className="text-gray-300">
                Premium captive-bred gecko from Berrys Exotics.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}