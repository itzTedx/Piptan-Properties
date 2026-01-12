import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { IconArrowRight } from "@/assets/icons/arrows";

import { OASIS } from "@/data/constants";

export default async function Page() {
	const data = OASIS;

	return (
		<main className="bg-stone-950 text-stone-100">
			<header className="fixed left-1/2 z-999 -translate-x-1/2 rounded-b-xl bg-stone-950 px-8 py-3 text-white shadow-sm">
				<nav>
					<ul className="flex items-center gap-6 font-medium">
						<li className="mr-6 shrink-0 whitespace-nowrap text-nowrap font-display">
							<Link href="/oasis">
								<span>Grand Polo</span>{" "}
								<span className="text-[8px]"> by EMAAR</span>
							</Link>
						</li>
						{data.sections.map((nav) => (
							<li
								className="font-display capitalize transition-colors hover:text-yellow-500"
								key={nav.slug}
							>
								<Link href={`#${nav.slug}`}>{nav.title}</Link>
							</li>
						))}
						<li className="ml-6">
							<Button className="relative inset-shadow-sm inset-shadow-white/50 z-10 overflow-hidden bg-yellow-500 px-3 font-semibold text-yellow-950 after:absolute after:inset-0 after:z-0 after:bg-linear-to-t after:from-yellow-600">
								<span className="relative z-10">Download Brochure</span>
							</Button>
						</li>
					</ul>
				</nav>
			</header>
			<section className="relative h-svh">
				<div className="container relative z-20 mx-auto flex h-full flex-col items-start justify-end text-white">
					<div className="flex w-full items-center justify-between py-16">
						<div>
							<h1 className="mb-6 font-display text-8xl text-shadow-black/30 text-shadow-md">
								{data.title}
							</h1>
							<Button className="bg-white text-stone-900" size="lg">
								Register Interest
							</Button>
						</div>
						<ul className="grid grid-cols-2 overflow-hidden rounded-md">
							<li className="flex flex-col justify-between bg-white p-4 text-stone-900">
								<h2 className="shrink-0 text-nowrap font-display font-medium text-3xl">
									3, 4 & 5 BR
								</h2>
								<p className="font-medium">Elite Villas, Prime Location</p>
								<span>Limited Availability</span>
							</li>
							<li className="text-nowrap bg-stone-950 p-4 text-stone-100">
								<h2 className="font-display font-medium text-4xl tracking-wider">
									10/70/20
								</h2>
								<p className="font-light">Payment Plan</p>
								<span className="mt-12 block">
									Starting Price <br /> Upon Request
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="absolute inset-x-0 bottom-0 z-10 h-[65%] bg-linear-to-t from-stone-950" />
				<Image alt={data.title} className="obect-cover" fill src={data.image} />
			</section>
			<section className="container mx-auto py-12" id="amenities">
				<h2 className="font-display font-medium text-4xl">Amenities</h2>
				<p className="font-medium text-xl leading-relaxed">
					The Oasis by Emaar presents a wealth of amenities designed to enrich
					resident's lives and foster a vibrant community atmosphere. Within
					this expansive master community, residents have access to beautifully
					landscaped parks, jogging tracks, and local mosques, offering serene
					spaces for relaxation. With convenient access to pristine beaches and
					a central location, leisure and exploration are effortlessly woven
					into daily life.
				</p>
				<ul className="mt-12 grid grid-cols-4 gap-4">
					<li>
						<h3 className="font-display font-medium text-2xl">
							100 million sq ft
						</h3>
						<p className="font-light text-white/70">Total Land Area</p>
					</li>
					<li>
						<h3 className="font-display font-medium text-2xl">2600</h3>
						<p className="font-light text-white/70">Villas</p>
					</li>
					<li>
						<h3 className="font-display font-medium text-2xl">
							25% of the Land
						</h3>
						<p className="font-light text-white/70">Open Spaces + Amenities</p>
					</li>
					<li>
						<h3 className="font-display font-medium text-2xl">
							4 International Golf Courses
						</h3>
						<p className="font-light text-white/70">In Close Proximity</p>
					</li>
				</ul>
			</section>
			<section
				className="container mx-auto grid grid-cols-[0.75fr_1fr] gap-12 py-12 sm:py-16 md:py-20"
				id={data.about.slug}
			>
				<div className="relative aspect-5/3 overflow-hidden rounded-xl">
					<Image
						alt={data.about.title}
						className="object-cover"
						fill
						src={data.about.image}
					/>
				</div>
				<div>
					<h2 className="mb-2 font-bold font-display text-4xl">
						{data.about.title}
					</h2>
					<p className="mb-6 font-light text-xl">{data.about.description}</p>
					<Button
						className="relative inset-shadow-sm inset-shadow-white/50 z-10 overflow-hidden bg-yellow-500 px-3 font-semibold text-yellow-950 after:absolute after:inset-0 after:z-0 after:bg-linear-to-t after:from-yellow-700"
						size="lg"
					>
						<span className="relative z-10">Download Brochure</span>
					</Button>
				</div>
			</section>

			<section className="bg-card py-12 sm:py-16 md:py-20">
				<div className="container mx-auto grid grid-cols-[1fr_0.6fr] gap-6 text-stone-900">
					<div className="sticky top-20 h-fit">
						<Badge>{data.paymentPlan.title}</Badge>
						<h2 className="mt-4 font-display font-medium text-5xl tracking-tight">
							Payment Plan
						</h2>
						<p className="mt-6 max-w-prose text-muted-foreground">
							{data.paymentPlan.description}
						</p>
						<div className="mt-9 flex gap-3">
							<Button>
								Request Payment Plan <IconArrowRight className="size-3" />
							</Button>
							<Button variant="outline">Download Brochure</Button>
						</div>
					</div>
					<ul className="flex flex-col gap-3">
						{data.paymentPlan.lists.map((list) => (
							<li
								className="grid grid-cols-2 gap-3 rounded-lg p-6 text-amber-950 odd:bg-amber-50"
								key={list.label}
							>
								<h3 className="font-display font-medium text-5xl">
									{list.value}
								</h3>
								<div>
									<h4 className="font-medium text-lg tracking-tight">
										{list.label}
									</h4>
									<p className="mt-3 font-light text-xs">{list.description}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>
			<section className="container mx-auto py-12 sm:py-16 md:py-20">
				<Badge className="bg-white text-stone-900">Gallery</Badge>
				<div className="mt-12 grid grid-cols-3 gap-6">
					{data.gallery.map((img) => (
						<div
							className="relative aspect-5/3 overflow-hidden rounded-md"
							key={img.src}
						>
							<Image alt="" className="object-cover" fill src={img.src} />
						</div>
					))}
				</div>
			</section>
			<section className="py-12 sm:py-16 md:py-20" id={data.location.slug}>
				<div className="container mx-auto max-w-7xl">
					<Badge className="bg-white px-6 text-stone-900">Location</Badge>
					<div className="mt-4 grid grid-cols-2 gap-6">
						<h2 className="font-display font-medium text-5xl">
							{data.location.title}
						</h2>
						<p className="font-light text-lg text-white/80">
							{data.location.description}
						</p>
					</div>
					<div className="relative mt-12">
						<div className="relative aspect-video overflow-hidden rounded-lg">
							<Image alt="" fill src={data.location.image} />
						</div>
						<Button
							className="absolute -right-6 -bottom-5 [a]:hover:bg-white [a]:hover:text-stone-900"
							nativeButton={false}
							render={<Link href={data.location.map as Route} />}
							size="lg"
						>
							View on Google Maps
						</Button>
					</div>
					<ul className="mx-auto mt-12 grid max-w-5xl grid-cols-4 gap-12">
						{data.location.lists.map((list) => (
							<li className="text-center" key={list.title}>
								<h3 className="mb-2 font-display font-medium text-4xl">
									{list.value}
								</h3>
								<p className="font-light">{list.title}</p>
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
}
