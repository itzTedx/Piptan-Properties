import { NextResponse } from "next/server";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export async function GET() {
	const filePath = join(process.cwd(), "public", "llms.txt");
	const text = await readFile(filePath, "utf8");

	return new NextResponse(text, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
