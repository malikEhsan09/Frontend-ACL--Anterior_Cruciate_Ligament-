import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20 border-4 border-blue-200 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-6 h-6 bg-blue-600 rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-purple-500 rounded-full"></div>
        </div>
        <p className="mt-6 text-white text-2xl font-semibold animate-pulse">
          Redirecting to your dashboard...
        </p>
      </div>
    </div>
  );
};

export default Loading;
