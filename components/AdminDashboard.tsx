"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Stats = {
  total: number;
  available: number;
  sold: number;
  featured: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    available: 0,
    sold: 0,
    featured: 0,
  });

  async function loadStats() {
    const { data } = await supabase
      .from("geckos")
      .select("status, featured");

    if (!data) return;

    setStats({
      total: data.length,
      available: data.filter((g) => g.status === "Available").length,
      sold: data.filter((g) => g.status === "Sold").length,
      featured: data.filter((g) => g.featured).length,
    });
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <p className="text-gray-400 text-sm">Total Animals</p>
        <h2 className="text-4xl font-bold text-white mt-2">
          {stats.total}
        </h2>
      </div>

      <div className="bg-green-900/20 rounded-xl p-6 border border-green-600">
        <p className="text-green-400 text-sm">Available</p>
        <h2 className="text-4xl font-bold text-green-400 mt-2">
          {stats.available}
        </h2>
      </div>

      <div className="bg-red-900/20 rounded-xl p-6 border border-red-600">
        <p className="text-red-400 text-sm">Sold</p>
        <h2 className="text-4xl font-bold text-red-400 mt-2">
          {stats.sold}
        </h2>
      </div>

      <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-600">
        <p className="text-yellow-400 text-sm">Featured</p>
        <h2 className="text-4xl font-bold text-yellow-400 mt-2">
          {stats.featured}
        </h2>
      </div>
    </div>
  );
}