import { MetadataRoute } from "next";

const defaultSiteUrl = "https://piptan.ae";

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date().toISOString();

	return [
		{
			url: defaultSiteUrl,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: "https://emaar-oasis.piptan.ae/",
			lastModified,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: "https://emaar-grandpolo.piptan.ae/",
			lastModified,
			changeFrequency: "weekly",
			priority: 0.9,
		},
	];
}
