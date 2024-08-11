import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-16 w-16 text-accent"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4zM12 4a8 8 0 018 8h-8V4z"
          ></path>
        </svg>
        <p className="mt-2 text-accent text-lg">Loading products...</p>
      </div>
    </div>
  );
};

export default Loader;
