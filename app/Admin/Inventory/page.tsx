"use client";

import GeckoList from "@/components/GeckoList";

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Inventory Manager
      </h1>

      <GeckoList />
    </main>
  );
}