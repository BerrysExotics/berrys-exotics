import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">

      <div className="max-w-2xl text-center">

        <div className="text-8xl">
          🦎
        </div>

        <h1 className="mt-8 text-5xl font-black text-emerald-400 md:text-6xl">
          Looks Like This Gecko Escaped!
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-400">
          Sorry, the page you're looking for doesn't exist or may have been
          moved. Don't worry—you can head back to the homepage or browse our
          available geckos.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">

          <Link
            href="/"
            className="rounded-2xl bg-emerald-600 px-8 py-4 font-bold transition hover:bg-emerald-700"
          >
            🏠 Home
          </Link>

          <Link
            href="/collection"
            className="rounded-2xl border border-neutral-700 px-8 py-4 font-bold transition hover:border-emerald-500 hover:bg-neutral-900"
          >
            🦎 Available Geckos
          </Link>

          <Link
            href="/contact"
            className="rounded-2xl border border-neutral-700 px-8 py-4 font-bold transition hover:border-emerald-500 hover:bg-neutral-900"
          >
            ✉ Contact
          </Link>

        </div>

      </div>

    </main>
  );
}