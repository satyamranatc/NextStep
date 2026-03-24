import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { BookOpen, Map, Clock, ChevronRight, PlusCircle, Layout, Info } from "lucide-react";

export default function Sidebar({ userId }) {
  const [loading, setLoading] = useState(true);
  const [previousGuides, setPreviousGuides] = useState([]);

  useEffect(() => {
    async function getPreviousGuides() {
      try {
        const res = await api.get(`/user/previousChats/${userId}`);
        setPreviousGuides(res.data);
      } catch (err) {
        console.error("Error fetching previous guides:", err);
      } finally {
        setLoading(false);
      }
    }
    if (userId) getPreviousGuides();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="h-screen w-80 bg-white border-r border-slate-100 flex flex-col pt-24">
      {/* Header */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Learning History</h2>
          <div className="bg-indigo-50 text-indigo-600 p-1.5 rounded-lg">
            <Layout className="w-3.5 h-3.5" />
          </div>
        </div>
        <p className="text-2xl font-black text-slate-900">Your Paths</p>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6 custom-scrollbar">
        {loading ? (
          <div className="space-y-4 px-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 bg-slate-200 rounded-full w-3/4"></div>
                  <div className="h-2 bg-slate-100 rounded-full w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : previousGuides.length > 0 ? (
          previousGuides.map((guide) => (
            <div
              key={guide._id}
              className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-indigo-100/50 border border-transparent hover:border-indigo-50 cursor-pointer transition-all duration-300"
            >
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Map className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                  {guide.roadmap?.[0]?.title || guide.greetings || "Untitled Path"}
                </p>
                <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{formatDate(guide.createdAt)}</span>
                </div>
              </div>
              
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </div>
          ))
        ) : (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">No History</h3>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">Your generated learning paths will appear here.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-50 bg-slate-50/50">
        <button className="w-full premium-gradient text-white px-6 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-300">
          <PlusCircle className="w-5 h-5" />
          <span>New Study Guide</span>
        </button>
        
        <div className="mt-6 flex items-center justify-between px-2 text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.1em]">AI Status: Active</span>
          </div>
          <Info className="w-4 h-4 cursor-help hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </div>
  );
}