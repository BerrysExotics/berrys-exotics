import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      gecko,
      geckoId,
      message,
    } = await req.json();

    // Create Supabase client
    const supabase = await createClient();

    // Save inquiry to database
    const { error: dbError } = await supabase
      .from("inquiries")
      .insert([
        {
          name,
          email,
          phone,
          gecko_name: gecko,
          gecko_id: geckoId || null,
          message,
        },
      ]);

    if (dbError) {
      console.error("Database Error:", dbError);

      return NextResponse.json(
        { error: "Failed to save inquiry." },
        { status: 500 }
      );
    }

    // Send email notification
    const { error } = await resend.emails.send({
      from: "Berrys Exotics <onboarding@resend.dev>",
      to: "berrys.exotics25@gmail.com",
      subject: `New Gecko Inquiry - ${gecko || "General Inquiry"}`,
      html: `
        <h2>New Inquiry from Berrys Exotics Website</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Gecko:</strong> ${gecko || "General Inquiry"}</p>

        <hr>

        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Email Error:", error);

      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}