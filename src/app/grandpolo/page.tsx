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

import { GrandPoloLogo } from "@/assets/logos/grand-polo";

import { GRAND_POLO } from "@/data/constants";

const data = GRAND_POLO;

const clientCopy = {
	overview:
		"Grand Polo by Emaar is a premium residential community in Dubai built around a unique polo and equestrian lifestyle. The development features luxury villas and townhouses set within landscaped surroundings, with polo fields and equestrian facilities forming an important part of the community.",
	concept:
		"The project is designed for buyers who want more space, privacy and a quieter residential environment without giving up access to the rest of Dubai. Residents can enjoy green open areas, leisure facilities and a community setting centred around polo and outdoor living.",
		forBuyers: "For property buyers and investors, Grand Polo also presents an opportunity to consider a premium Emaar development in Dubai's expanding residential market. A *property investment advisor in Dubai* can help investors understand the project, compare available properties and assess factors such as location, demand and potential long-term value before making an investment decision.",
	location:
		"Located near Emaar’s established neighborhoods such as Arabian Ranches and Dubai Polo & Equestrian Club, Grand Polo offers direct access to Emirates Road and Al Qudra Road, placing residents close to top schools, retail centers, and everyday conveniences while preserving a resort-style atmosphere.",
	lifestyle:
		"The development’s amenities are expected to include polo fields, stables, landscaped parks, clubhouses, and wellness facilities, catering to residents who value an active outdoor lifestyle with refined recreational options, privacy, and a strong sense of community.",
	market:
		"Grand Polo extends Emaar’s portfolio of themed luxury projects and reinforces its leadership in master-planned communities across Dubai. The project reflects the city’s ongoing demand for integrated, lifestyle-led residential destinations that blend nature, sport, and contemporary urban living.",
} as const;

const clientKeyFacts = [
	{ label: "Developer", value: "Emaar Properties" },
	{ label: "Location", value: "Dubai, United Arab Emirates" },
	{ label: "Community type", value: "Luxury residential villas & townhouses" },
	{ label: "Lifestyle theme", value: "Polo & equestrian-inspired living" },
	{ label: "Status", value: "Planned / under development" },
] as const;

