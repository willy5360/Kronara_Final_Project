import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import Event from "./component/event.jsx"


const Layout = () => {
	
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/event" element={<Event />} />
					
				</Routes>

				
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
