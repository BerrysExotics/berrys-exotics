import Link from "next/link";
import StatusBadge from "./StatusBadge";

type Props = {
  price: number | null;
  availability: string;
  geckoId: string;
  geckoName: string;
};

export default function PriceCard({
  price,
  availability,
  geckoId,
  geckoName,
}: Props) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl md:p-8">

      <div className="mb-8 flex justify-center">
        <StatusBadge status={availability} />
      </div>

      {availability === "Available" && (
        <>
          <div className="mb-8 text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
              Price
            </p>

            <h2 className="mt-3 text-5xl font-black text-emerald-400 md:text-6xl">
              {price != null ? `$${price}` : "Contact"}
            </h2>

            <p className="mt-3 text-sm text-neutral-400">
              Healthy • Captive Bred • Ready for a New Home
            </p>

          </div>

          <Link
            href={`/contact?gecko=${encodeURIComponent(
              geckoName
            )}&id=${geckoId}`}
            className="block w-full rounded-2xl bg-emerald-600 px-6 py-4 text-center text-lg font-bold text-white transition duration-200 hover:scale-[1.02] hover:bg-emerald-700"
          >
            🦎 Inquire About This Gecko
          </Link>

          <p className="mt-5 text-center text-sm leading-6 text-neutral-400">
            Questions about this gecko? We're happy to help and can provide
            additional photos, feeding information, and shipping details.
          </p>
        </>
      )}

      {availability === "On Hold" && (
        <>
          <div className="mb-8 text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
              Price
            </p>

            <h2 className="mt-3 text-5xl font-black text-emerald-400 md:text-6xl">
              {price != null ? `$${price}` : "Contact"}
            </h2>

          </div>

          <div className="rounded-2xl border border-yellow-600 bg-yellow-950/40 px-6 py-6 text-center">

            <h3 className="text-2xl font-bold text-yellow-300">
              This Gecko Is Currently On Hold
            </h3>

            <p className="mt-3 leading-7 text-neutral-300">
              Another customer currently has the first opportunity to purchase
              this gecko. Feel free to contact us if you'd like to be added to
              our backup interest list.
            </p>

          </div>
        </>
      )}

      {availability === "Sold" && (
        <div className="rounded-2xl border border-red-700 bg-red-950/30 px-6 py-8 text-center">

          <h3 className="text-3xl font-black text-red-400">
            This Gecko Has Been Sold
          </h3>

          <p className="mt-4 leading-7 text-neutral-300">
            Thank you for your interest! Be sure to check our Available Geckos
            page often as new animals are added throughout the season.
          </p>

        </div>
      )}

      {availability === "Not For Sale" && (
        <div className="rounded-2xl border border-blue-700 bg-blue-950/30 px-6 py-8 text-center">

          <h3 className="text-3xl font-black text-blue-300">
            🧬 Foundation Breeder
          </h3>

          <p className="mt-4 leading-7 text-neutral-300">
            This gecko is an important member of our breeding program and is not
            available for purchase. We proudly showcase our breeders so you can
            see the quality, structure, and genetics behind the animals we
            produce.
          </p>

        </div>
      )}

    </div>
  );
}