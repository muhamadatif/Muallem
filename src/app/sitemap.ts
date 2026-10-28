import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mudaris.com";
  return [
    { url: base, lastModified: new Date("2026-01-01"), changeFrequency: "weekly", priority: 1 },
  ];
}
