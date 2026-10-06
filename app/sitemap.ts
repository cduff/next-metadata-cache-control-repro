import type { MetadataRoute } from "next";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://example.com/", lastModified: new Date() }];
}
