import React, { useState } from "react";

//  React icons import start
import { RxCross2 } from "react-icons/rx";
import { FaCopy } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { TiInputChecked } from "react-icons/ti";
//  React icons import end

import { useNavigate, useLocation } from "react-router-dom";

const Model = () => {
  // use the url to show in the input box and copy it
  const state = useLocation();
  const url = state.state?.Location;

  const [isCopy, setIscopy] = useState(false);

  // handle the model cut button

  const navigate = useNavigate();
  const handleCross = () => {
    navigate(-1);
  };

  // handle copy of the url
  const handleCopy = () => {
    if (!url) return;

    navigator.clipboard
      .writeText(url)
      .then(() => setIscopy(true))
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div class="fixed top-0 w-full h-full flex justify-center items-center backdrop-blur-sm ">
        <div className="bg-white h-64 sm:w-auto w-5/6 shadow-md p-4 rounded -ml-16 dark:bg-gray-500">
          <span onClick={handleCross} className="flex justify-end m-2">
            <RxCross2 />
          </span>
          <div className="share m-4 dark:text-white">Share</div>
          <div className="link w-full">
            <div class="flex items-center sm:gap-2 border-2 border-gray-400 rounded sm:px-4">
              <div class="text-gray-700 border-r-2 p-2 dark:text-white">
                src
              </div>
              <div
                id="flahcard-link"
                class="flex-1 text-sm sm:px-4 sm:mx-2 border-r-2 sm:p-2 w-1/2 border-l-2 border-gray-400 break-all p-2 dark:text-white"
              >
                {url}
              </div>
              <div onClick={handleCopy} className="border-r-2 p-[12px]">
                {isCopy ? (
                  <TiInputChecked className="text-3xl" />
                ) : (
                  <FaCopy className="text-3xl" />
                )}
              </div>
              <div className="p-[12px]">
                <CiShare2 />
              </div>
            </div>
          </div>
          <div className="icons flex justify-evenly items-center mt-8">
            <div className="rounded-full w-8 h-8 flex justify-center items-center text-[#1877F2]">
              <FaFacebook className="w-full h-full" />
            </div>
            <div className="rounded-full w-8 h-8 flex justify-center items-center text-[#0077B5]">
              <FaLinkedin className="w-full h-full" />
            </div>
            <div className="rounded-full w-8 h-8 flex justify-center items-center   text-[#25D366]">
              <FaWhatsapp className="w-full h-full" />
            </div>
            <div className="rounded-full w-8 h-8 flex justify-center items-center text-[#1DA1F2]">
              <FaTwitter className="w-full h-full" />
            </div>
            <div className="rounded-full w-8 h-8 flex justify-center items-center text-gray-500 dark:text-white">
              <CiMail className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
