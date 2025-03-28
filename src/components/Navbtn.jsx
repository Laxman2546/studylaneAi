import React from "react";
import { Link } from "react-router-dom";

const NavButton = () => {
  return (
    <div className="flex flex-col items-end pr-6 md:pr-14 h-auto w-full py-4 px-6 md:px-10">
      <Link to="/chat">
        <button className="px-6 py-3 bg-black border-2 text-white rounded-3xl cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:border-black">
          WasteyAI
        </button>
      </Link>
    </div>
  );
};

export default NavButton;
