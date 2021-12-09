import React, { Component } from "react";

import "../../styles/footer.scss";

export const Footer = () => (
	<footer className="main__footer">
		<div></div>
		<div>
			<p>Contac us:</p>
			<p>kronara@mail.com</p>
			<p>665-789-485</p>
		</div>
		<div className="footer__copy">Kronara, copyright 2021</div>
		<div>
			<p><a href="https://www.instagram.com/"><i class="fab fa-instagram"></i>@kronara</a></p>
			<p><a href="https://www.youtube.com/"> <i class="fab fa-youtube"></i>youtube/kronara</a></p>
			<p><a href="https://twitter.com/Twitter?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"> <i class="fab fa-twitter"></i>@kronara</a></p>
		</div>
		<div>
		<p><a href="https://github.com/willy5360"><i class="fab fa-github"></i>https://github.com/willy5360</a></p>
		<p><a href="https://github.com/anigabi"><i class="fab fa-github"></i>https://github.com/anigabi</a></p>
		<p><a href="https://github.com/catsil"><i class="fab fa-github"></i>https://github.com/catsil</a></p>
		</div>
		<div></div>
	</footer>
);
