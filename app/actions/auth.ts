"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  console.log("LOGIN ACTION STARTED");

  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.log("LOGIN FAILED");
    redirect("/Admin/login");
  }

  console.log("LOGIN SUCCESS");

  redirect("/Admin");
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/Admin/login");
}