import SectionHeader from "@/components/ui/SectionHeader";

export default function PolicyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <SectionHeader
          eyebrow="Buyer Information"
          title="Store Policy"
          description="Please read our store policy before purchasing. By placing a deposit or purchasing a gecko from Berrys_Exotics, you acknowledge that you have read and agree to the terms below."
        />

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl md:p-12">

          <div className="space-y-10">

            <section>
              <h2 className="mb-3 text-2xl font-bold text-emerald-400">
                General
              </h2>

              <p className="leading-8 text-neutral-300">
                All sales are final once they come to an end. No exchanges or
                returns once a gecko has been purchased.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-bold text-emerald-400">
                Shipping
              </h2>

              <p className="leading-8 text-neutral-300">
                Animals will be shipped Priority Overnight once paid in full.
                Shipping days are Monday through Wednesday, weather permitting.
                Weather must be safe for both the buyer and the shipper.
              </p>

              <p className="mt-4 leading-8 text-neutral-300">
                Local pickup is also available.
              </p>

              <p className="mt-4 leading-8 text-neutral-300">
                Berrys_Exotics is not responsible for carrier delays or lost
                packages. Shipping charges are never refunded. No credits or
                refunds will be issued if a carrier loses or damages a package,
                even if that results in a DOA.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-bold text-emerald-400">
                Tail Drops
              </h2>

              <p className="leading-8 text-neutral-300">
                No refunds will be given for dropped tails during shipping.
                Tail drops are a natural occurrence in crested geckos and may
                happen unexpectedly. Any tail dropped between the time of sale
                and shipping is not guaranteed or refundable.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-bold text-emerald-400">
                Deposits & Payment Plans
              </h2>

              <p className="leading-8 text-neutral-300">
                Holds require a 25% non-refundable deposit. The remaining
                balance must be paid within 96 hours.
              </p>

              <p className="mt-4 leading-8 text-neutral-300">
                Payment plans are available on purchases over $500 with a 25%
                non-refundable deposit. Animals will not ship until paid in
                full.
              </p>

              <p className="mt-4 leading-8 text-neutral-300">
                Any balance not paid by the agreed-upon date will result in the
                cancellation of the agreement. No refund or credit will be
                issued, and the gecko will be relisted for sale.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-bold text-emerald-400">
                Live Arrival & Health Guarantee
              </h2>

              <p className="leading-8 text-neutral-300">
                Please notify me within 30 minutes of delivery that your gecko
                arrived safely. If an animal arrives DOA, photos must be sent
                immediately.
              </p>

              <p className="mt-4 leading-8 text-neutral-300">
                If it is determined that the DOA was due to my error, I will work with the customer to provide a replacement gecko of comparable value, subject to availability.
              </p>

              <p className="mt-4 leading-8 text-neutral-300">
                Berrys_Exotics provides a 48-hour health guarantee after
                delivery. If any health issue occurs during that period,
                photographs, videos, and documentation from a licensed
                veterinarian are required. If it is determined the issue was not
                caused while the animal was in your care, I will replace the
                gecko with one of equal value.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-bold text-emerald-400">
                Additional Information
              </h2>

              <p className="leading-8 text-neutral-300">
                Sex is not guaranteed unless otherwise stated in the listing.
              </p>

              <p className="mt-4 leading-8 text-neutral-300">
                By purchasing from Berrys_Exotics, you acknowledge that you have
                read and agree to these terms and conditions.
              </p>
            </section>

          </div>

        </div>
      </section>
    </main>
  );
}