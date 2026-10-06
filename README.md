# Metadata routes ignore `revalidate` in their `Cache-Control` header

Reproduction for [vercel/next.js#99715](https://github.com/vercel/next.js/issues/99715).

Minimal reproduction based on [`reproduction-template`](https://github.com/vercel/next.js/tree/canary/examples/reproduction-template).

Four routes, all with `export const revalidate = 3600`:

| File                    | Type                       |
| ----------------------- | -------------------------- |
| `app/isr/page.tsx`      | ISR page (comparison)      |
| `app/api/thing/route.ts`| Route Handler (comparison) |
| `app/sitemap.ts`        | Metadata route             |
| `app/robots.ts`         | Metadata route             |

## Steps

```bash
npm install
npm run build
npm run start
# in a second terminal
npm run check
```

`npm run check` runs `check-headers.mjs`, which requests each route from `http://localhost:3000` and prints `x-nextjs-cache`, `cache-control` and `etag`.

## Result (16.4.0-canary.61, same with `--webpack` and on 16.3.8)

```
/isr          x-nextjs-cache: HIT   cache-control: s-maxage=3600, stale-while-revalidate=31532400   etag: "…"
/api/thing    x-nextjs-cache: HIT   cache-control: s-maxage=3600, stale-while-revalidate=31532400   etag: (none)
/sitemap.xml  x-nextjs-cache: HIT   cache-control: public, max-age=0, must-revalidate   etag: (none)
/robots.txt   x-nextjs-cache: HIT   cache-control: public, max-age=0, must-revalidate   etag: (none)
```

All four are prerendered and served from the Next.js cache, but only the page and the Route Handler get a `Cache-Control` header that reflects their `revalidate`.
