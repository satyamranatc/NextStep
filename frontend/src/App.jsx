import React, { useState, useEffect } from "react";
import api from "./api/axios";
import NavBar from "./components/NavBar.jsx";
import Auth from "./components/Auth.jsx";
import Profile from "./components/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Home from "./pages/Home.jsx";
import Guide from "./pages/Guide.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userString = localStorage.getItem("userData");
    if (!userString) {
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(userString);
    if (!user.token) {
      setIsLoading(false);
      return;
    }

    api
      .get("/check")
      .then((res) => {
        if (res.data.status === "success") {
          setIsLoggedIn(true);
          setUserData(res.data.user || user);
        } else {
          localStorage.removeItem("userData");
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("userData");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} userData={userData} />
        <main className="pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/guide"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Guide userData={userData} />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    userData={userData}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserData={setUserData}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/auth"
              element={
                <Auth setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
              }
            />
            <Route path="/*" element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-4xl font-bold text-slate-400">404 | Not Found</h1>
              </div>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
