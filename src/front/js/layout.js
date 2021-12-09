import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer } from "./component/footer";
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

				<Footer />
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
