"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Berrys Exotics Admin
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <Link
          href="/Admin/add"
          className="bg-green-600 hover:bg-green-700 p-8 rounded-xl text-center text-2xl font-bold transition"
        >
          ➕ Add Gecko
        </Link>

        <Link
          href="/Admin/inventory"
          className="bg-blue-600 hover:bg-blue-700 p-8 rounded-xl text-center text-2xl font-bold transition"
        >
          🦎 Inventory Manager
        </Link>

        <Link
          href="/collection"
          className="bg-purple-600 hover:bg-purple-700 p-8 rounded-xl text-center text-2xl font-bold transition"
        >
          🌎 View Website
        </Link>

      </div>

    </main>
  );
}