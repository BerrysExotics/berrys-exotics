import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-emerald-900/40 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <a href="/" className="flex items-center gap-4">
          <Image
            src="/logos/logo.png"
            alt="Berrys Exotics"
            width={70}
            height={70}
            className="rounded-full"
          />

          <div>
            <h1 className="text-2xl font-bold text-emerald-400">
              Berrys_Exotics
            </h1>
            <p className="text-xs text-gray-400">
              Premium New Caledonian Geckos
            </p>
          </div>
        </a>

        <div className="hidden gap-8 text-sm font-medium md:flex">
          <a href="/">Home</a>
          <a href="/available">Available</a>
          <a href="/collection">Collection</a>
          <a href="/pairings">Pairings</a>
          <a href="/contact">Contact</a>
        </div>

      </nav>
    </header>
  );
}