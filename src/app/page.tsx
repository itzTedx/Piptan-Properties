import Link from "next/link";

export default function Page() {
	return (
		<main className="container mx-auto max-w-7xl py-12">
			<h1 className="font-bold text-4xl tracking-tight">Landing Page Links:</h1>
			<ul className="mt-9 space-y-4 text-xl">
				<li>
					<Link className="font-medium hover:text-yellow-700" href="/oasis">
						The Oasis
					</Link>
				</li>
				<li>
					<Link className="font-medium hover:text-yellow-700" href="/grandpolo">
						Grand Polo
					</Link>
				</li>
			</ul>
		</main>
	);
}
