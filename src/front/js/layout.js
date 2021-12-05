import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";


const Layout = () => {
	
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				

				<Routes>
					<Route path="/" element={<Home />} />
					
				</Routes>

				
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
