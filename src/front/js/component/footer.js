import React, { Component, Fragment } from "react";

import "../../styles/footer.scss";

export const Footer = () => (
    <div className="container_main_footer">
        <footer className="main__footer">
            <div className="container_box_footer_contact">
                <p>Contac us:</p>
                <p>kronara@mail.com</p>
                <p>665-789-485</p>
            </div>
            <div className="container_box_footer_redes">
                <p>
                    <a href="https://www.instagram.com/">
                        <i className="fab fa-instagram"></i>@kronara
                    </a>
                </p>
                <p>
                    <a href="https://www.youtube.com/">
                        <i className="fab fa-youtube"></i>youtube/kronara
                    </a>
                </p>
                <p>
                    <a href="https://twitter.com/Twitter?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                        <i className="fab fa-twitter"></i>@kronara
                    </a>
                </p>
            </div>
            <div className="container_box_footer_github">
                <p>
                    <a href="https://github.com/willy5360">
                        <i className="fab fa-github"></i>
                        https://github.com/willy5360
                    </a>
                </p>
                <p>
                    <a href="https://github.com/anigabi">
                        <i className="fab fa-github"></i>
                        https://github.com/anigabi
                    </a>
                </p>
                <p>
                    <a href="https://github.com/catsil">
                        <i className="fab fa-github"></i>
                        https://github.com/catsil
                    </a>
                </p>
            </div>
            <div className="footer__copy">Kronara, copyright 2021</div>
        </footer>
    </div>
);
