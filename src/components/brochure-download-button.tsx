"use client";

import * as React from "react";

import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { requestBrochureAction } from "@/actions/request-brochure";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const brochureSchema = z.object({
	name: z.string().min(1, "Please enter your name."),
	email: z.email("Please enter a valid email address."),
	phone: z.string().min(1, "Please enter your phone number."),
	message: z
		.string()
		.max(1000, "Message must be 1000 characters or less.")
		.optional()
		.or(z.literal("")),
});

type BrochureFormValues = z.infer<typeof brochureSchema>;

type BrochureDownloadButtonProps = React.ComponentProps<typeof Button> & {
	projectName?: string;
	projectImage?: string;
};

export const BrochureDownloadButton = ({
	className,
	projectName,
	projectImage,
	...props
}: BrochureDownloadButtonProps) => {
	const [submitted, setSubmitted] = React.useState(false);
	const [submitError, setSubmitError] = React.useState<string | null>(null);
	const [isPending, startTransition] = React.useTransition();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<BrochureFormValues>({
		// Cast to align zod v4 schema with resolver typings.
		resolver: zodResolver(brochureSchema as never),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			message: "",
		},
	});

	const onSubmit = (values: BrochureFormValues) => {
		setSubmitted(false);
		setSubmitError(null);

		startTransition(async () => {
			try {
				await requestBrochureAction({
					...values,
					projectName,
				});
				setSubmitted(true);
				reset(values);
			} catch (error) {
				setSubmitError(
					error instanceof Error
						? error.message
						: "Something went wrong. Please try again."
				);
			}
		});
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			reset();
			setSubmitted(false);
			setSubmitError(null);
		}
	};

	return (
		<Dialog onOpenChange={handleOpenChange}>
			<DialogTrigger
				render={
					<Button
						className={cn(
							"relative inset-shadow-sm inset-shadow-white/50 z-10 overflow-hidden px-3 font-semibold after:pointer-events-none after:absolute after:inset-0 after:z-0 after:bg-linear-to-t",
							className
						)}
						{...props}
					/>
				}
			>
				<span className="relative z-10">Download Brochure</span>
			</DialogTrigger>
			<DialogContent
				aria-labelledby="download-brochure-title"
				className="sm:max-w-6xl"
			>
				<form
					className="space-y-4"
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="grid items-start gap-6 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
						{projectImage && (
							<div className="relative flex aspect-4/3 items-end overflow-hidden rounded-md p-6">
								<div className="relative z-10">
									<h4 className="font-display font-medium text-2xl text-card">
										{projectName}
									</h4>
								</div>
								<div className="absolute inset-x-0 bottom-0 z-1 h-1/2 bg-linear-to-t from-black/50 to-transparent" />
								<Image
									alt={
										projectName
											? `${projectName} brochure preview`
											: "Project brochure preview"
									}
									className="object-cover"
									fill
									src={projectImage}
								/>
							</div>
						)}
						<div className="space-y-6">
							<DialogHeader>
								<DialogTitle id="download-brochure-title">
									Download project brochure
								</DialogTitle>
								<DialogDescription>
									Share your details and we&apos;ll send you the latest brochure
									{projectName ? ` for ${projectName}` : ""}.
								</DialogDescription>
							</DialogHeader>
							<FieldSet>
								<FieldGroup>
									<Field data-invalid={errors.name ? "true" : undefined}>
										<FieldLabel>
											<span>Full name</span>
											<span className="text-destructive">*</span>
										</FieldLabel>
										<FieldContent>
											<Input
												aria-invalid={errors.name ? "true" : undefined}
												autoComplete="name"
												placeholder="John Doe"
												{...register("name")}
											/>
											{errors.name && (
												<FieldError>{errors.name.message}</FieldError>
											)}
										</FieldContent>
									</Field>

									<Field data-invalid={errors.email ? "true" : undefined}>
										<FieldLabel>
											<span>Email address</span>
											<span className="text-destructive">*</span>
										</FieldLabel>
										<FieldContent>
											<Input
												aria-invalid={errors.email ? "true" : undefined}
												autoComplete="email"
												placeholder="you@example.com"
												type="email"
												{...register("email")}
											/>
											{errors.email && (
												<FieldError>{errors.email.message}</FieldError>
											)}
										</FieldContent>
									</Field>

									<Field data-invalid={errors.phone ? "true" : undefined}>
										<FieldLabel>
											<span>Phone number</span>
											<span className="text-destructive">*</span>
										</FieldLabel>
										<FieldContent>
											<Input
												aria-invalid={errors.phone ? "true" : undefined}
												autoComplete="tel"
												placeholder="+971 50 000 0000"
												type="tel"
												{...register("phone")}
											/>
											{errors.phone && (
												<FieldError>{errors.phone.message}</FieldError>
											)}
										</FieldContent>
									</Field>

									<Field data-invalid={errors.message ? "true" : undefined}>
										<FieldLabel>
											<span>Additional details</span>
										</FieldLabel>
										<FieldContent>
											<Textarea
												placeholder="Preferred unit type, budget, or any specific questions."
												rows={3}
												{...register("message")}
											/>
											{errors.message && (
												<FieldError>{errors.message.message}</FieldError>
											)}
										</FieldContent>
									</Field>
								</FieldGroup>
							</FieldSet>
						</div>
					</div>
					<DialogFooter className="flex flex-col items-start gap-2 sm:items-end">
						{submitError && (
							<p className="text-destructive text-xs">{submitError}</p>
						)}
						{submitted && !submitError && (
							<p className="text-muted-foreground text-xs">
								Thank you, we&apos;ve received your request. We&apos;ll send the
								brochure to your email shortly.
							</p>
						)}
						<Button
							className="w-full sm:w-auto"
							disabled={isPending}
							type="submit"
						>
							{isPending ? "Sending..." : "Send & download"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
