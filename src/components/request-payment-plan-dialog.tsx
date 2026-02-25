"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { requestPaymentPlanAction } from "@/actions/request-payment-plan";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { IconArrowRight } from "@/assets/icons/arrows";

type RequestPaymentPlanDialogProps = {
	projectName?: string;
	className?: string;
};

const paymentPlanSchema = z.object({
	name: z.string().min(1, "Please enter your name."),
	email: z.email("Please enter a valid email address."),
	phone: z.string().min(1, "Please enter your phone number."),
	message: z
		.string()
		.max(1000, "Message must be 1000 characters or less.")
		.optional()
		.or(z.literal("")),
});

type PaymentPlanFormValues = z.infer<typeof paymentPlanSchema>;

export function RequestPaymentPlanDialog({
	projectName,
	className,
}: RequestPaymentPlanDialogProps) {
	const [submitted, setSubmitted] = React.useState(false);
	const [submitError, setSubmitError] = React.useState<string | null>(null);
	const [isPending, startTransition] = React.useTransition();

	const { register, handleSubmit, reset, formState: { errors } } =
		useForm<PaymentPlanFormValues>({
		// Cast to align zod v4 schema with resolver typings.
		resolver: zodResolver(paymentPlanSchema as never),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			message: "",
		},
	});

	const onSubmit = (values: PaymentPlanFormValues) => {
		setSubmitted(false);
		setSubmitError(null);

		startTransition(async () => {
			try {
				await requestPaymentPlanAction({
					...values,
					projectName,
				});
				setSubmitted(true);
				reset(values);
			} catch (error) {
				setSubmitError(
					error instanceof Error
						? error.message
						: "Something went wrong. Please try again.",
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
					<Button className={className}>
						Request Payment Plan{" "}
						<IconArrowRight aria-hidden="true" className="size-3" />
					</Button>
				}
			/>
			<DialogContent aria-labelledby="request-payment-plan-title">
				<DialogHeader>
					<DialogTitle id="request-payment-plan-title">
						Request payment plan details
					</DialogTitle>
					<DialogDescription>
						Leave your details and our team will share the latest payment plan
						{projectName ? ` for ${projectName}` : ""}.
					</DialogDescription>
				</DialogHeader>

				<form
					className="space-y-4"
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
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

					<DialogFooter className="flex flex-col items-start gap-2 sm:items-end">
						{submitError && (
							<p className="text-destructive text-xs">{submitError}</p>
						)}
						{submitted && !submitError && (
							<p className="text-muted-foreground text-xs">
								Thank you, we&apos;ve received your request. A member of our
								team will contact you shortly.
							</p>
						)}
						<Button
							className="w-full sm:w-auto"
							disabled={isPending}
							type="submit"
						>
							{isPending ? "Sending..." : "Send request"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
