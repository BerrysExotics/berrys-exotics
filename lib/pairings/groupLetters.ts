export function nextGroupLetter(existing: string[]): string {
  if (existing.length === 0) return "A";

  const normalized = existing
    .map((g) => g.toUpperCase())
    .sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      }

      return a.localeCompare(b);
    });

  const last = normalized[normalized.length - 1];

  const char = last[0];

  if (last.split("").every((c) => c === char)) {
    if (char === "Z") {
      return "AA";
    }

    const next = String.fromCharCode(
      char.charCodeAt(0) + 1
    );

    return next;
  }

  return "A";
}