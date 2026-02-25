"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const requestBrochureSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	phone: z.string().min(1),
	message: z.string().optional().or(z.literal("")),
	projectName: z.string().optional(),
});

export type RequestBrochureInput = z.infer<typeof requestBrochureSchema>;

export async function requestBrochureAction(input: RequestBrochureInput) {
	const data = requestBrochureSchema.parse(input);

	const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } =
		process.env;

	if (
		!SMTP_HOST ||
		!SMTP_PORT ||
		!SMTP_USER ||
		!SMTP_PASS ||
		!MAIL_FROM ||
		!MAIL_TO
	) {
		console.error("Email environment variables are not fully configured.");
		throw new Error("Email service not configured.");
	}

	const transporter = nodemailer.createTransport({
		host: SMTP_HOST,
		port: Number(SMTP_PORT),
		secure: Number(SMTP_PORT) === 465,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS,
		},
	});

	const subjectProject = data.projectName
		? `Brochure request - ${data.projectName}`
		: "Brochure request";

	const textBody = [
		`Name: ${data.name}`,
		`Email: ${data.email}`,
		`Phone: ${data.phone}`,
		data.projectName ? `Project: ${data.projectName}` : undefined,
		data.message ? `Message:\n${data.message}` : undefined,
		"Requested asset: Project brochure",
	]
		.filter(Boolean)
		.join("\n\n");

	await transporter.sendMail({
		from: MAIL_FROM,
		to: MAIL_TO,
		subject: subjectProject,
		text: textBody,
	});
}
