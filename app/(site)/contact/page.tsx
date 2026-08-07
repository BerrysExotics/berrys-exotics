"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const searchParams = useSearchParams();

  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gecko: "",
    geckoId: "",
    message: "",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      gecko: searchParams.get("gecko") || "",
      geckoId: searchParams.get("id") || "",
    }));
  }, [searchParams]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSending(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setSending(false);

    if (response.ok) {
      alert("Inquiry sent successfully! We'll get back to you soon.");

      setForm((prev) => ({
        ...prev,
        name: "",
        email: "",
        phone: "",
        message: "",
      }));
    } else {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-black text-green-500 mb-4">
          Contact Berrys Exotics
        </h1>

        <p className="text-gray-400 mb-12 text-lg">
          Interested in one of our geckos? Fill out the form below and we'll
          get back to you as soon as possible.
        </p>

        <div className="grid lg:grid-cols-2 gap-16">

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-neutral-900 p-8 rounded-2xl"
          >
            <div>
              <label className="block mb-2 font-semibold">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-neutral-800 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-neutral-800 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Phone (Optional)
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-neutral-800 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Gecko Interested In
              </label>
              <input
                name="gecko"
                value={form.gecko}
                onChange={handleChange}
                className="w-full bg-neutral-800 rounded-xl p-4"
              />
            </div>

            <input
              type="hidden"
              name="geckoId"
              value={form.geckoId}
            />

            <div>
              <label className="block mb-2 font-semibold">Message</label>
              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full bg-neutral-800 rounded-xl p-4"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 transition w-full py-4 rounded-xl font-bold text-lg"
            >
              {sending ? "Sending..." : "Send Inquiry"}
            </button>
          </form>

          <div>
            <div className="bg-neutral-900 rounded-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold mb-6">
                Contact Information
              </h2>

              <div className="space-y-5 text-lg">
                <div>
                  📧 Email
                  <br />
                  <span className="text-gray-400">
                    berrys.exotics25@gmail.com
                  </span>
                </div>

                <div>
                  📱 Instagram and TikTok
                  <br />
                  <span className="text-gray-400">
                    @berrys_exotics & @berrys_exotics25
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">
                Reserve a Gecko
              </h2>

              <p className="text-gray-300 mb-6">
                A 25% non-refundable deposit reserves your gecko until paid in full for pickup
                or shipping. Payment plans available for purchases over $500. Priority overnight shipping costs not included in price
              </p>

              <div className="space-y-4 text-lg">
                <div>💚 Zelle</div>
                <div>🍎 Apple Pay</div>
                <div>💜 Venmo</div>
                <div>💲 Cash App</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}