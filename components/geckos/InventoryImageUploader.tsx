"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

interface Props {
  geckoId: string;
}

export default function InventoryImageUploader({
  geckoId,
}: Props) {
  const router = useRouter();

  const supabase = createClient();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const previews = useMemo(() => {
    return selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [selectedFiles]);

  function handleSelection(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = event.target.files;

    if (!files) return;

    setSelectedFiles((prev) => [
      ...prev,
      ...Array.from(files),
    ]);

    event.target.value = "";
  }

  function removePhoto(index: number) {
    setSelectedFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  async function uploadPhotos() {
    if (selectedFiles.length === 0) return;

    setUploading(true);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        const extension =
          file.name.split(".").pop() || "jpg";

        const fileName =
          `${geckoId}/${Date.now()}-${i}.${extension}`;

        const { error: uploadError } =
          await supabase.storage
            .from("geckos")
            .upload(fileName, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("geckos")
          .getPublicUrl(fileName);

        const { data: existing } =
          await supabase
            .from("gecko_images")
            .select("sort_order")
            .eq("gecko_id", geckoId)
            .order("sort_order", {
              ascending: false,
            })
            .limit(1)
            .maybeSingle();

        const nextOrder =
          existing?.sort_order != null
            ? existing.sort_order + 1
            : 0;

        const { error: insertError } =
          await supabase
            .from("gecko_images")
            .insert({
              gecko_id: geckoId,
              image: publicUrl,
              is_cover: nextOrder === 0,
              sort_order: nextOrder,
            });

        if (insertError) throw insertError;
      }

      alert("Images uploaded!");

      setSelectedFiles([]);

      router.refresh();
    } catch (err) {
      console.error(err);

      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-6">

      <h2 className="mb-6 text-3xl font-black">
        📷 Add Photos
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <label className="cursor-pointer rounded-xl bg-green-600 p-5 text-center text-xl font-bold hover:bg-green-700">
          📷 Take Photo

          <input
            hidden
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handleSelection}
          />
        </label>

        <label className="cursor-pointer rounded-xl bg-blue-600 p-5 text-center text-xl font-bold hover:bg-blue-700">
          🖼 Choose From Library

          <input
            hidden
            type="file"
            accept="image/*"
            multiple
            onChange={handleSelection}
          />
        </label>

      </div>

      {previews.length > 0 && (

        <>

          <h3 className="mt-8 mb-4 text-xl font-bold">
            Selected Photos
          </h3>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {previews.map((preview, index) => (

              <div
                key={index}
                className="relative overflow-hidden rounded-xl"
              >

                <img
                  src={preview.url}
                  className="aspect-square w-full object-cover"
                  alt=""
                />

                <button
                  onClick={() => removePhoto(index)}
                  className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-white"
                >
                  ✕
                </button>

              </div>

            ))}

          </div>

          <button
            onClick={uploadPhotos}
            disabled={uploading}
            className="mt-8 w-full rounded-xl bg-green-600 py-4 text-xl font-black hover:bg-green-700 disabled:opacity-50"
          >
            {uploading
              ? "Uploading..."
              : `Upload ${selectedFiles.length} Photo${selectedFiles.length === 1 ? "" : "s"}`}
          </button>

        </>

      )}

    </div>
  );
}