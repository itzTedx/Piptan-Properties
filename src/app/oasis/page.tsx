import { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { BrochureDownloadButton } from "@/components/brochure-download-button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { IconArrowRight } from "@/assets/icons/arrows";
import { OasisLogo } from "@/assets/logos/oasis";

import { OASIS } from "@/data/constants";

const data = OASIS;
const defaultSiteUrl = "https://emaar-oasis.piptan.ae";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;
const pagePath = "/";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: `${data.title} | Piptan Properties`,
	description: data.amenities.description,
	keywords: [
		"The Oasis by Emaar",
		"Emaar The Oasis Dubai",
		"Oasis villas Dubai",
		"waterfront villas Dubai",
		"luxury villas by Emaar",
	],
	alternates: {
		canonical: pageUrl,
	},
	openGraph: {
		title: `${data.title} | Piptan Properties`,
		description: data.amenities.description,
		url: pageUrl,
		type: "website",
		images: [
			{
				url: data.image,
				alt: data.title,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${data.title} | Piptan Properties`,
		description: data.amenities.description,
		images: [data.image],
	},
	robots: {
		index: true,
		follow: true,
	},
	verification: {
		google: "4jnLKLwAQxiAxdxZcSMWXA3NKw3f79_By4a_AlLNCPQ",
	},
};

export default async function OasisPage() {
	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "What is The Oasis by Emaar?",
				acceptedAnswer: {
					"@type": "Answer",
					text: data.about.description,
				},
			},
			{
				"@type": "Question",
				name: "Where is The Oasis by Emaar located?",
				acceptedAnswer: {
					"@type": "Answer",
					text: data.location.description,
				},
			},
			{
				"@type": "Question",
				name: "What amenities are available at The Oasis?",
				acceptedAnswer: {
					"@type": "Answer",
					text: data.amenities.description,
				},
			},
			{
				"@type": "Question",
				name: "What is the payment plan for The Oasis by Emaar?",
				acceptedAnswer: {
					"@type": "Answer",
					text: data.paymentPlan.description,
				},
			},
		],
	} as const;

	const webPageSchema = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": `${pageUrl}#webpage`,
		url: pageUrl,
		name: `${data.title} | Piptan Properties`,
		description: data.amenities.description,
		breadcrumb: {
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: siteUrl || "/",
				},
				{
					"@type": "ListItem",
					position: 2,
					name: data.title,
					item: pageUrl,
				},
			],
		},
	} as const;

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
							<BrochureDownloadButton
								className="bg-orange-500 text-black after:from-orange-600"
								size="lg"
							/>
						</li>
					</ul>
				</nav>
			</header>

			<section aria-labelledby="oasis-hero-heading" className="relative h-svh">
				<div className="container relative z-20 mx-auto flex h-full flex-col items-start justify-end text-white">
					<div className="flex w-full flex-col items-start justify-between gap-8 px-6 py-12 md:flex-row md:items-center md:py-16">
						<div className="space-y-4">
							<h1
								className="mb-4 font-display font-medium text-6xl text-shadow-black/30 text-shadow-md sm:mb-6 sm:text-7xl md:text-8xl"
								id="oasis-hero-heading"
							>
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
				<div
					aria-hidden="true"
					className="absolute inset-x-0 bottom-0 z-10 h-[65%] bg-linear-to-t from-gray-950"
				/>
				<Image
					alt={`${data.title} luxury waterfront community hero view`}
					className="object-cover"
					fill
					src={data.image}
				/>
			</section>
			<section
				aria-labelledby="oasis-amenities-heading"
				className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
				id="amenities"
			>
				<h2
					className="font-display font-medium text-3xl sm:text-4xl"
					id="oasis-amenities-heading"
				>
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
			<section
				aria-labelledby="oasis-videos-heading"
				className="pb-12"
				id="videos"
			>
				<h2 className="sr-only" id="oasis-videos-heading">
					Project videos for {data.title}
				</h2>
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
				aria-labelledby="oasis-about-heading"
				className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:py-20 lg:grid-cols-[0.75fr_1fr] lg:px-8"
				id={data.about.slug}
			>
				<div className="relative aspect-4/3 overflow-hidden rounded-xl">
					<Image
						alt={`Interior and lifestyle at ${data.about.title}`}
						className="object-cover"
						fill
						src={data.about.image}
					/>
				</div>
				<div>
					<h2
						className="mb-2 font-bold font-display text-3xl sm:text-4xl"
						id="oasis-about-heading"
					>
						{data.about.title}
					</h2>
					<p className="mb-6 whitespace-pre-line font-light text-base sm:text-lg">
						{data.about.description}
					</p>
					<BrochureDownloadButton className="bg-orange-500 text-black after:from-orange-600" />
				</div>
			</section>
			<section
				aria-labelledby="oasis-price-heading"
				className="bg-card py-12 sm:py-16 md:py-20"
				id="price"
			>
				<div className="container mx-auto grid grid-cols-1 gap-8 px-4 text-gray-900 sm:gap-6 sm:px-6 lg:grid-cols-[1fr_0.6fr] lg:px-8">
					<div className="h-fit lg:sticky lg:top-20">
						<Badge>{data.paymentPlan.title}</Badge>
						<h2
							className="mt-4 font-display font-medium text-4xl tracking-tight sm:text-5xl"
							id="oasis-price-heading"
						>
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
				aria-labelledby="oasis-gallery-heading"
				className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8"
				id="gallery"
			>
				<Badge className="bg-white text-gray-900">Gallery</Badge>
				<h2 className="sr-only" id="oasis-gallery-heading">
					{data.title} gallery
				</h2>
				<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{data.gallery.map((img, index) => (
						<div
							className="relative aspect-5/3 overflow-hidden rounded-md"
							key={img.src}
						>
							<Image
								alt={img.alt ?? `${data.title} gallery image ${index + 1}`}
								className="object-cover transition-transform hover:scale-105"
								fill
								src={img.src}
							/>
						</div>
					))}
				</div>
			</section>
			<section
				aria-labelledby="oasis-location-heading"
				className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8"
				id={data.location.slug}
			>
				<div className="container mx-auto max-w-7xl">
					<Badge className="bg-white px-6 text-gray-900">Location</Badge>
					<div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
						<h2
							className="font-display font-medium text-4xl sm:text-5xl"
							id="oasis-location-heading"
						>
							{data.location.title}
						</h2>
						<p className="font-light text-lg text-white/80">
							{data.location.description}
						</p>
					</div>
					<div className="relative mt-12">
						<div className="relative aspect-video overflow-hidden rounded-lg">
							<Image
								alt={`${data.title} location and connectivity map`}
								fill
								src={data.location.image}
							/>
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

			<section
				aria-label="Frequently asked questions"
				className="bg-gray-950 px-4 pb-16 sm:px-6 lg:px-8"
			>
				<div className="container mx-auto max-w-4xl">
					<h2 className="mb-6 font-display font-medium text-3xl text-white sm:text-4xl">
						Frequently Asked Questions
					</h2>
					<Accordion className="space-y-4" useSemanticHTML>
						<AccordionItem
							className="rounded-lg border border-white/10 bg-white/5 px-4"
							value="about"
						>
							<AccordionTrigger className="text-white hover:text-white hover:no-underline">
								What is The Oasis by Emaar?
							</AccordionTrigger>
							<AccordionContent className="text-white/80">
								{data.about.description}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							className="rounded-lg border border-white/10 bg-white/5 px-4"
							value="location"
						>
							<AccordionTrigger className="text-white hover:text-white hover:no-underline">
								Where is The Oasis located in Dubai?
							</AccordionTrigger>
							<AccordionContent className="text-white/80">
								{data.location.description}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							className="rounded-lg border border-white/10 bg-white/5 px-4"
							value="amenities"
						>
							<AccordionTrigger className="text-white hover:text-white hover:no-underline">
								What amenities are available for residents?
							</AccordionTrigger>
							<AccordionContent className="text-white/80">
								The community offers landscaped parks, jogging tracks, access to
								pristine beaches, local mosques, open green spaces and proximity
								to four international golf courses, a clubhouse, healthcare
								centre and retail.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem
							className="rounded-lg border border-white/10 bg-white/5 px-4"
							value="payment"
						>
							<AccordionTrigger className="text-white hover:text-white hover:no-underline">
								What is the payment plan for The Oasis by Emaar?
							</AccordionTrigger>
							<AccordionContent className="text-white/80">
								{data.paymentPlan.description}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</section>

			<Script suppressHydrationWarning type="application/ld+json">
				{JSON.stringify([webPageSchema, faqSchema])}
			</Script>
		</main>
	);
}
