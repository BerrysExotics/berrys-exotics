"use client";

import {
  updateInquiryStatus,
  deleteInquiry,
} from "@/app/actions/inquiries";

interface InquiryButtonsProps {
  id: string;
}

export default function InquiryButtons({
  id,
}: InquiryButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-5">

      <button
        onClick={() => updateInquiryStatus(id, "Contacted")}
        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition"
      >
        Contacted
      </button>

      <button
        onClick={() => updateInquiryStatus(id, "Reserved")}
        className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
      >
        Reserved
      </button>

      <button
        onClick={() => updateInquiryStatus(id, "Sold")}
        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 font-semibold transition"
      >
        Sold
      </button>

      <button
        onClick={() => {
          if (confirm("Delete this inquiry?")) {
            deleteInquiry(id);
          }
        }}
        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 font-semibold transition"
      >
        Delete
      </button>

    </div>
  );
}