const defaultSiteUrl = "https://emaar-grandpolo.piptan.ae";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;
const pagePath = "/";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: data.meta.title,
	description: data.meta.description,
	keywords: [
		"Grand Polo by Emaar",
		"Emaar Grand Polo Dubai",
		"equestrian community Dubai",
		"luxury villas Grand Polo",
		"Emaar polo villas",
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

export default async function Page() {
	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "What is Grand Polo by Emaar?",
				acceptedAnswer: {
					"@type": "Answer",
					text: clientCopy.overview,
				},
			},
			{
				"@type": "Question",
				name: "Where is Emaar Grand Polo located?",
				acceptedAnswer: {
					"@type": "Answer",
					text: clientCopy.location,
				},
			},
			{
				"@type": "Question",
				name: "What amenities are offered at Grand Polo?",
				acceptedAnswer: {
					"@type": "Answer",
					text: clientCopy.lifestyle,
				},
			},
			{
				"@type": "Question",
				name: "What is the payment plan for Grand Polo by Emaar?",
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
		<main className="bg-stone-950 text-stone-100">
			<header className="fixed left-1/2 z-999 w-[90%] -translate-x-1/2 rounded-b-xl bg-stone-950 px-4 py-3 text-white shadow-sm sm:w-auto sm:px-8">
				<nav aria-label="Primary">
					<ul className="flex items-center gap-6 font-medium sm:justify-center">
						<li className="mr-6 shrink-0 whitespace-nowrap text-nowrap font-display">
							<Link href="/">
								<GrandPoloLogo className="h-7 w-auto md:h-9" />
							</Link>
						</li>
						{data.sections.map((nav) => (
							<li
								className="hidden font-display capitalize transition-colors hover:text-yellow-500 sm:block"
								key={nav.slug}
							>
								<Link href={`#${nav.slug}`}>{nav.title}</Link>
							</li>
						))}
						<li className="ml-auto sm:ml-6">
							<BrochureDownloadButton
								className="bg-yellow-500 text-stone-950 after:from-yellow-600"
								projectImage={data.image}
								projectName={data.title}
							/>
						</li>
					</ul>
				</nav>
			</header>

			<section
				aria-labelledby="grandpolo-hero-heading"
				className="relative h-svh"
			>
				<div className="container relative z-20 mx-auto flex h-full flex-col items-start justify-end text-white">
					<div className="flex w-full flex-col items-start justify-between gap-8 px-6 py-12 md:flex-row md:items-center md:py-16">
						<div className="space-y-4">
							<h1
								className="mb-4 font-display font-medium text-6xl text-shadow-black/30 text-shadow-md sm:mb-6 sm:text-7xl md:text-8xl"
								id="grandpolo-hero-heading"
							>
								{data.title}
							</h1>
							<Button className="bg-white text-stone-900" size="lg">
								Register Interest
							</Button>
						</div>
						<ul className="grid grid-cols-2 overflow-hidden rounded-md">
							<li className="flex flex-col justify-between bg-white p-4 text-stone-900">
								<h2 className="shrink-0 text-nowrap font-display font-medium text-2xl sm:text-3xl">
									3, 4 & 5 BR
								</h2>
								<p className="font-medium">Elite Villas, Prime Location</p>
								<span>Limited Availability</span>
							</li>
							<li className="text-nowrap bg-stone-950 p-4 text-stone-100">
								<h2 className="font-display font-medium text-3xl tracking-wider sm:text-4xl">
									80/20
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
					className="absolute inset-x-0 bottom-0 z-10 h-[65%] bg-linear-to-t from-stone-950"
				/>
				<video
					autoPlay
					className="absolute inset-0 size-full object-cover"
					crossOrigin="anonymous"
					loop
					muted
					slot="media"
					src="/grand-polo/hero-video.webm"
					title="Intro Video"
				/>
				{/* <Image
					alt={data.title}
					className="object-cover"
					fill
					quality={100}
					sizes="100vw"
					src={data.image}
				/> */}
			</section>
			<section
				aria-labelledby="grandpolo-overview-heading"
				className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20"
				id="overview"
			>
				<div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
					<div className="h-fit md:sticky md:top-28">
						<Badge className="bg-white/95 px-4 py-1 font-semibold text-stone-900 text-xs uppercase tracking-[0.22em]">
							Grand Polo by Emaar
						</Badge>
						<h2
							className="mt-5 font-display font-medium text-3xl tracking-tight sm:text-4xl md:text-5xl"
							id="grandpolo-overview-heading"
						>
							Luxury polo-inspired living in Dubai
						</h2>
						<p className="mt-5 text-lg text-white/85 leading-relaxed">
							{clientCopy.overview}
						</p>
						<p className="mt-4 text-base text-white/70 leading-relaxed">
							{clientCopy.concept}
						</p>
						<p className="mt-4 text-base text-white/70 leading-relaxed">
							{clientCopy.forBuyers}
						</p>
					</div>
					<aside
						aria-label="Key facts about Grand Polo"
						className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-8"
					>
						<h3 className="font-display font-medium text-white text-xl sm:text-2xl">
							Key facts
						</h3>
						<p className="mt-2 text-sm text-white/60">
							A boutique, equestrian-inspired community crafted around space,
							privacy, and resort-style green living.
						</p>
						<dl className="mt-6 grid grid-cols-2 gap-4">
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
				aria-labelledby="grandpolo-videos-heading"
				className="pb-12"
				id="videos"
			>
				<h2 className="sr-only" id="grandpolo-videos-heading">
					Project videos for {data.title}
				</h2>
				<video
					autoPlay
					className="aspect-video w-full"
					crossOrigin="anonymous"
					loop
					muted
					slot="media"
					src="/grand-polo/grand-polo-community.mp4"
					title="Intro Video"
				/>
			</section>
			<section
				aria-labelledby="grandpolo-amenities-heading"
				className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
				id="amenities"
			>
				<Badge className="bg-white px-4 py-1 font-semibold text-stone-900 text-xs uppercase tracking-[0.22em]">
					Lifestyle &amp; amenities
				</Badge>
				<h2
					className="mt-4 font-display font-medium text-3xl sm:text-4xl"
					id="grandpolo-amenities-heading"
				>
					{data.amenities.title}
				</h2>
				<p className="mt-4 font-medium text-lg text-white/85 leading-relaxed sm:text-xl">
					{clientCopy.lifestyle}
				</p>
				<p className="mt-4 font-light text-base text-white/75 leading-relaxed sm:text-lg">
					{data.amenities.description}
				</p>
				<ul className="mt-8 grid grid-cols-2 gap-6 sm:mt-12 lg:grid-cols-4">
					{data.amenities.lists.map((list) => (
						<li key={list.value}>
							<h3 className="font-display font-medium text-2xl">
								{list.value}
							</h3>
							<p className="font-light text-white/70">{list.label}</p>
						</li>
					))}
				</ul>
			</section>

			<section
				aria-labelledby="grandpolo-about-heading"
				className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:py-20 lg:grid-cols-[0.75fr_1fr] lg:px-8"
				id={data.about.slug}
			>
				<div className="relative aspect-4/3 overflow-hidden rounded-xl">
					<Image
						alt={`Equestrian lifestyle at ${data.title}`}
						className="object-cover"
						fill
						src={data.about.image}
					/>
				</div>
				<div>
					<h2
						className="mb-3 font-bold font-display text-3xl sm:text-4xl"
						id="grandpolo-about-heading"
					>
						{data.about.title}
					</h2>
					<p className="mb-6 whitespace-pre-line font-light text-base sm:text-lg">
						{data.about.description}
					</p>
					<BrochureDownloadButton
						className="bg-yellow-500 text-stone-950 after:from-yellow-600"
						projectImage={data.about.image}
						projectName={data.title}
					/>
				</div>
			</section>
			<section
				aria-labelledby="grandpolo-price-heading"
				className="bg-card py-12 sm:py-16 md:py-20"
				id="price"
			>
				<div className="container mx-auto grid grid-cols-1 gap-8 px-4 text-stone-900 sm:gap-6 sm:px-6 lg:grid-cols-[1fr_0.6fr] lg:px-8">
					<div className="h-fit lg:sticky lg:top-20">
						<Badge>{data.paymentPlan.title}</Badge>
						<h2
							className="mt-4 font-display font-medium text-4xl tracking-tight sm:text-5xl"
							id="grandpolo-price-heading"
						>
							Payment Plan
						</h2>
						<p className="mt-6 max-w-prose text-muted-foreground">
							{data.paymentPlan.description}
						</p>
						<div className="mt-9 flex flex-wrap gap-3">
							<RequestPaymentPlanDialog projectName={data.title} />
							<Button variant="outline">Download Brochure</Button>
						</div>
					</div>
					<ul className="flex flex-col gap-3">
						{data.paymentPlan.lists.map((list) => (
							<li
								className="grid grid-cols-1 gap-3 rounded-lg p-6 text-yellow-950 odd:bg-yellow-50 sm:grid-cols-2"
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
				aria-labelledby="grandpolo-gallery-heading"
				className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8"
				id="gallery"
			>
				<Badge className="bg-white text-stone-900">Gallery</Badge>
				<h2 className="sr-only" id="grandpolo-gallery-heading">
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
				aria-labelledby="grandpolo-location-heading"
				className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8"
				id={data.location.slug}
			>
				<div className="container mx-auto max-w-7xl">
					<Badge className="bg-white px-6 text-stone-900">Location</Badge>
					<div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
						<h2
							className="font-display font-medium text-4xl sm:text-5xl"
							id="grandpolo-location-heading"
						>
							{data.location.title}
						</h2>
						<div className="space-y-4 text-lg text-white/80">
							<p>{clientCopy.location}</p>
							<p className="font-light text-base text-white/75 sm:text-lg">
								{data.location.description}
							</p>
						</div>
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
							className="absolute right-4 -bottom-5 sm:-right-6 [a]:hover:bg-white [a]:hover:text-stone-900"
							nativeButton={false}
							render={
								<Link
									href={data.location.map as Route}
									rel="external nofollow"
									target="_blank"
								/>
							}
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
						aria-labelledby="grandpolo-market-heading"
						id="market-significance"
					>
						<Badge className="bg-white px-4 py-1 font-semibold text-stone-900 text-xs uppercase tracking-[0.22em]">
							Market significance
						</Badge>
						<h2
							className="mt-4 font-display font-medium text-3xl text-white tracking-tight sm:text-4xl"
							id="grandpolo-market-heading"
						>
							A flagship, lifestyle-led community by Emaar
						</h2>
						<p className="mt-5 text-lg text-white/85 leading-relaxed">
							{clientCopy.market}
						</p>
					</section>
					<section aria-label="Frequently asked questions">
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
										What is Grand Polo by Emaar?
									</AccordionTrigger>
									<AccordionContent className="text-white/80">
										{data.amenities.description}
									</AccordionContent>
								</AccordionItem>
								<AccordionItem
									className="rounded-lg border border-white/10 bg-white/5 px-4"
									value="location"
								>
									<AccordionTrigger className="text-white hover:text-white hover:no-underline">
										Where is Grand Polo located in Dubai?
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
										What amenities are available for residents at Grand Polo?
									</AccordionTrigger>
									<AccordionContent className="text-white/80">
										The master community spans over 5.54 million sq m and
										includes vast open spaces, polo fields, stables, a
										clubhouse, mixed-use areas and a wide range of premium
										residential clusters.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem
									className="rounded-lg border border-white/10 bg-white/5 px-4"
									value="payment"
								>
									<AccordionTrigger className="text-white hover:text-white hover:no-underline">
										What is the payment plan for Grand Polo by Emaar?
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
