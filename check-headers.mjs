// Prints the caching-related response headers for each route.
// Run `npm run build && npm run start` first, then `npm run check`.
const base = process.argv[2] ?? "http://localhost:3000";
const paths = ["/isr", "/api/thing", "/sitemap.xml", "/robots.txt"];
const names = ["x-nextjs-cache", "cache-control", "etag"];

for (const path of paths) {
  const res = await fetch(new URL(path, base));
  const values = names.map((n) => `${n}: ${res.headers.get(n) ?? "(none)"}`);
  console.log(`${path.padEnd(13)} ${values.join("   ")}`);
}
