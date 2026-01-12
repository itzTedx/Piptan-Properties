"use client";

import { Example, ExampleWrapper } from "@/components/example";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ComponentExample() {
	return (
		<ExampleWrapper>
			<CardExample />
			<FormExample />
		</ExampleWrapper>
	);
}

function CardExample() {
	return (
		<Example className="items-center justify-center" title="Card">
			<Card className="relative w-full max-w-sm overflow-hidden pt-0">
				<div className="absolute inset-0 z-30 aspect-video bg-primary opacity-50 mix-blend-color" />

				<CardHeader>
					<CardTitle>Observability Plus is replacing Monitoring</CardTitle>
					<CardDescription>
						Switch to the improved way to explore your data, with natural
						language. Monitoring will no longer be available on the Pro plan in
						November, 2025
					</CardDescription>
				</CardHeader>
			</Card>
		</Example>
	);
}

const frameworks = [
	"Next.js",
	"SvelteKit",
	"Nuxt.js",
	"Remix",
	"Astro",
] as const;

const roleItems = [
	{ label: "Developer", value: "developer" },
	{ label: "Designer", value: "designer" },
	{ label: "Manager", value: "manager" },
	{ label: "Other", value: "other" },
];

function FormExample() {
	return (
		<Example title="Form">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>User Information</CardTitle>
					<CardDescription>Please fill in your details below</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<FieldGroup>
							<div className="grid grid-cols-2 gap-4">
								<Field>
									<FieldLabel htmlFor="small-form-name">Name</FieldLabel>
									<Input
										id="small-form-name"
										placeholder="Enter your name"
										required
									/>
								</Field>
								<Field>
									<FieldLabel htmlFor="small-form-role">Role</FieldLabel>
									<Select defaultValue={null} items={roleItems}>
										<SelectTrigger id="small-form-role">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{roleItems.map((item) => (
													<SelectItem key={item.value} value={item.value}>
														{item.label}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</Field>
							</div>
							<Field>
								<FieldLabel htmlFor="small-form-framework">
									Framework
								</FieldLabel>
								<Combobox items={frameworks}>
									<ComboboxInput
										id="small-form-framework"
										placeholder="Select a framework"
										required
									/>
									<ComboboxContent>
										<ComboboxEmpty>No frameworks found.</ComboboxEmpty>
										<ComboboxList>
											{(item) => (
												<ComboboxItem key={item} value={item}>
													{item}
												</ComboboxItem>
											)}
										</ComboboxList>
									</ComboboxContent>
								</Combobox>
							</Field>
							<Field>
								<FieldLabel htmlFor="small-form-comments">Comments</FieldLabel>
								<Textarea
									id="small-form-comments"
									placeholder="Add any additional comments"
								/>
							</Field>
							<Field orientation="horizontal">
								<Button type="submit">Submit</Button>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</Example>
	);
}
