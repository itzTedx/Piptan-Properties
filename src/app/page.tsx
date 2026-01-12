import Link from "next/link";

export default function Page() {
	return (
		<div className="container max-w-7xl">
			<h1>Links:</h1>

			<ul>
				<li>
					<Link href="/oasis">Oasis</Link>
				</li>
				<li>
					<Link href="/grand-polo">Grand Polo</Link>
				</li>
			</ul>
		</div>
	);
}
