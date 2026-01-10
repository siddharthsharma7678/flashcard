import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const navigate = useNavigate(); // use to navigate with diffrent url
  const Location = useLocation(); // used for getting the params and paths
  return (
    <>
      <header className="w-full">
        <nav className="shadow-md w-full h-10 bg-white flex justify-between items-center dark:bg-gray-800">
          <img
            className="filter invert h-20 w-20 dark:invert-0 "
            src={logo}
            alt="logo"
          />
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded bg-gray-200 dark:bg-gray-500"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>

        <div className="box mt-4 ml-24 h-24 sm:w-3/4 w-1/2  border-b-2 border-gray-200">
          <h2 className="font-bold sm:text-xl text-sm dark:text-white">
            Create Flashcard
          </h2>
          <div className="flex justify-start mt-4">
            <div
              onClick={() => navigate("/")}
              className={`cursor-pointer m-4 text-gray-400 border-b-2 rounded-sm sm:p-[3px] p-[5px] sm:text-xl text-xs ${
                Location.pathname === "/" ? "border-red-600" : ""
              }`}
            >
              Create New
            </div>
            <div
              onClick={() => navigate("/myflashcard")}
              className={`cursor-pointer m-4 text-gray-400 border-b-2 rounded-sm sm:p-[3px] p-[5px] sm:text-xl text-xs ${
                Location.pathname === "/myflashcard" ? "border-red-600" : ""
              }`}
            >
              My Flashcards
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;
