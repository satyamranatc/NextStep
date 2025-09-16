import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ isLoggedIn, userData }) {
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h2 className="text-2xl font-bold text-indigo-400">Next Step</h2>
      <ul className="flex space-x-6">
        <li>
          <Link
            to="/"
            className="hover:text-indigo-400 transition font-medium"
          >
            Home
          </Link>
        </li>
        {
          isLoggedIn?
          <>
            <li>
            <Link
              to="/guide"
              className="hover:text-indigo-400 transition font-medium"
            >
              Guide
            </Link>
          </li>
            <li>
            <Link
              to="/Profile"
              className="bg-indigo-500 px-4 py-2 rounded-2xl hover:text-black transition font-medium"
            >
              Profile
            </Link>
          </li>
          </>:
          <>
              <li>
            <Link
              to="/auth"
              className="bg-indigo-500 px-4 py-2 rounded-2xl hover:text-black transition font-medium"
            >
              Login
            </Link>
          </li>
          </>
        }
      </ul>
    </nav>
  );
}
