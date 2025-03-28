import React from "react";
import { Link } from "react-router-dom";
const Trybutton = () => {
  return (
    <>
      <div className="tryLink flex items-center p-3 rounded-lg font-mediumrelative">
        <Link
          to="/chat"
          className="link flex flex-row items-center text-white hover:text-black mr-1.5"
        >
          <button className="overflow-hidden relative w-36 h-12 bg-black text-white border-none rounded-full text-xl font-medium cursor-pointer group">
            <span className="relative z-10 transition-all duration-500 group-hover:opacity-0">
              WasteyAI
            </span>
            <span className="absolute top-2.5 left-10 z-10 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Trynow
            </span>

            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

            <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>

            <span className="absolute inset-0 rounded-md border border-transparent group-hover:border-purple-500 transition-all duration-500"></span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Trybutton;
