import React, { useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  ExternalLink, 
  Map as MapIcon, 
  Rocket, 
  Library, 
  Briefcase, 
  IndianRupee, 
  Globe,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export default function Guide({ userData }) {
  const [guide, setGuide] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await api.post(`/ai/askQuery/${userData._id}`, data);
      setGuide(response.data);
    } catch (err) {
      console.error("Error fetching guide:", err);
      setError("Failed to generate guide. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-80 hidden lg:flex">
        <Sidebar userId={userData._id} />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-8">
          
          {/* Header Section */}
          <div className="mb-12 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 flex items-center justify-center lg:justify-start gap-4">
              <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center text-white shadow-lg">
                <MapIcon className="w-6 h-6" />
              </div>
              Knowledge Roadmap
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl font-medium">Design your personalized path to expertise. Tell us what you want to learn, and our AI will build the ultimate guide for you.</p>
          </div>

          {/* Form Section */}
          <div className="mb-16">
            <form
              onSubmit={handleSubmit}
              className="glass p-10 rounded-[2.5rem] shadow-2xl border border-white/50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Sparkles className="w-64 h-64 text-indigo-600" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
                      Target Subject
                    </label>
                    <input
                      name="topic"
                      type="text"
                      placeholder="e.g., Quantum Computing, UX Design..."
                      className="w-full bg-white/50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 p-4 rounded-2xl transition-all font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
                      Preferred Learning Style
                    </label>
                    <select 
                      name="style"
                      className="w-full bg-white/50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 p-4 rounded-2xl transition-all font-medium appearance-none"
                    >
                      <option value="practical">Project-Based (Hands-on)</option>
                      <option value="theoretical">Academic (Deep Theory)</option>
                      <option value="fast">Fast-Track (Quick Wins)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
                      Previous Experience & Context
                    </label>
                    <textarea
                      name="previousExperience"
                      placeholder="e.g., I'm a CS student with basic Python knowledge..."
                      rows="5"
                      className="w-full bg-white/50 border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 p-4 rounded-2xl transition-all font-medium resize-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <input type="hidden" name="name" value={userData.fullName || "User"} />
              
              <div className="mt-10 flex items-center justify-between">
                {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-auto flex items-center gap-3 px-10 py-4 premium-gradient text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing & Mapping...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate My Path</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Guide Content */}
          {guide && Object.keys(guide).length > 0 && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              {/* Header Card */}
              <div className="premium-gradient rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Rocket className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-black mb-6 leading-tight">
                    {guide.greetings}
                  </h2>
                  <p className="text-indigo-50 text-xl leading-relaxed mb-10 max-w-3xl font-medium opacity-90">
                    {guide.prior_knowledge}
                  </p>
                  
                  <div className="flex flex-wrap gap-6">
                    <div className="glass px-8 py-4 rounded-2xl flex items-center gap-4">
                      <div className="text-slate-200 font-bold text-sm uppercase tracking-wider">Experience Match</div>
                      <div className="text-3xl font-black">{guide.prior_knowledge_alignment}/10</div>
                    </div>
                    {guide.future && (
                      <div className="bg-emerald-500/30 backdrop-blur-md border border-emerald-400/20 px-8 py-4 rounded-2xl flex items-center gap-4">
                        <div className="text-emerald-100 font-bold text-sm uppercase tracking-wider">Future Demand</div>
                        <div className="text-3xl font-black">{guide.future.relevance_score}/10</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Roadmap Section */}
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                    <MapIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Your Structured Path</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-12 relative">
                  {/* Vertical Line for timeline */}
                  <div className="absolute left-[23px] top-6 bottom-6 w-1 bg-gradient-to-b from-indigo-200 via-purple-200 to-transparent rounded-full hidden md:block"></div>
                  
                  {guide.roadmap.map((step, idx) => (
                    <div key={idx} className="relative group md:pl-20">
                      {/* Step Number Circle */}
                      <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform duration-300 z-10 hidden md:flex">
                        {step.step}
                      </div>
                      
                      <div className="premium-card p-10">
                        <div className="flex flex-col lg:row lg:items-center justify-between gap-6 mb-6">
                          <div>
                            <div className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-2">Phase 0{step.step}</div>
                            <h4 className="text-2xl font-black text-slate-900">{step.title}</h4>
                          </div>
                          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-100">
                            <CheckCircle2 className="w-4 h-4" />
                            Milestone Goal
                          </div>
                        </div>
                        
                        <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                          {step.description}
                        </p>
                        
                        {step.resources && step.resources.length > 0 && (
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors duration-300">
                            <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-indigo-600" />
                              Curated Learning Materials
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {step.resources.map((resource, resIdx) => (
                                <div key={resIdx} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all cursor-default group/res">
                                  <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                                  <span className="text-slate-700 font-medium text-sm flex-1 truncate">{resource}</span>
                                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover/res:text-indigo-500 transition-colors" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Future & Compensation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Future Trends */}
                {guide.future && (
                  <section className="premium-card p-10 flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Future Outlook</h3>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8 flex-1">
                      {guide.future.demand_growth}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {guide.future.emerging_trends.map((trend, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-100">
                          {trend}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Salary */}
                <section className="premium-card p-10 flex flex-col justify-between">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                      <IndianRupee className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Compensation Insights</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🇮🇳</span>
                        <span className="font-bold text-slate-700 uppercase tracking-wider text-xs">India</span>
                      </div>
                      <div className="text-xl font-black text-slate-900">{guide.avgPackages?.india || "N/A"}</div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🇺🇸</span>
                        <span className="font-bold text-slate-700 uppercase tracking-wider text-xs">USA</span>
                      </div>
                      <div className="text-xl font-black text-slate-900">{guide.avgPackages?.usa || "N/A"}</div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🇪🇺</span>
                        <span className="font-bold text-slate-700 uppercase tracking-wider text-xs">Europe</span>
                      </div>
                      <div className="text-xl font-black text-slate-900">{guide.avgPackages?.europe || "N/A"}</div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Resource Grid Sections */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { title: "Best Books", items: guide.bestBooks, icon: BookOpen, color: "blue" },
                   { title: "Top Courses", items: guide.bestCourses, icon: Library, color: "purple" },
                   { title: "Websites", items: guide.bestWebsites, icon: Globe, color: "orange" },
                   { title: "Channels", items: guide.bestYoutubeChannels, icon: Briefcase, color: "red" }
                 ].map((category, i) => category.items && category.items.length > 0 && (
                   <div key={i} className="premium-card p-6">
                     <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 text-${category.color}-600`}>
                       <category.icon className="w-4 h-4" />
                       {category.title}
                     </h4>
                     <ul className="space-y-3">
                        {category.items.map((item, j) => (
                          <li key={j} className="text-sm font-medium text-slate-600 flex items-start gap-2">
                            <div className={`w-1 h-1 rounded-full bg-${category.color}-400 mt-2`}></div>
                            {item}
                          </li>
                        ))}
                     </ul>
                   </div>
                 ))}
              </section>

              {/* Hiring Companies */}
              {guide.topCompanies && guide.topCompanies.length > 0 && (
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Career Opportunities</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {guide.topCompanies.map((company, i) => (
                      <div key={i} className="premium-card p-8 group">
                        <div className="flex justify-between items-start mb-6">
                          <h4 className="text-xl font-black text-slate-800">{company.name}</h4>
                          <div className="flex flex-wrap gap-2 justify-end">
                            {company.roles && company.roles.map((role, j) => (
                              <span key={j} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                          {company.hiringTrends}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}