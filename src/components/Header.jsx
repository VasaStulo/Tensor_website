import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="header-start">
                    <a href="#" className="header-start__logo"><img src="img/logo.svg" alt="ico"/></a>
                </div>
                <div className="header-end">
                    <nav className="nav">
                        <ul className="nav-wrapper">
                            <li className="nav-wrapper__item"><a href="#artists">Artist</a></li>
                            <li className="nav-wrapper__item"><a href="#popular-tracks">Tracks</a></li>
                            <li className="nav-wrapper__item"><Link to="search">Search</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;