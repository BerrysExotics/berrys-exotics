import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/Admin/login");
  }

  const [{ count: geckoCount }, { count: inquiryCount }] =
    await Promise.all([
      supabase
        .from("geckos")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("inquiries")
        .select("*", { count: "exact", head: true }),
    ]);

  return (
    <main className="min-h-screen bg-neutral-900 text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold">
          Berrys Exotics Admin
        </h1>

        <form action={logout}>
          <button
            className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-bold"
          >
            Logout
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <div className="bg-neutral-800 rounded-xl p-8">
          <h2 className="text-gray-400 text-xl">
            Total Geckos
          </h2>

          <p className="text-5xl font-black mt-3">
            {geckoCount ?? 0}
          </p>
        </div>

        <div className="bg-neutral-800 rounded-xl p-8">
          <h2 className="text-gray-400 text-xl">
            Customer Inquiries
          </h2>

          <p className="text-5xl font-black mt-3">
            {inquiryCount ?? 0}
          </p>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Link
          href="/Admin/add"
          className="bg-green-600 hover:bg-green-700 p-8 rounded-xl text-center text-2xl font-bold"
        >
          ➕ Add New Gecko
        </Link>

        <Link
          href="/Admin/inventory"
          className="bg-blue-600 hover:bg-blue-700 p-8 rounded-xl text-center text-2xl font-bold"
        >
          📦 Inventory
        </Link>

        <Link
          href="/Admin/inquiries"
          className="bg-purple-600 hover:bg-purple-700 p-8 rounded-xl text-center text-2xl font-bold"
        >
          📨 Customer Inquiries
        </Link>

        <Link
          href="/collection"
          className="bg-emerald-600 hover:bg-emerald-700 p-8 rounded-xl text-center text-2xl font-bold"
        >
          🌐 View Website
        </Link>

      </div>
    </main>
  );
}