import React from "react";
import { Link } from "react-router-dom";
import { Zap, User, LogIn, Layout } from "lucide-react";

export default function NavBar({ isLoggedIn, userData }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-2xl">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">NextStep</span>
        </Link>
        <ul className="flex items-center space-x-8">
          <li>
            <Link
              to="/"
              className="text-slate-600 hover:text-indigo-600 transition font-semibold"
            >
              Home
            </Link>
          </li>
          {
            isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/guide"
                    className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 transition font-semibold"
                  >
                    <Layout className="w-4 h-4" />
                    <span>Generate Path</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-5 py-2.5 premium-gradient text-white rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-300 font-bold"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300 font-bold shadow-lg shadow-slate-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  );
}
