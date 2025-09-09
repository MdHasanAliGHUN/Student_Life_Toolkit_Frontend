import React from "react";

const Navbar = ({setSideBarOpen }) => (
  <nav className="fixed top-0 left-0 w-full flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 z-10">
    {/* Hamburger Menu: only mobile */}
    <div className="md:hidden">
      <button
        onClick={() => setSideBarOpen(true)}
        className="p-2 rounded-md bg-gray-100"
      >
        ☰
      </button>
    </div>

    <div className="text-lg font-semibold text-gray-800 md:ml-80">
      Student Life Toolkit lor
    </div>
  </nav>
);

export default Navbar;
