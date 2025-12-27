import React, { useState } from "react";
// import logo from "../images/logo.png";
import { FaArrowLeft } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const Flashcarddetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Finding the curreent clicked cardd
  const Flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

  const currentCard = Flashcards.find((value) => String(value.id) === id);

  const [image, setImage] = useState(currentCard.Terms[0].image);
  const [des, setDes] = useState();

  const setContent = (TermIndex) => {
    setImage(currentCard.Terms[TermIndex].image);
    setDes(currentCard.Terms[TermIndex].definition);
  };
  // console.log(currentCard);

  const shareModel = () => {
    const Location = window.location.href;
    navigate("/Model", {
      state: { Location },
    });
  };

  return (
    <>
      <div className="mt-4 ml-24 w-3/4">
        <div className="top flex gap-4">
          <span>
            <FaArrowLeft />
          </span>
          <div className="heading">
            <h3 className="font-bold mt-[-5px]">{currentCard.creategroup}</h3>
            <p className="text-sm text-gray-500">
              {currentCard.addDescription}
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="bg-white rounded shadow-md w-1/2 h-full p-4 text-gray-600">
            <h3 className="border-b-2">Flashcards</h3>
            <div>
              <ul>
                {currentCard.Terms.map((value, index) => (
                  <li
                    className="cursor-pointer"
                    onClick={() => setContent(index)}
                  >
                    {value.term}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white shadow-md flex gap-1">
            <div className="img w-56 bg-red-500 m-8">
              <img
                className="w-full h-full object-contain"
                src={image}
                alt="imag"
              />
            </div>
            <div className="des w-1/2 flex justify-center items-start mt-4 text-sm p-8">
              <p className="text-gray-600">{des}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div
              onClick={shareModel}
              className="bg-white shadow-md rounded p-4 w-32 h-8 flex justify-start items-center gap-2 m-1 text-gray-600"
            >
              <span>
                <FaShare />
              </span>
              Share
            </div>
            <div className="bg-white shadow-md rounded p-4 w-32 h-8 flex justify-start items-center gap-2 m-1 text-gray-600">
              <span>
                <FaArrowDown />
              </span>
              Download
            </div>
            <div className="bg-white shadow-md rounded p-4 w-32 h-8 flex justify-start items-center gap-2 m-1 text-gray-600">
              <span>
                <FaPrint />
              </span>
              Print
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Flashcarddetails;
