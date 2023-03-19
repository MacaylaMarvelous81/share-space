import "@/styles/globals.css";
import Navbar from "@/components/navbar";

export default function Layout({ children }) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{ children }
			</body>
		</html>
	);
}

export const metadata = {
	title: "Share Space"
};
