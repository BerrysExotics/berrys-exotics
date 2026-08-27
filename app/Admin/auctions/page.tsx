export default function AdminAuctionsPage() {
  return (
    <main className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-black text-white">
          Auctions
        </h1>

        <p className="mt-2 text-neutral-400">
          Create and manage Berrys_Exotics auctions.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
        <h2 className="text-2xl font-bold text-white">
          Auction Management
        </h2>

        <p className="mt-3 text-neutral-400">
          Auction tools will be added here.
        </p>

        <div className="mt-6">
          <button
            type="button"
            className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
          >
            + Create Auction
          </button>
        </div>
      </div>
    </main>
  );
}