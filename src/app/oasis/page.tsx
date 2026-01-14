import { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { BrouchreDownloadButton } from "@/components/brochure-download-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { IconArrowRight } from "@/assets/icons/arrows";
import { OasisLogo } from "@/assets/logos/oasis";

import { OASIS } from "@/data/constants";

const data = OASIS;

export const metadata: Metadata = {
	title: data.title,
	description: data.amenities.description,
};

export default async function OasisPage() {
	return (
		<main className="bg-gray-950 text-gray-100">
			<header className="fixed left-1/2 z-999 w-[90%] -translate-x-1/2 rounded-b-xl bg-gray-950 px-4 py-3 text-white shadow-sm sm:w-auto sm:px-8">
				<nav>
					<ul className="flex items-center gap-6 font-medium sm:justify-center">
						<li className="mr-6 shrink-0 whitespace-nowrap text-nowrap font-display">
							<Link href="/">
								<OasisLogo className="h-7 w-auto md:h-9" />
							</Link>
						</li>
						{data.sections.map((nav) => (
							<li
								className="hidden font-display capitalize transition-colors hover:text-orange-500 sm:block"
								key={nav.slug}
							>
								<Link href={`#${nav.slug}`}>{nav.title}</Link>
							</li>
						))}
						<li className="ml-auto sm:ml-6">
							<BrouchreDownloadButton
								className="bg-orange-500 text-black after:from-orange-600"
								size="lg"
							/>
						</li>
					</ul>
				</nav>
			</header>

			<section className="relative h-svh">
				<div className="container relative z-20 mx-auto flex h-full flex-col items-start justify-end text-white">
					<div className="flex w-full flex-col items-start justify-between gap-8 px-6 py-12 md:flex-row md:items-center md:py-16">
						<div className="space-y-4">
							<h1 className="mb-4 font-display font-medium text-6xl text-shadow-black/30 text-shadow-md sm:mb-6 sm:text-7xl md:text-8xl">
								{data.title}
							</h1>
							<Button className="bg-white text-gray-900" size="lg">
								Register Interest
							</Button>
						</div>
						<ul className="grid grid-cols-2 overflow-hidden rounded-md">
							<li className="flex flex-col justify-between bg-white p-4 text-gray-900">
								<h2 className="shrink-0 text-nowrap font-display font-medium text-2xl sm:text-3xl">
									3, 4 & 5 BR
								</h2>
								<p className="font-medium">Elite Villas, Prime Location</p>
								<span>Limited Availability</span>
							</li>
							<li className="text-nowrap bg-gray-950 p-4 text-gray-100">
								<h2 className="font-display font-medium text-3xl tracking-wider sm:text-4xl">
									10/70/20
								</h2>
								<p className="font-light">Payment Plan</p>
								<span className="mt-8 block sm:mt-12 md:mt-20">
									Starting Price <br /> Upon Request
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="absolute inset-x-0 bottom-0 z-10 h-[65%] bg-linear-to-t from-gray-950" />
				<Image
					alt={data.title}
					className="object-cover"
					fill
					src={data.image}
				/>
			</section>
			<section
				className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
				id="amenities"
			>
				<h2 className="font-display font-medium text-3xl sm:text-4xl">
					{data.amenities.title}
				</h2>
				<p className="mt-4 font-medium text-lg leading-relaxed sm:text-xl">
					{data.amenities.description}
				</p>
				<ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
					{data.amenities.lists.map((list) => (
						<li key={list.label}>
							<h3 className="font-display font-medium text-2xl">
								{list.value}
							</h3>
							<p className="font-light text-white/70">{list.label}</p>
						</li>
					))}
				</ul>
			</section>
			<section id="videos">
				<video
					autoPlay
					className="aspect-video"
					crossOrigin="anonymous"
					loop
					muted
					slot="media"
					src="/oasis/the-oasis.webm"
					title="Intro Video"
				/>
			</section>
			<section
				className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:py-20 lg:grid-cols-[0.75fr_1fr] lg:px-8"
				id={data.about.slug}
			>
				<div className="relative aspect-4/3 overflow-hidden rounded-xl">
					<Image
						alt={data.about.title}
						className="object-cover"
						fill
						src={data.about.image}
					/>
				</div>
				<div>
					<h2 className="mb-2 font-bold font-display text-3xl sm:text-4xl">
						{data.about.title}
					</h2>
					<p className="mb-6 whitespace-pre-line font-light text-base sm:text-lg">
						{data.about.description}
					</p>
					<BrouchreDownloadButton className="bg-orange-500 text-black after:from-orange-600" />
				</div>
			</section>
			<section className="bg-card py-12 sm:py-16 md:py-20" id="price">
				<div className="container mx-auto grid grid-cols-1 gap-8 px-4 text-gray-900 sm:gap-6 sm:px-6 lg:grid-cols-[1fr_0.6fr] lg:px-8">
					<div className="h-fit lg:sticky lg:top-20">
						<Badge>{data.paymentPlan.title}</Badge>
						<h2 className="mt-4 font-display font-medium text-4xl tracking-tight sm:text-5xl">
							Payment Plan
						</h2>
						<p className="mt-6 max-w-prose text-muted-foreground">
							{data.paymentPlan.description}
						</p>
						<div className="mt-9 flex flex-wrap gap-3">
							<Button>
								Request Payment Plan <IconArrowRight className="size-3" />
							</Button>
							<Button variant="outline">Download Brochure</Button>
						</div>
					</div>
					<ul className="flex flex-col gap-3">
						{data.paymentPlan.lists.map((list) => (
							<li
								className="grid grid-cols-1 gap-3 rounded-lg p-6 text-orange-950 odd:bg-orange-50 sm:grid-cols-2"
								key={list.label}
							>
								<h3 className="font-display font-medium text-4xl sm:text-5xl">
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
			<section
				className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8"
				id="gallery"
			>
				<Badge className="bg-white text-gray-900">Gallery</Badge>
				<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{data.gallery.map((img) => (
						<div
							className="relative aspect-5/3 overflow-hidden rounded-md"
							key={img.src}
						>
							<Image
								alt=""
								className="object-cover transition-transform hover:scale-105"
								fill
								src={img.src}
							/>
						</div>
					))}
				</div>
			</section>
			<section
				className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8"
				id={data.location.slug}
			>
				<div className="container mx-auto max-w-7xl">
					<Badge className="bg-white px-6 text-gray-900">Location</Badge>
					<div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
						<h2 className="font-display font-medium text-4xl sm:text-5xl">
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
							className="absolute right-4 -bottom-5 sm:-right-6 [a]:hover:bg-white [a]:hover:text-gray-900"
							nativeButton={false}
							render={<Link href={data.location.map as Route} />}
							size="lg"
						>
							View on Google Maps
						</Button>
					</div>
					<ul className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
						{data.location.lists.map((list) => (
							<li className="text-center" key={list.title}>
								<h3 className="mb-2 font-display font-medium text-3xl sm:text-4xl">
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
