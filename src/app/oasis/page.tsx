import { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { BrochureDownloadButton } from "@/components/brochure-download-button";
import { RequestPaymentPlanDialog } from "@/components/request-payment-plan-dialog";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { OasisLogo } from "@/assets/logos/oasis";

import { OASIS } from "@/data/constants";

const data = OASIS;
const clientCopy = {
	overview:
		"The Oasis by Emaar is a large-scale luxury real estate development by Emaar Properties in Dubai, United Arab Emirates. Announced in 2023, it is one of Emaar’s most ambitious waterfront villa communities, blending green landscapes, lagoons, and resort-style living for global and local investors.",
	masterplan:
		"Spanning over 100 million square feet, The Oasis is master-planned around tranquil canals, crystal lagoons, and lush parks. The community features villas, mansions, and premium residences designed by world‑renowned architects, integrating contemporary architecture with nature-focused urban planning close to Downtown Dubai and Dubai Marina.",
	lifestyle:
		"Residents at The Oasis will enjoy a resort-inspired lifestyle with access to multiple lagoons, swimming pools, retail promenades, and fine-dining venues. Jogging and cycling tracks, landscaped gardens, and exclusive clubhouses create a wellness-focused environment that feels like a private retreat within the city.",
	investment:
		"The Oasis reinforces Dubai’s position as a prime destination for global real estate investment, particularly for waterfront and villa-focused communities. Emaar’s large-scale, integrated approach positions The Oasis as a long-term, blue-chip asset that aligns with the emirate’s strategy to attract high-net-worth individuals and lifestyle-led buyers.",
	status:
		"As of 2024, The Oasis is in its early development phase, with plot releases and initial villa launches underway. Completion will roll out over several stages, as infrastructure, amenities, and community facilities are built out over the coming years.",
} as const;

const clientKeyFacts = [
	{ label: "Developer", value: "Emaar Properties" },
	{ label: "Location", value: "Dubai, United Arab Emirates" },
	{ label: "Launch year", value: "2023" },
	{ label: "Total investment", value: "Approx. USD 20 billion" },
	{ label: "Community size", value: "≈ 100 million sq ft" },
	{ label: "Lifestyle focus", value: "Waterfront & resort-style living" },
] as const;

const defaultSiteUrl = "https://emaar-oasis.piptan.ae";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;
const pagePath = "/";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: data.meta.title,
	description: data.meta.description,
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
		title: data.meta.title,
		description: data.meta.description,
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
		title: data.meta.title,
		description: data.meta.description,
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
					text: clientCopy.overview,
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
				name: "What amenities and lifestyle are available at The Oasis?",
				acceptedAnswer: {
					"@type": "Answer",
					text: clientCopy.lifestyle,
				},
			},
			{
				"@type": "Question",
				name: "Why is The Oasis by Emaar a strong investment opportunity?",
				acceptedAnswer: {
					"@type": "Answer",
					text: clientCopy.investment,
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
		name: data.meta.title,
		description: data.meta.description,
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
								projectImage={data.image}
								projectName={data.title}
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
				aria-labelledby="oasis-overview-heading"
				className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20"
				id="overview"
			>
				<div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
					<div className="h-fit md:sticky md:top-28">
						<Badge className="bg-white/95 px-4 py-1 font-semibold text-gray-900 text-xs uppercase tracking-[0.22em]">
							The Oasis by Emaar
						</Badge>
						<h2
							className="mt-5 font-display font-medium text-3xl tracking-tight sm:text-4xl md:text-5xl"
							id="oasis-overview-heading"
						>
							Luxury waterfront living in Dubai
						</h2>
						<p className="mt-5 text-lg text-white/85 leading-relaxed">
							{clientCopy.overview}
						</p>
						<p className="mt-4 text-base text-white/75 leading-relaxed">
							{clientCopy.masterplan}
						</p>
					</div>
					<aside
						aria-label="Key facts about The Oasis"
						className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-8"
					>
						<h3 className="font-display font-medium text-white text-xl sm:text-2xl">
							Key facts
						</h3>
						<p className="mt-2 text-sm text-white/60">
							An exclusive, resort-style community centred around water,
							greenery, and high-design villas by Emaar.
						</p>
						<dl className="mt-4 grid grid-cols-2 gap-4 md:mt-6">
							{clientKeyFacts.map((fact) => (
								<div
									className="rounded-xl border border-white/10 bg-black/30 p-4"
									key={fact.label}
								>
									<dt className="font-semibold text-[0.7rem] text-white/55 uppercase tracking-[0.22em]">
										{fact.label}
									</dt>
									<dd className="mt-2 font-medium text-base text-white">
										{fact.value}
									</dd>
								</div>
							))}
						</dl>
					</aside>
				</div>
			</section>
			<section
				aria-labelledby="oasis-amenities-heading"
				className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
				id="amenities"
			>
				<Badge className="bg-white px-4 py-1 font-semibold text-gray-900 text-xs uppercase tracking-[0.22em]">
					Lifestyle &amp; amenities
				</Badge>
				<h2
					className="mt-4 font-display font-medium text-3xl sm:text-4xl"
					id="oasis-amenities-heading"
				>
					{data.amenities.title}
				</h2>
				<p className="mt-4 font-medium text-lg text-white/85 leading-relaxed sm:text-xl">
					{clientCopy.lifestyle}
				</p>
				<p className="mt-4 font-light text-base text-white/75 leading-relaxed sm:text-lg">
					{data.amenities.description}
				</p>
				<ul className="mt-6 grid grid-cols-2 gap-4 sm:mt-12 md:mt-8 lg:grid-cols-4">
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
					<BrochureDownloadButton
						className="bg-orange-500 text-black after:from-orange-600"
						projectImage={data.about.image}
						projectName={data.title}
					/>
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
							<RequestPaymentPlanDialog />
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
			<div className="border-border/20 border-y bg-stone-900/70 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
				<div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
					<section
						aria-labelledby="oasis-market-heading"
						id="market-significance"
					>
						<div className="container mx-auto max-w-5xl">
							<Badge className="bg-white px-4 py-1 font-semibold text-gray-900 text-xs uppercase tracking-[0.22em]">
								Investment &amp; market significance
							</Badge>
							<h2
								className="mt-4 font-display font-medium text-3xl text-white tracking-tight sm:text-4xl"
								id="oasis-market-heading"
							>
								A landmark, waterfront community by Emaar
							</h2>
							<p className="mt-5 text-lg text-white/85 leading-relaxed">
								{clientCopy.investment}
							</p>
							<h3 className="mt-8 font-display text-2xl text-white sm:text-3xl">
								Current status &amp; delivery timeline
							</h3>
							<p className="mt-3 text-base text-white/80 leading-relaxed">
								{clientCopy.status}
							</p>
						</div>
					</section>
					<section
						aria-label="Frequently asked questions"
						className="px-4 pb-16 sm:px-6 lg:px-8"
					>
						<div className="container mx-auto max-w-xl">
							<h2 className="mb-6 font-display font-medium text-3xl text-white sm:text-4xl">
								Frequently Asked Questions
							</h2>
							<Accordion className="space-y-4" defaultValue={["about"]}>
								<AccordionItem
									className="rounded-lg border border-white/10 bg-white/5 px-4"
									value="about"
								>
									<AccordionTrigger className="text-white hover:text-white hover:no-underline">
										What is The Oasis by Emaar?
									</AccordionTrigger>
									<AccordionContent className="text-white/80">
										{clientCopy.overview}
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
										What amenities and lifestyle are available for residents?
									</AccordionTrigger>
									<AccordionContent className="text-white/80">
										{clientCopy.lifestyle}
									</AccordionContent>
								</AccordionItem>
								<AccordionItem
									className="rounded-lg border border-white/10 bg-white/5 px-4"
									value="investment"
								>
									<AccordionTrigger className="text-white hover:text-white hover:no-underline">
										Why is The Oasis by Emaar a strong investment opportunity?
									</AccordionTrigger>
									<AccordionContent className="text-white/80">
										{clientCopy.investment}
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
				</div>
			</div>

			<Script suppressHydrationWarning type="application/ld+json">
				{JSON.stringify([webPageSchema, faqSchema])}
			</Script>
		</main>
	);
}
