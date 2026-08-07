import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminContent from "./AdminContent";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {
  return (
    <div className="flex h-screen bg-neutral-950">

      <AdminSidebar />

      <div className="flex flex-1 flex-col">

        <AdminHeader />

        <AdminContent>
          {children}
        </AdminContent>

      </div>

    </div>
  );
}