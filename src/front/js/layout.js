import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

// import { Navbar } from "./component/navbar";
// import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<BrowserRouter basename={basename}>
			{/* <Navbar /> */}
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
			{/* <Footer /> */}
		</BrowserRouter>
	);
};

export default injectContext(Layout);
