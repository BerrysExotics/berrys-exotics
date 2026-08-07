"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Dashboard",
        href: "/Admin/dashboard",
      },
    ],
  },

  {
    title: "Collection",
    links: [
      {
        name: "My Collection",
        href: "/Admin/inventory",
      },
    ],
  },

  {
    title: "Breeding",
    links: [
      {
        name: "Breeding Groups",
        href: "/Admin/pairings",
      },
      {
        name: "Clutches",
        href: "/Admin/clutches",
      },
      {
        name: "Incubator",
        href: "/Admin/incubator",
      },
      {
        name: "Hatchlings",
        href: "/Admin/hatchlings",
      },
      {
        name: "Weights",
        href: "/Admin/weights",
      },
    ],
  },

  {
    title: "Customer",
    links: [
      {
        name: "Inquiries",
        href: "/Admin/inquiries",
      },
    ],
  },

  {
    title: "Website",
    links: [
      {
        name: "Settings",
        href: "/Admin/settings",
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-neutral-800 bg-neutral-950">

      <div className="border-b border-neutral-800 p-6">

        <h1 className="text-2xl font-black text-white">
          Berrys_Exotics
        </h1>

        <p className="mt-1 text-sm text-neutral-400">
          Breeder Management
        </p>

      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {sections.map((section) => (
          <div
            key={section.title}
            className="mb-8"
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
              {section.title}
            </h2>

            <div className="space-y-2">

              {section.links.map((link) => {
                const active =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-xl px-4 py-3 font-medium transition ${
                      active
                        ? "bg-emerald-600 text-white"
                        : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

            </div>
          </div>
        ))}

      </div>

    </aside>
  );
}