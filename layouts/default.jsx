
import Footer from "./Footer/Footer";
import { Head } from "./head";
import Header from "./Header/Header"

export default function DefaultLayout({ children }) {
	return (
		<div>
			<Head />
			<Header />
			<main className="container">
				{children}
			</main>
			<Footer/>
		</div>
	);
}
