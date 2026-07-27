"use client";

import { useState } from "react";
import { supabase } from "@/Lib/supabase";

export default function AddGecko() {
  const [image, setImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    species: "",
    morph: "",
    sex: "",
    weight: "",
    price: "",
    hatch_date: "",
    sire: "",
    dam: "",
    description: "",
    status: "Available",
    featured: false,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      let imageUrl = "";

      // Upload image
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("geckos")
          .upload(fileName, image);

        if (uploadError) {
          alert(JSON.stringify(uploadError, null, 2));
          return;
        }

        const { data } = supabase.storage
          .from("geckos")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      // Save to database
      const { data, error } = await supabase
        .from("geckos")
        .insert([
          {
            name: form.name,
            species: form.species,
            morph: form.morph,
            sex: form.sex,
            weight: Number(form.weight),
            price: Number(form.price),
            hatch_date: form.hatch_date || null,
            sire: form.sire,
            dam: form.dam,
            description: form.description,
            status: form.status,
            featured: form.featured,
            image: imageUrl,
          },
        ])
        .select();

      console.log("Inserted:", data);
      console.log("Supabase Error:", error);

      if (error) {
        alert(JSON.stringify(error, null, 2));
        return;
      }

      alert("Gecko added successfully!");

      setForm({
        name: "",
        species: "",
        morph: "",
        sex: "",
        weight: "",
        price: "",
        hatch_date: "",
        sire: "",
        dam: "",
        description: "",
        status: "Available",
        featured: false,
      });

      setImage(null);
    } catch (err) {
      console.error(err);
      alert(JSON.stringify(err, null, 2));
    }
  }

  return (
    <main className="min-h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Add New Gecko
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-6"
      >
        <input
          className="w-full p-3 rounded bg-neutral-800"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select
          className="w-full p-3 rounded bg-neutral-800"
          name="species"
          value={form.species}
          onChange={handleChange}
          required
        >
          <option value="">Select Species</option>
          <option>Leachianus</option>
          <option>Crested</option>
          <option>Gargoyle</option>
          <option>Chahoua</option>
        </select>

        <input
          className="w-full p-3 rounded bg-neutral-800"
          placeholder="Morph"
          name="morph"
          value={form.morph}
          onChange={handleChange}
        />

        <select
          className="w-full p-3 rounded bg-neutral-800"
          name="sex"
          value={form.sex}
          onChange={handleChange}
        >
          <option value="">Sex</option>
          <option>Male</option>
          <option>Female</option>
          <option>Probable Male</option>
          <option>Probable Female</option>
        </select>

        <input
          className="w-full p-3 rounded bg-neutral-800"
          placeholder="Weight (grams)"
          name="weight"
          type="number"
          value={form.weight}
          onChange={handleChange}
        />

        <input
          className="w-full p-3 rounded bg-neutral-800"
          placeholder="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="date"
          className="w-full p-3 rounded bg-neutral-800"
          name="hatch_date"
          value={form.hatch_date}
          onChange={handleChange}
        />

        <input
          className="w-full p-3 rounded bg-neutral-800"
          placeholder="Sire"
          name="sire"
          value={form.sire}
          onChange={handleChange}
        />

        <input
          className="w-full p-3 rounded bg-neutral-800"
          placeholder="Dam"
          name="dam"
          value={form.dam}
          onChange={handleChange}
        />

        <textarea
          className="w-full p-3 rounded bg-neutral-800 h-40"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <div>
          <label className="block mb-2 font-semibold">
            Gecko Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>

        <select
          className="w-full p-3 rounded bg-neutral-800"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Available</option>
          <option>On Hold</option>
          <option>Sold</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded font-bold"
        >
          Save Gecko
        </button>
      </form>
    </main>
  );
}