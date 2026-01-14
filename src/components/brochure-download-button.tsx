import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export const BrouchreDownloadButton = ({
	className,
	...props
}: React.ComponentProps<typeof Button>) => {
	return (
		<Dialog>
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
			<DialogContent>Hello</DialogContent>
		</Dialog>
	);
};
