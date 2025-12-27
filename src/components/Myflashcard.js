import React from "react";
import { useNavigate } from "react-router-dom";

const Myflashcard = () => {
  const navigate = useNavigate();

  const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

  const HandleRedirectToFlashcardDetails = (id) => {
    navigate(`/flashcarddetails/${id}`);
  };

  return (
    <div className="mt-12 px-4 sm:px-8 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {flashcards.map((value, index) => (
          <div
            key={index}
            className="
              bg-white
              flex flex-col
              items-center
              shadow-md
              rounded-lg
              p-6
              m-8
              w-full
              max-w-sm
              mx-auto
            "
          >
            {/* Image */}
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 -mt-16">
              <img
                src={value.groupImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h1 className="text-sm font-semibold text-center truncate w-full">
              {value.creategroup}
            </h1>

            {/* Description */}
            <p className="text-xs text-gray-500 text-center mt-2 w-full break-words line-clamp-3">
              {value.addDescription}
            </p>

            {/* Count */}
            <span className="text-xs font-semibold text-gray-500 mt-3">
              {value.Terms.length} cards
            </span>

            {/* Button */}
            <button
              onClick={() => HandleRedirectToFlashcardDetails(value.id)}
              className="
                mt-4
                w-full
                border-2
                border-red-500
                text-red-500
                hover:border-red-600
                hover:text-red-600
                p-2
                rounded
              "
            >
              View Cards
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myflashcard;
