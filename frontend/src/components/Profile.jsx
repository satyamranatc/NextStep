import React from "react";
import { User, Mail, LogOut, Camera, ShieldCheck, Award, Zap } from "lucide-react";

export default function Profile({ userData, setIsLoggedIn, setUserData }) {
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserData({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20 px-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-[10%] right-[5%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px] -z-10"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-purple-100/50 blur-[120px] -z-10"></div>

      <div className="w-full max-w-2xl">
        <div className="glass p-12 rounded-[3rem] shadow-2xl border border-white/50 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="absolute -inset-1.5 premium-gradient rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                <img
                  src={userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.fullName}`}
                  alt="avatar"
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl"
                />
                <button className="absolute bottom-2 right-2 p-3 bg-white rounded-full shadow-lg border border-slate-100 text-indigo-600 hover:text-indigo-700 hover:scale-110 transition-all duration-300">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* User Info Section */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-4xl font-black text-slate-900 leading-tight">
                  {userData.fullName}
                </h1>
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-medium mb-6">
                <Mail className="w-4 h-4" />
                <span>{userData.email}</span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold border border-indigo-100 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Elite Learner
                </div>
                <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-xl text-sm font-bold border border-purple-100 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  12 Day Streak
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-100 relative z-10">
            <div className="text-center p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-indigo-100 transition-all duration-500">
              <div className="text-2xl font-black text-slate-900 mb-1">24</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Roadmaps</div>
            </div>
            <div className="text-center p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-indigo-100 transition-all duration-500">
              <div className="text-2xl font-black text-slate-900 mb-1">12</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Completed</div>
            </div>
            <div className="text-center p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-indigo-100 transition-all duration-500">
              <div className="text-2xl font-black text-slate-900 mb-1">4.8</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Avg. Score</div>
            </div>
          </div>

          <div className="mt-12 relative z-10">
            <button
              id="LogOut"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-black py-4 rounded-[2rem] border-2 border-red-50 hover:border-red-600 transition-all duration-300 shadow-lg shadow-red-100 hover:shadow-red-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out Securely</span>
            </button>
          </div>

        </div>
        
        <p className="mt-8 text-center text-slate-400 text-sm font-medium">
          Account secured with 256-bit encryption. <a href="#" className="underline hover:text-indigo-600">Privacy Settings</a>
        </p>
      </div>
    </div>
  );
}
