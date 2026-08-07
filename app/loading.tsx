export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">

      <div className="text-center">

        <div className="mb-8 text-7xl animate-pulse">
          🦎
        </div>

        <h1 className="text-4xl font-black text-emerald-400">
          Berrys_Exotics
        </h1>

        <p className="mt-4 text-lg text-neutral-400">
          Loading...
        </p>

        <div className="mx-auto mt-8 h-2 w-56 overflow-hidden rounded-full bg-neutral-800">

          <div className="h-full w-1/2 animate-pulse rounded-full bg-emerald-500" />

        </div>

      </div>

    </main>
  );
}