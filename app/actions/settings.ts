"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();

  const updates = {
    business_name: formData.get("business_name") as string,
    business_email: formData.get("business_email") as string,
    instagram: formData.get("instagram") as string,
    tiktok: formData.get("tiktok") as string,
    morphmarket: formData.get("morphmarket") as string,
    homepage_title: formData.get("homepage_title") as string,
    homepage_subtitle: formData.get("homepage_subtitle") as string,
    homepage_description:
  formData.get("homepage_description") as string,
  };

  const { data, error } = await supabase
    .from("settings")
    .update(updates)
    .eq("id", 1)
    .select();

  console.log("Updated settings:", data);

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/Admin/settings");
}