import { Head } from "./head";
import Header from "@/components/Header/Header"

export default function DefaultLayout({ children }) {
	return (
		<div>
			<Head />
			<Header />
			<main className="container">
				{children}
			</main>
		</div>
	);
}
