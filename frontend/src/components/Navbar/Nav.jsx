import React from "react";
import { IoSearchOutline } from "react-icons/io5";

import "./nav.css";

function Navbar() {
  return (
    <nav>
      <img
        src="https://ucarecdn.com/bea74419-8891-4ca9-8145-0c48c8b9e9dc/openbook1.png"
        alt="openBook"
      />
      <div>
        <span>
          <input type="search" placeholder="Search" />
          <IoSearchOutline size={22} />
        </span>
        <p className="user">K</p>
      </div>
    </nav>
  );
}

export default Navbar;
