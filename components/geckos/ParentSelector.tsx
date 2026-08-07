"use client";

import { ParentOption } from "@/lib/geckos/getParentOptions";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;

  sex: "Male" | "Female";

  parents: ParentOption[];
}

export default function ParentSelector({
  label,
  value,
  onChange,
  sex,
  parents,
}: Props) {
  const options = parents.filter(
    (parent) => parent.sex === sex
  );

  return (
    <div>
      <label className="mb-2 block font-semibold text-white">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-neutral-800 p-4 text-white"
      >
        <option value="">
          Select {label}
        </option>

        {options.map((parent) => (
          <option
            key={parent.id}
            value={parent.id}
          >
            {parent.name}
            {" • "}
            {parent.morph || "Unknown Morph"}
          </option>
        ))}
      </select>
    </div>
  );
}