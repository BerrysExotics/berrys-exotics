import { createClient } from "@/lib/supabase/server";
import InquiryButtons from "@/components/InquiryButtons";

export default async function InquiriesPage() {
  const supabase = await createClient();

  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-10">
      <h1 className="text-5xl font-black mb-10">
        Customer Inquiries
      </h1>

      <div className="space-y-6">
        {inquiries?.map((inquiry) => (
          <div
            key={inquiry.id}
            className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">
                  {inquiry.gecko_name || "General Inquiry"}
                </h2>

                <p className="text-gray-400 mt-2">
                  {inquiry.name}
                </p>

                <p className="text-green-400">
                  {inquiry.email}
                </p>

                {inquiry.phone && (
                  <p className="text-gray-400">
                    {inquiry.phone}
                  </p>
                )}

                <p className="mt-4 whitespace-pre-wrap">
                  {inquiry.message}
                </p>

                <InquiryButtons id={inquiry.id} />
              </div>

              <div className="text-right">
                <span className="bg-green-700 px-3 py-1 rounded-full">
                  {inquiry.status}
                </span>

                <p className="text-sm text-gray-500 mt-4">
                  {new Date(inquiry.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}