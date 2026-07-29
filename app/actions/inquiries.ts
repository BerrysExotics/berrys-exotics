"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateInquiryStatus(
  id: string,
  status: string
) {
  const supabase = await createClient();

  // Get the inquiry first
  const { data: inquiry, error: inquiryError } = await supabase
    .from("inquiries")
    .select("gecko_id")
    .eq("id", id)
    .single();

  if (inquiryError) {
    console.error(inquiryError);
    throw new Error("Failed to load inquiry.");
  }

  // Update inquiry status
  const { error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to update inquiry.");
  }

  // If sold, also update the gecko
  if (status === "Sold" && inquiry?.gecko_id) {
    const { error: geckoError } = await supabase
      .from("geckos")
      .update({
        status: "Sold",
      })
      .eq("id", inquiry.gecko_id);

    if (geckoError) {
      console.error(geckoError);
    }
  }

  revalidatePath("/Admin/inquiries");
  revalidatePath("/collection");
}

export async function deleteInquiry(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("inquiries")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete inquiry.");
  }

  revalidatePath("/Admin/inquiries");
}