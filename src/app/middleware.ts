// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const hostname = request.headers.get("host") || "";

	// Extract subdomain
	const subdomain = hostname.split(".")[0];

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
		if (!path.startsWith(targetPath)) {
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
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next/static|_next/image|favicon.ico).*)",
	],
};
