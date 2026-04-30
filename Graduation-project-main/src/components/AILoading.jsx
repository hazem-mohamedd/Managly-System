import React from 'react';

const AILoading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">

      {/* ICON */}
      <div className="relative w-20 h-20 mb-4">

        {/* outer glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 blur-xl opacity-60 animate-pulse"></div>

        {/* spinning ring */}
        <div className="absolute inset-0 border-4 border-t-transparent border-purple-400 rounded-full animate-spin"></div>

        {/* center star */}
        <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">
          ✨
        </div>

      </div>

      {/* TEXT */}
      <h2 className="text-lg font-semibold text-gray-700">
        AI is analyzing CVs
      </h2>

      <p className="text-sm text-gray-400 mt-1">
        Gemini-powered ranking in progress...
      </p>

    </div>
  );
};

export default AILoading;