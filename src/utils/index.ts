export function sanitizeSubredditInput(input: string): string {
  let v = input.trim().toLowerCase();
  if (v.startsWith("r/")) v = v.slice(2);
  v = v.replace(/\s+/g, ""); // remove spaces
  return v;
}
