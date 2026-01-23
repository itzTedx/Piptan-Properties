import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
	const hostname = request.headers.get("host") || "";

	// Extract subdomain
	const subdomain = hostname.split(".")[0];

	console.log("received subdomain: ", subdomain);

	// Map subdomains to routes
	const subdomainMap: Record<string, string> = {
		"emaar-oasis": "/oasis",
		"emaar-grandpolo": "/grandpolo",
	};

	// If subdomain matches, rewrite to the appropriate path
	if (subdomain in subdomainMap) {
		const path = request.nextUrl.pathname;
		const targetPath = subdomainMap[subdomain];

		// Only rewrite if not already on the target path
		// Also exclude static assets and Next.js internals
		if (!path.startsWith(targetPath) && !path.startsWith("/_next")) {
			const url = request.nextUrl.clone();
			url.pathname = `${targetPath}${path === "/" ? "" : path}`;
			return NextResponse.rewrite(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - Files with extensions (images, videos, fonts, etc.)
		 */
		"/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\..*).*)",
	],
};
