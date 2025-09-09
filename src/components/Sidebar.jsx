import React from "react";
import { NavLink } from "react-router";
import sidebarsFeatures from "../constants/sidebarFeatures.js";
import { FaTimes } from "react-icons/fa";

const SideBar = ({ isSideBarOpen, setSideBarOpen }) => {
  return (
    <>
      <div
        className={`fixed inset-0  bg-opacity-30 z-10 md:hidden transition-opacity ${
          isSideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSideBarOpen(false)}
      ></div>
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-20
          flex flex-col overflow-hidden transition-all duration-300
          ${isSideBarOpen ? "w-74 md:w-74" : "w-0 md:w-74"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="text-lg font-semibold text-gray-800 title-font">
            Student Life
          </div>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSideBarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Features List */}
        <div
          className={`flex-1 overflow-y-auto transition-opacity duration-300 ${
            isSideBarOpen ? "opacity-100" : "opacity-0"
          } md:opacity-100`}
        >
          <div className="p-6 space-y-2">
            <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Main Features
            </p>
            <ul className="space-y-2">
              {sidebarsFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <li key={index}>
                    <NavLink
                      to={feature.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                        }`
                      }
                      onClick={() => setSideBarOpen(false)}
                    >
                      <Icon className="text-lg" />
                      <span>{feature.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
