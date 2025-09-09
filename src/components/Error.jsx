import React from "react";

const Error = ({ message }) => {
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md max-w-md w-full">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">
          {message || "Something went wrong!"}
        </span>
      </div>
    </div>
  );
};

export default Error;
