import React from 'react';

export default function NoPage() {
  return (
    <div className="bg-[#F9E6CF] min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-4">
        404
      </h1>
      <p className="text-xl md:text-2xl text-gray-700">
        Oops! The page you're looking for does not exist.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
}
