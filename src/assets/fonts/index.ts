import { Geist } from "next/font/google";
import localFont from "next/font/local";

export const geist = Geist();

export const ivyora = localFont({
	variable: "--font-display",
	display: "swap",
	preload: true,
	src: [
		{
			weight: "100",
			path: "./ivyora/IvyOraDisplay-Thin.woff2",
		},
		{
			weight: "300",
			path: "./ivyora/IvyOraDisplay-Light.woff2",
		},
		{
			weight: "400",
			path: "./ivyora/IvyOraDisplay-Regular.woff2",
		},
		{
			weight: "500",
			path: "./ivyora/IvyOraDisplay-Medium.woff2",
		},
		{
			weight: "700",
			path: "./ivyora/IvyOraDisplay-Bold.woff2",
		},
	],
	fallback: [
		"-apple-system",
		"BlinkMacSystemFont",
		"Segoe UI",
		"Roboto",
		"Oxygen",
		"Ubuntu",
		"Cantarell",
		"Helvetica Neue",
		"Arial",
		"sans-serif",
	],
});
