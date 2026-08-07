"use client";

import Link from "next/link";

import { logout } from "@/app/actions/auth";

export default function AdminHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-neutral-800 bg-neutral-950 px-8">

      <div>
        <h1 className="text-2xl font-black text-white">
          Admin Dashboard
        </h1>

        <p className="text-sm text-neutral-400">
          Manage your breeding collection
        </p>
      </div>

      <div className="flex items-center gap-4">

        <Link
          href="/Admin/inventory/add"
          className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          + Add Gecko
        </Link>

        <Link
          href="/Admin/pairings/add"
          className="rounded-xl border border-neutral-700 px-5 py-3 font-semibold text-white transition hover:bg-neutral-900"
        >
          + Breeding Group
        </Link>

        <form action={logout}>
          <button
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </form>

      </div>

    </header>
  );
}