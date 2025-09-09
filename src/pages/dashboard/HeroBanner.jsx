import React from "react";
import { FaBook } from "react-icons/fa";

const HeroBanner = () => {
  return (
    <div
      className="
        w-full p-10 
        bg-gradient-to-r from-blue-900 to-teal-500
        text-white
        rounded-lg
        shadow-lg
        flex  items-center
      "
    >
      <div className="text-left max-w-7xl px-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 flex items-center gap-3">
          Welcome to Student Life Helper!
          <FaBook className="text-4xl hidden md:block" />
        </h1>

        <p className="text-lg md:text-xl font-light mb-6 opacity-90">
          Your all-in-one companion for managing classes, budget, and study
          goals efficiently.
        </p>

        <button
          className="
            bg-green-600 hover:bg-green-700
            text-white font-semibold
            py-3 px-6 rounded
            transition duration-300
          "
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
