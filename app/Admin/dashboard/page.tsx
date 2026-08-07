import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-neutral-900 p-10 text-white">
      <h1 className="mb-10 text-5xl font-bold">
        Admin Dashboard
      </h1>

      <Link
        href="/Admin/inventory/add"
        className="rounded bg-green-600 px-6 py-3 font-bold transition hover:bg-green-700"
      >
        ➕ Add Gecko
      </Link>
    </main>
  );
}