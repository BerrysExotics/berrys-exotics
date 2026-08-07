import { redirect } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";

import AdminOverview from "@/components/dashboard/AdminOverview";
import { getDashboardStats } from "@/lib/dashboard/getDashboardStats";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/Admin/login");
  }

  const stats = await getDashboardStats();

  const [{ data: featured }, { data: available }] =
    await Promise.all([
      supabase
        .from("geckos")
        .select("id")
        .eq("featured", true),

      supabase
        .from("geckos")
        .select("id")
        .eq("availability", "Available"),
    ]);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">

      {/* Header */}

      <section className="border-b border-neutral-800 bg-neutral-900">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-8">

          <div>

            <h1 className="text-5xl font-black">
              Berry's Exotics
            </h1>

            <p className="mt-2 text-lg text-neutral-400">
              Admin Dashboard
            </p>

          </div>

          <form action={logout}>

            <button className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-700">
              Logout
            </button>

          </form>

        </div>

      </section>

      <div className="mx-auto max-w-7xl space-y-16 p-10">

        {/* NEW Dashboard */}

        <AdminOverview stats={stats} />

        {/* Inventory */}

        <section>

          <h2 className="mb-6 text-3xl font-bold">
            Inventory
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

              <h3 className="mb-6 text-2xl font-bold">
                🦎 Inventory
              </h3>

              <div className="space-y-4">

                <Link
                  href="/Admin/add"
                  className="block rounded-xl bg-emerald-600 px-6 py-4 text-center text-lg font-bold transition hover:bg-emerald-700"
                >
                  ➕ Add New Gecko
                </Link>

                <Link
                  href="/Admin/inventory"
                  className="block rounded-xl bg-blue-600 px-6 py-4 text-center text-lg font-bold transition hover:bg-blue-700"
                >
                  📦 Manage Inventory
                </Link>

              </div>

            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

              <h3 className="mb-6 text-2xl font-bold">
                🌐 Website
              </h3>

              <div className="space-y-4">

                <Link
                  href="/Admin/inquiries"
                  className="block rounded-xl bg-purple-600 px-6 py-4 text-center text-lg font-bold transition hover:bg-purple-700"
                >
                  📨 Customer Inquiries
                </Link>

                <Link
                  href="/"
                  className="block rounded-xl bg-amber-600 px-6 py-4 text-center text-lg font-bold transition hover:bg-amber-700"
                >
                  🌍 View Website
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* Collection Summary */}

        <section>

          <h2 className="mb-6 text-3xl font-bold">
            Collection Summary
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

              <p className="text-neutral-400">
                Featured Animals
              </p>

              <h3 className="mt-4 text-5xl font-black text-yellow-400">
                {featured?.length ?? 0}
              </h3>

            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

              <p className="text-neutral-400">
                Available Animals
              </p>

              <h3 className="mt-4 text-5xl font-black text-green-400">
                {available?.length ?? 0}
              </h3>

            </div>

          </div>

        </section>

        {/* Future Modules */}

        <section>

          <h2 className="mb-6 text-3xl font-bold">
            Coming Soon
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-dashed border-neutral-700 p-8 text-center">

              <div className="text-5xl">
                🧬
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Genetics Tracker
              </h3>

              <p className="mt-2 text-neutral-400">
                Visual lineage, traits, and project planning.
              </p>

            </div>

            <div className="rounded-2xl border border-dashed border-neutral-700 p-8 text-center">

              <div className="text-5xl">
                📊
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Analytics
              </h3>

              <p className="mt-2 text-neutral-400">
                Growth charts, breeding performance, and sales metrics.
              </p>

            </div>

            <div className="rounded-2xl border border-dashed border-neutral-700 p-8 text-center">

              <div className="text-5xl">
                📱
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Mobile Workflow
              </h3>

              <p className="mt-2 text-neutral-400">
                One-tap weight recording, photo uploads, and daily task management.
              </p>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}