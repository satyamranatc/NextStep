import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { LogIn, UserPlus, Mail, Lock, User, Image as ImageIcon, ArrowRight } from "lucide-react";

export default function Auth({ setIsLoggedIn, setUserData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let user = localStorage.getItem("userData");
    if (user) {
      navigate("/profile");
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await api.post("/auth/login", data);
      if (res.status === 201) {
        localStorage.setItem("userData", JSON.stringify(res.data));
        setIsLoggedIn(true);
        setUserData(res.data);
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await api.post("/auth/register", data);
      if (res.status === 201) {
        localStorage.setItem("userData", JSON.stringify(res.data));
        setIsLoggedIn(true);
        setUserData(res.data);
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20 px-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-indigo-100/50 blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-100/50 blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md">
        <div className="glass p-8 rounded-[2.5rem] shadow-2xl border border-white/50">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500 font-medium text-sm px-4">Continue your journey to mastery with NextStep AI</p>
          </div>

          <Tabs selectedTabClassName="bg-indigo-600 text-white shadow-lg shadow-indigo-100">
            <TabList className="flex p-1.5 bg-slate-100 rounded-2xl mb-8">
              <Tab className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer transition-all duration-300 font-bold text-slate-600 outline-none">
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Tab>
              <Tab className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer transition-all duration-300 font-bold text-slate-600 outline-none">
                <UserPlus className="w-4 h-4" />
                <span>Join Now</span>
              </Tab>
            </TabList>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium animate-shake">
                {error}
              </div>
            )}

            <TabPanel>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    name="email"
                    className="w-full bg-white/50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-12 py-4 rounded-2xl transition-all font-medium"
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    name="password"
                    className="w-full bg-white/50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-12 py-4 rounded-2xl transition-all font-medium"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  disabled={loading}
                  className="w-full mt-2 premium-gradient text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Continue to Profile</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </TabPanel>

            <TabPanel>
              <form className="space-y-4" onSubmit={handleSignUp}>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    name="fullName"
                    className="w-full bg-white/50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-12 py-4 rounded-2xl transition-all font-medium"
                    type="text"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <input
                    name="avatar"
                    className="w-full bg-white/50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-12 py-4 rounded-2xl transition-all font-medium"
                    type="text"
                    placeholder="Avatar URL (Optional)"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    name="email"
                    className="w-full bg-white/50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-12 py-4 rounded-2xl transition-all font-medium"
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    name="password"
                    className="w-full bg-white/50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-12 py-4 rounded-2xl transition-all font-medium"
                    type="password"
                    placeholder="Create Password"
                    required
                  />
                </div>
                <button
                  disabled={loading}
                  className="w-full mt-2 premium-gradient text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </TabPanel>
          </Tabs>
        </div>
        <p className="mt-8 text-center text-slate-400 text-sm font-medium">
          By continuing, you agree to our <a href="#" className="underline hover:text-indigo-600 transition-colors">Terms of Service</a>
        </p>
      </div>
    </div>
  );
}
