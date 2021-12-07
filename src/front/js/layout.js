import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

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
