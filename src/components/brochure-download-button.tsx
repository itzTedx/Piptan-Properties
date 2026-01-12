import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export const BrouchreDownloadButton = () => {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button className="relative inset-shadow-sm inset-shadow-white/50 z-10 overflow-hidden bg-yellow-500 px-3 font-semibold text-yellow-950 after:pointer-events-none after:absolute after:inset-0 after:z-0 after:bg-linear-to-t after:from-yellow-600" />
				}
			>
				<span className="relative z-10">Download Brochure</span>
			</DialogTrigger>
			<DialogContent>Hello</DialogContent>
		</Dialog>
	);
};
