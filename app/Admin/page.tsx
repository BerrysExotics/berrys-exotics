"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        Berrys Exotics Admin
      </h1>

      <div className="grid gap-6 md:grid-cols-2">

        <Link
          href="/Admin/add"
          className="bg-green-600 hover:bg-green-700 p-8 rounded-xl text-center text-2xl font-bold transition"
        >
          ➕ Add New Gecko
        </Link>

        <Link
          href="/collection"
          className="bg-blue-600 hover:bg-blue-700 p-8 rounded-xl text-center text-2xl font-bold transition"
        >
          🦎 View Collection
        </Link>

      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">
          Coming Soon
        </h2>

        <div className="space-y-3 text-neutral-300">

          <p>✏ Edit Geckos</p>

          <p>🗑 Delete Geckos</p>

          <p>⭐ Featured Animals</p>

          <p>📦 Orders</p>

          <p>📈 Inventory</p>

          <p>🥚 Breeding Records</p>

        </div>
      </div>
    </main>
  );
}