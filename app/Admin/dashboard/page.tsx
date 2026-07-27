import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">Admin Dashboard</h1>

      <Link
        href="/admin/add"
        className="bg-green-600 px-6 py-3 rounded"
      >
        Add Gecko
      </Link>
    </main>
  );
}