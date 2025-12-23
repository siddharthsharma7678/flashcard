import React from "react";
import logo from "../images/logo.png";
const Navbar = () => {
  return (
    <>
      <header className="">
        <nav className="shadow-md h-10 bg-white flex justify-start items-center">
          <img className="filter invert h-20 w-20 " src={logo} alt="logo" />
        </nav>

        <div className="box mt-4 ml-24 h-24 w-3/4 border-b-2 border-gray-200">
          <h2 className="font-bold text-xl">Create Flashcard</h2>
          <div className="flex justify-start mt-4">
            <div className="m-4 text-gray-400 border-b-2 rounded-sm p-[5px] border-red-500">
              Create New
            </div>
            <div className="m-4 text-gray-400 border-b-2 rounded-sm p-[5px]">
              My Flashcard
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;
