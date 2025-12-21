import React from "react";
import logo from "../images/logo.png";
import { FaArrowLeft } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
const Flashcarddetails = () => {
  return (
    <>
      <div className="mt-4 ml-24 w-3/4">
        <div className="top flex gap-4 justify-center">
          <span>
            <FaArrowLeft />
          </span>
          <div className="heading">
            <h3 className="font-bold mt-[-5px]">Web 3</h3>
            <p className="text-sm text-gray-500">
              The flashcard details page will have the layout as shown above. It
              must show the Flashcard title and description at the top. The
              terms in the flash card should be shown on the left side, and when
              a user click
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="bg-white rounded shadow-md w-1/2 h-full p-4 text-gray-600">
            <h3 className="border-b-2">Flashcards</h3>
            <div>
              <ul>
                <li>card 1</li>
                <li>card 2</li>
                <li>card 3</li>
                <li>card 4</li>
                <li>card 5</li>
                <li>card 6</li>
              </ul>
            </div>
          </div>
          <div className="bg-white shadow-md flex gap-1">
            <div className="img w-56 bg-red-500 m-8">
              <img className="w-full h-full object-contain" src={logo} alt="imag" />
            </div>
            <div className="des w-1/2 flex justify-center items-start mt-4 text-sm p-8">
              <p className="text-gray-600">
                The flashcard details page will have the layout as shown above.
                It must show the Flashcard title and description at the top. The
                terms in the flash card should be shown on the left side, and
                when a user click
                he flashcard details page will have the layout as shown above.
                It must show the Flashcard title and description at the top. The
                terms in the flash 
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="bg-white shadow-md rounded p-4 w-32 h-8 flex justify-start items-center gap-2 m-1 text-gray-600"><span><FaShare /></span>Share</div>
            <div className="bg-white shadow-md rounded p-4 w-32 h-8 flex justify-start items-center gap-2 m-1 text-gray-600"><span><FaArrowDown /></span>Download</div>
            <div className="bg-white shadow-md rounded p-4 w-32 h-8 flex justify-start items-center gap-2 m-1 text-gray-600"><span><FaPrint /></span>Print</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Flashcarddetails;
