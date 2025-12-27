import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaCopy } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { TiInputChecked } from "react-icons/ti";

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
        <div className="bg-white h-64 w-auto shadow-md p-4 rounded">
          <span onClick={handleCross} className="flex justify-end m-2">
            <RxCross2 />
          </span>
          <div className="share m-4">Share</div>
          <div className="link">
            <div class="flex items-center gap-2 border-2 border-gray-400 rounded px-4">
              <div class="text-gray-700 border-r-2 p-2">src</div>
              <div id="flahcard-link" class="flex-1 px-4 mx-2 border-r-2 p-2">
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
            <div className="rounded-full w-8 h-8 flex justify-center items-center text-gray-500">
              <CiMail className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
