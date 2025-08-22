export function formatPathToTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "dashboard";

  return last
    .replace(/-/g, " ") // handle kebab-case
    .replace(/\b\w/g, (l) => l.toUpperCase()); // capitalize each word
}
