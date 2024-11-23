import React from "react";
import { useAuth } from "../../context/AuthContext";
import { IoSearchOutline } from "react-icons/io5";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 h-[72px] flex items-center justify-between md:justify-around px-2 bg-[#0f0a0a] text-[#f7f7f2]">
      <img
        src="https://ucarecdn.com/bea74419-8891-4ca9-8145-0c48c8b9e9dc/openbook1.png"
        alt="openBook"
        className="w-[120px] object-contain h-auto"
      />
      <div className="flex gap-2 items-center">
        <span className="flex items-center py-[10px] px-3 rounded-2xl max-sm:w-[6.5rem] w-52 max-sm:hover:w-40 transition-all ease-in-out duration-300 bg-[#F5F5F5] bg-opacity-20">
          <input
            type="search"
            placeholder="Search"
            className="bg-transparent outline-none border-none w-full text-[#f7f7f2]"
          />
          <IoSearchOutline size={22} className="text-[#f7f7f2]" />
        </span>
        <p className="flex justify-center items-center text-xl h-[45px] w-[45px] rounded-full border-2 border-[#3c3c3cf6]">
          {user && user.name && user.uname[0]
            ? user.uname[0].toUpperCase()
            : "?"}
        </p>
      </div>
    </nav>
  );
}

export default Navbar;

/* background-color: #222725; */
/* background-color: #5e5c6c; */
/* background-color: #231123; */
/* background-color: #171219; */
