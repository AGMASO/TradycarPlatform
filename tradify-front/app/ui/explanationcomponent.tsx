import { Fragment } from "react";
import React from "react";

export default function ExplanationComp() {
  return (
    <div className="flex flex-col sm:flex-row mt-10  p-3 min-h-[95vh]">
      <div className="w-[100%] sm:w-[50%] flex justify-center items-center p-5">
        <p className="  mb-[30px] sm:mb-[0px] text-gray-100 mt-[50px] text-[13vw] text-center md:text-[60px] leading-none select-none  font-extrabold ">
          What does our service?
        </p>
      </div>

      <div className="bg-gradient-to-bl from-gradient-1-start to-gradient-4-end rounded-[50px] w-[100%] sm:w-[50%] flex flex-col justify-center items-center p-5">
        <p className="text-white text-[23px] p-2 sm:p-5 leading-2">
          We have identified a major problem occurring in the second-hand market,  FRAUD 
          
          <br></br>
          <br></br>
          Several studies show that there is a high percentage of fraud, such as odometer manipulation, hiding past accidents, or replacement of official parts with counterfeit ones.
          
          <br></br><br></br> We define TradyCar as a blockchain-based platform that could revolutionizes second-hand car  transactions. 
          <br></br><br></br>
          How?,  by leveraging NFTs to track and store transparent vehicle history data, empowering trustworthy transactions and creating a secure decentralized marketplace.  
        </p>
        <a
          href="https://docs.google.com/document/d/1kcIoExNxpnqiihtauKozubSN_vCYmZCT/edit"
          className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
          target="_blank"
        >
          {" "}
          Learn more
          <svg
            aria-hidden="true"
            className="w-5 h-5 pl-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3.293 6.293a1 1 0 011.414 0L10 11.586l5.293-5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
