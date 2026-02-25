"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createContext, useContext } from "react";

import { cn } from "@/lib/utils";

const SemanticAccordionContext = createContext(false);

function Accordion({
	className,
	useSemanticHTML = false,
	...props
}: AccordionPrimitive.Root.Props & { useSemanticHTML?: boolean }) {
	return (
		<SemanticAccordionContext.Provider value={useSemanticHTML}>
			<AccordionPrimitive.Root
				className={cn("flex w-full flex-col", className)}
				data-slot="accordion"
				{...props}
			/>
		</SemanticAccordionContext.Provider>
	);
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
	const useSemanticHTML = useContext(SemanticAccordionContext);

	return (
		<AccordionPrimitive.Item
			className={cn("not-last:border-b", className)}
			data-slot="accordion-item"
			render={
				useSemanticHTML
					? (itemProps: React.HTMLAttributes<HTMLElement>, state: { open?: boolean }) => (
							<details {...itemProps} open={state?.open} />
						)
					: undefined
			}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: AccordionPrimitive.Trigger.Props) {
	const useSemanticHTML = useContext(SemanticAccordionContext);

	const triggerContent = (
		<>
			{children}
			<HugeiconsIcon
				className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground"
				data-slot="accordion-trigger-icon"
				icon={ArrowDown01Icon}
				strokeWidth={2}
			/>
			<HugeiconsIcon
				className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground"
				data-slot="accordion-trigger-icon"
				icon={ArrowUp01Icon}
				strokeWidth={2}
			/>
		</>
	);

	if (useSemanticHTML) {
		return (
			<AccordionPrimitive.Trigger
				className={cn(
					"group/accordion-trigger relative flex flex-1 cursor-pointer list-none items-start justify-between rounded-lg border border-transparent py-2.5 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 [&::-webkit-details-marker]:hidden",
					className
				)}
				data-slot="accordion-trigger"
				nativeButton={false}
				render={(triggerProps: React.HTMLAttributes<HTMLElement>) => (
					<summary {...triggerProps} />
				)}
				{...props}
			>
				{triggerContent}
			</AccordionPrimitive.Trigger>
		);
	}

	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				className={cn(
					"group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
					className
				)}
				data-slot="accordion-trigger"
				{...props}
			>
				{triggerContent}
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: AccordionPrimitive.Panel.Props) {
	const useSemanticHTML = useContext(SemanticAccordionContext);

	return (
		<AccordionPrimitive.Panel
			className="overflow-hidden text-sm data-closed:animate-accordion-up data-open:animate-accordion-down"
			data-slot="accordion-content"
			render={
				useSemanticHTML
					? (panelProps: React.HTMLAttributes<HTMLElement>) => <div {...panelProps} />
					: undefined
			}
			{...props}
		>
			<div
				className={cn(
					"h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
					className
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
