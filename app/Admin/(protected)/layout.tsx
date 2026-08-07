import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import AdminLayout from "@/components/admin/AdminLayout";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/Admin/login");
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}