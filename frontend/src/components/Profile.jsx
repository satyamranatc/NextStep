import React from "react";

export default function Profile({ userData, setIsLoggedIn, setUserData }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        id="ProfileCard"
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>

        <img
          src={userData.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full mx-auto shadow-md border-2 border-gray-200"
        />

        <h2 className="text-xl font-semibold text-gray-700 mt-4">
          {userData.fullName}
        </h2>
        <p className="text-gray-500 text-sm">{userData.email}</p>

        <button
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition duration-300"
          id="LogOut"
          onClick={() => {
            localStorage.removeItem("userData");
            setIsLoggedIn(false);
            setUserData({});
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
