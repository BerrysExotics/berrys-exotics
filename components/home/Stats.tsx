export default function Stats() {
  const stats = [
    {
      number: "2025",
      label: "Established",
    },
    {
      number: "100%",
      label: "Captive Bred",
    },
    {
      number: "24/7",
      label: "Customer Support",
    },
    {
      number: "Healthy",
      label: "Guaranteed Animals",
    },
  ];

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <h3 className="text-5xl font-black text-green-500">
                {stat.number}
              </h3>

              <p className="text-gray-400 mt-3 uppercase tracking-widest text-sm">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}