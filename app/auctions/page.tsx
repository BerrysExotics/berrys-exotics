export default function AuctionsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">
            Berrys_Exotics
          </p>

          <h1 className="text-5xl font-black">
            Auctions
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            Upcoming and active Berrys_Exotics auctions will appear here.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-10 text-center">
          <div className="text-6xl">
            🦎
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            No Active Auctions
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-neutral-400">
            There are currently no active auctions. Check back soon for
            upcoming Berrys_Exotics auctions.
          </p>
        </div>

      </div>
    </main>
  );
}