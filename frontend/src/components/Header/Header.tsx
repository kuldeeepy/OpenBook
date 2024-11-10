import React from "react";
import "./Header.css";

const Header: React.FC = () => {
    return (
    <nav>
        <img src="https://ucarecdn.com/bea74419-8891-4ca9-8145-0c48c8b9e9dc/openbook1.png" alt="openBook"/>
        <div>
          <span>
            <input type="search" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <p className="user">K</p>
        </div>
    </nav>
    )
}

export default Header;