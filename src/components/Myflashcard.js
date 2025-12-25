import React from "react";
// import logo from "../images/logo.png";
const Myflashcard = () => {
  console.log(JSON.parse(localStorage.getItem("flashcards")));

  const FlashcardDetails = JSON.parse(localStorage.getItem("flashcards"));
  return (
    <>
      <div className="flashcards mt-12 grid grid-cols-3 gap-4 ml-48 w-3/4">
        {FlashcardDetails.map((value, index) => (
          <div
            key={index}
            className="w-64 h-56 bg-white flex flex-col relative justify-center items-center m-4 shadow-md rounded p-4"
          >
            <div className="w-20 h-20 bg-red-500 rounded-full -top-10 absolute">
              <img
                className="w-full h-full object-contain rounded-full"
                src={value.groupImage}
                alt=""
              />
            </div>
            <h1 className="">{value.creategroup}</h1>
            <p className="text-xs p-2 text-gray-500">{value.addDescription}</p>
            <span className="text-[12px] text-gray-400">
              {value.Terms.length}
            </span>
            <div className="flex absolute justify-center items-center bottom-8">
              <button className="border-2 hover:border-red-600 border-red-500 w-56 text-red-500 p-1">
                View Cards
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Myflashcard;
