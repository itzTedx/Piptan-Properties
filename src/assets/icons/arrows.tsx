export const IconArrowRight = (props: SVGProps) => {
	return (
		<svg
			{...props}
			height="20"
			viewBox="0 0 20 20"
			width="20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>arrow-right</title>
			<g fill="currentColor">
				<line
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					x1="3"
					x2="17"
					y1="10"
					y2="10"
				/>
				<polyline
					fill="none"
					points="12 15 17 10 12 5"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				/>
			</g>
		</svg>
	);
};
