import React, { useState } from "react";
// import logo from "../images/logo.png";
import { FaArrowLeft } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const Flashcarddetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Finding the curreent clicked cardd

  // get all the flascard from localstorage
  const Flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

  // matches the id and return the clicked flashcard
  const currentCard = Flashcards.find((value) => String(value.id) === id);

  const [image, setImage] = useState(currentCard.Terms[0].image);
  const [des, setDes] = useState(currentCard.Terms[0].definition);
  const [currentTerms, setCurrentTerms] = useState(0);

  // set the flashcard details as per selected id
  const setContent = (TermIndex) => {
    setCurrentTerms(TermIndex);
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

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="mt-4 ml-24 w-3/4">
        <div className="top flex gap-4">
          <span onClick={handleBack}>
            <FaArrowLeft />
          </span>
          <div className="heading">
            <h3 className="font-bold mt-[-5px] m-4 dark:text-white">
              {currentCard.creategroup}
            </h3>
            <p className="text-sm text-gray-500 m-4">
              {currentCard.addDescription}
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 sm:flex-row flex-col">
          <div className="bg-white shadow-md sm:w-1/4 h-full p-8 text-gray-600 w-3/4 dark:bg-gray-800">
            <h3 className="border-b-2 font-bolder text-4xl">Flashcards</h3>
            <div>
              <ul>
                {currentCard.Terms.map((value, index) => (
                  <li
                    onClick={() => setContent(index)}
                    className={`cursor-pointer text-xl text-black dark:text-white border ${
                      currentTerms === index
                        ? "bg-red-500 dark:bg-gray-900 text-white rounded px-4 py-2"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {value.term}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center sm:w-4/5 w-full -ml-10 sm:ml-2">
            <div className="bg-white shadow-md flex gap-1 w-3/4 h-auto sm:w-full sm:flex-row flex-col sm:min-h-64 sm:max-h-80 dark:bg-gray-800">
              <div className="img sm:w-full w-3/4 m-8">
                <img
                  className="w-full h-full object-contain"
                  src={image}
                  alt="imag"
                />
              </div>
              <div className="des sm:w-1/2 w-full h-auto flex flex-col justify-start items-start p-4">
                <div className="text-gray-600 text-sm break-all">{des}</div>
              </div>
            </div>
            <div className="navigation-button flex gap-20 p-1">
              <div className="">
                <FaChevronLeft
                  onClick={() => {
                    if (currentTerms !== 0) {
                      setImage(currentCard.Terms[currentTerms - 1].image);
                      setDes(currentCard.Terms[currentTerms - 1].definition);
                      setCurrentTerms(currentTerms - 1);
                    }
                  }}
                  className="text-2xl"
                />
              </div>
              <div>
                <FaChevronRight
                  onClick={() => {
                    if (currentTerms < currentCard.Terms.length - 1) {
                      setImage(currentCard.Terms[currentTerms + 1].image);
                      setDes(currentCard.Terms[currentTerms + 1].definition);
                      setCurrentTerms(currentTerms + 1);
                    }
                  }}
                  className="text-2xl"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div
              onClick={shareModel}
              className="bg-white text-xl shadow-md  p-5 w-56 h-8 flex justify-start items-center gap-4 m-1 text-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <span>
                <FaShare className="text-xl" />
              </span>
              Share
            </div>
            <div className="bg-white text-xl shadow-md   p-5 w-56 h-8 flex justify-start items-center gap-4 m-1 text-gray-600 dark:bg-gray-800 dark:text-white">
              <span>
                <FaArrowDown className="text-xl" />
              </span>
              Download
            </div>
            <div className="bg-white text-xl shadow-md   p-5 w-56 h-8 flex justify-start items-center gap-4 m-1 text-gray-600 dark:bg-gray-800 dark:text-white">
              <span>
                <FaPrint className="text-xl" />
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
