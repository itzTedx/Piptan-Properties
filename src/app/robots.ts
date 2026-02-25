import type { MetadataRoute } from "next";

const defaultSiteUrl = "https://piptan.ae";
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;
const siteUrl = rawSiteUrl.endsWith("/") ? rawSiteUrl.slice(0, -1) : rawSiteUrl;

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${siteUrl}/sitemap.xml`,
		host: siteUrl,
	};
}
