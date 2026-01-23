import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,

	typedRoutes: true,

	typescript: {
		ignoreBuildErrors: true,
	},

	images: {
		qualities: [85, 100],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.piptan.ae",
			},
			{
				protocol: "http",
				hostname: "localhost",
			},
		],
	},

	experimental: {
		// Enable filesystem caching for `next dev`
		turbopackFileSystemCacheForDev: true,
		// Enable filesystem caching for `next build`
		turbopackFileSystemCacheForBuild: true,
	},
	// Allow multiple domains
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
				],
			},
		];
	},
};

export default nextConfig;
