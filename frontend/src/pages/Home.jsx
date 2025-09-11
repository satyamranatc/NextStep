import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">
        Welcome to Next Step 🚀
      </h1>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-6">
        Your personal guide to learning. Get curated roadmaps, resources,
        and step-by-step directions to achieve your study goals.
      </p>
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition">
        Get Started
      </button>
    </div>
  );
}
