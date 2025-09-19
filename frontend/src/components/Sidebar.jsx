import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Sidebar({ userId }) {
  let [loading, setLoading] = useState(true);
  let [previousGuides, setPreviousGuides] = useState([]);

  useEffect(() => {
    async function getPreviousGuides() {
      console.log(userId);
      let res = await axios.get(`http://localhost:5500/api/user/previousChats/${userId}`);
      console.log(res.data);
      setPreviousGuides(res.data);
      setLoading(false);
    }
    getPreviousGuides();
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="h-screen w-80 bg-white border-r border-indigo-200 flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50">
        <h1 className="text-xl font-bold text-indigo-700 flex items-center">
          <svg className="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Previous Guides
        </h1>
        <p className="text-sm text-indigo-600 mt-1">Your learning history</p>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-indigo-50/30 to-white">
        {loading ? (
          <div className="p-4">
            <div className="animate-pulse space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-indigo-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-3">
            {previousGuides.map((guide) => (
              <div
                key={guide._id}
                className="group flex items-center px-4 py-4 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 border border-transparent cursor-pointer transition-all duration-200 mb-2 shadow-sm hover:shadow-md"
              >
                <div className="flex-1 min-w-0">
                  {/* Chat Icon */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Title with truncation */}
                      <p className="text-sm font-semibold text-indigo-900 truncate leading-tight">
                        {guide.greetings}
                      </p>
                      
                      {/* Date */}
                      <p className="text-xs text-indigo-500 mt-1 font-medium">
                        {formatDate(guide.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Options menu (appears on hover) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-400 hover:text-indigo-600 transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            
            {previousGuides.length === 0 && (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">No guides yet</h3>
                <p className="text-sm text-indigo-500 leading-relaxed">Start creating your first study guide to see your learning history here.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>New Study Guide</span>
        </button>
        
        {/* Optional: Add user info or settings */}
        <div className="mt-3 pt-3 border-t border-indigo-100">
          <div className="flex items-center space-x-2 text-xs text-indigo-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{previousGuides.length} guides created</span>
          </div>
        </div>
      </div>
    </div>
  );
}