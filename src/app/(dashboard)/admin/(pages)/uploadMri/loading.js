import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
      <p className="ml-4 text-lg text-gray-600">Loading...</p>
    </div>
  );
};

export default Loading;
