import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { getAllServiceSlugs } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceSlugs = getAllServiceSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:             absoluteUrl("/"),
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        1.0,
    },
    {
      url:             absoluteUrl("/get-quote"),
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.9,
    },
    {
      url:             absoluteUrl("/pricing"),
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    },
    {
      url:             absoluteUrl("/about"),
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.6,
    },
    {
      url:             absoluteUrl("/contact"),
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.6,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url:             absoluteUrl(`/services/${slug}`),
    lastModified:    new Date(),
    changeFrequency: "monthly" as const,
    priority:        0.85,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
