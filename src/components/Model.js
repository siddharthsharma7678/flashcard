import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FaCopy } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const Model = () => {
  return (
    <>
      <div class="fixed top-0 w-full h-full flex justify-center items-center backdrop-blur-sm ">
        <div className="bg-white h-56 w-96 shadow-md p-4 rounded">
          <span className="flex justify-end m-2">
            <RxCross2 />
          </span>
          <div className="share m-2 m-4">Share</div>
          <div className="link">
            <div class="flex items-center gap-2 border-2 border-gray-400 rounded px-4">
              <div class="text-gray-700 border-r-2 p-2">src</div>
              <div id="flahcard-link" class="flex-1 px-4 mx-2 border-r-2 p-2">
                www.google.com
              </div>
              <div className="border-r-2 p-[12px]">
                <FaCopy />
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
