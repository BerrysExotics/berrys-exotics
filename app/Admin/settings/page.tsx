import { getWebsiteSettings } from "@/lib/settings";
import { updateSettings } from "@/app/actions/settings";

export default async function WebsiteSettingsPage() {
  const settings = await getWebsiteSettings();

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">
        Website Settings
      </h1>

      <form action={updateSettings} className="space-y-6">

        <div>
          <label className="block font-medium mb-2">
            Business Name
          </label>

          <input
            name="business_name"
            defaultValue={settings.business_name ?? ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Business Email
          </label>

          <input
            name="business_email"
            type="email"
            defaultValue={settings.business_email ?? ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Instagram
          </label>

          <input
            name="instagram"
            defaultValue={settings.instagram ?? ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            TikTok
          </label>

          <input
            name="tiktok"
            defaultValue={settings.tiktok ?? ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            MorphMarket
          </label>

          <input
            name="morphmarket"
            defaultValue={settings.morphmarket ?? ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Homepage Title
          </label>

          <input
            name="homepage_title"
            defaultValue={settings.homepage_title ?? ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Homepage Subtitle
          </label>

          <textarea
            name="homepage_subtitle"
            rows={4}
            defaultValue={settings.homepage_subtitle ?? ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Save Settings
        </button>

      </form>
    </div>
  );
}