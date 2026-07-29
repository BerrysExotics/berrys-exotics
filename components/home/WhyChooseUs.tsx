export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Premium Genetics",
      description:
        "Carefully selected bloodlines producing healthy, vibrant New Caledonian geckos with exceptional structure and color.",
      icon: "🧬",
    },
    {
      title: "Captive Bred",
      description:
        "Every gecko is bred and raised in-house with proper nutrition, supplements, and daily care from hatchling to adulthood.",
      icon: "🥚",
    },
    {
      title: "Healthy & Well Started",
      description:
        "We only offer animals that are eating consistently, thriving, and ready to transition successfully into their new homes.",
      icon: "🦎",
    },
    {
      title: "Customer Support",
      description:
        "Whether you're purchasing your first gecko or expanding your collection, we're here to provide guidance before and after every sale.",
      icon: "🤝",
    },
  ];

  return (
    <section className="bg-neutral-900 py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Why Choose
            <span className="text-green-500"> Berrys Exotics?</span>
          </h2>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            We are dedicated to producing healthy, captive-bred New
            Caledonian geckos while providing honest customer service,
            exceptional genetics, and lifelong support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700 hover:border-green-500 hover:scale-105 transition duration-300 shadow-lg"
            >
              <div className="text-5xl mb-5">
                {reason.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {reason.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {reason.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}