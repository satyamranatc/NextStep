import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BookOpen, 
  Zap, 
  Trophy, 
  Users, 
  ChevronRight,
  Sparkles,
  Map,
  Target
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-100/50 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8 animate-bounce">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Career Guidance</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Your Journey to <span className="text-transparent bg-clip-text premium-gradient">Mastery</span> Starts Here
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Stop guessing your next move. Get hyper-personalized learning roadmaps, handpicked resources, and career insights tailored specifically to your goals.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/auth" 
                className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold text-lg hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-indigo-200/50 flex items-center space-x-2"
              >
                <span>Start Your Roadmap</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#features" 
                className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
              >
                Learn More
              </a>
            </div>

            {/* Stats/Social Proof */}
            <div className="mt-20 flex flex-wrap justify-center gap-12 lg:gap-24 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">10k+</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Roadmaps Managed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">1.2M</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Resources Curated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">98%</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid Style */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Built for Modern Learners</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We've combined the power of LLMs with industry best practices to give you the ultimate learning companion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Feature 1 */}
            <div className="md:col-span-3 premium-card p-10 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                <Map className="w-48 h-48 text-indigo-600" />
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-200">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Atomic Roadmaps</h3>
                <p className="text-slate-600 text-lg">Detailed, step-by-step paths that break complex subjects into manageable, actionable milestones.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="md:col-span-3 premium-card p-10 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500 font-bold text-9xl text-indigo-600">AI</div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-violet-200">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Real-time Adaptation</h3>
                <p className="text-slate-600 text-lg">Our AI adjusts your path based on your existing knowledge and desired speed of learning.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="md:col-span-2 premium-card p-8 group">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-100">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Goal Oriented</h3>
              <p className="text-slate-600">Set your destination, and we'll calculate the most efficient route there.</p>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2 premium-card p-8 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-100">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Industry Insights</h3>
              <p className="text-slate-600">Get data on top companies hiring for your skills and average package info.</p>
            </div>

            {/* Feature 5 */}
            <div className="md:col-span-2 premium-card p-8 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-100">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Precision Search</h3>
              <p className="text-slate-600">Discover handpicked courses and books from across the web in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Modern Steps */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">Simple process, <br /><span className="text-indigo-600">Exceptional</span> results.</h2>
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full premium-gradient flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-indigo-200">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Input Your Ambition</h3>
                    <p className="text-slate-600">Tell us what you want to master and what you already know. Our AI analyzes your starting point.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full premium-gradient flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-indigo-200">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">AI Generates Your Path</h3>
                    <p className="text-slate-600">In seconds, a structured 5-step roadmap is built just for you, complete with curated resource lists.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full premium-gradient flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-indigo-200">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Execute and Succeed</h3>
                    <p className="text-slate-600">Follow the guide, use the resources, and watch your skills grow as you hit every milestone.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-float">
              <div className="glass rounded-[2.5rem] p-4 lg:p-8 relative z-10">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000" 
                    alt="Platform Preview" 
                    className="w-full h-auto"
                  />
                </div>
                {/* Float elements */}
                <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Zap className="w-5 h-5 leading-none" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Roadmap Generated</div>
                    <div className="text-xs text-slate-500">In 0.8 seconds</div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-indigo-600 blur-[80px] opacity-10 -z-10 rounded-full translate-y-12"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="premium-gradient rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-300">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid)" />
                <defs>
                   <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                     <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                   </pattern>
                </defs>
              </svg>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">Ready to take the <br />Next Step?</h2>
              <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
                Join thousands of students and professionals who have accelerated their learning journeys.
              </p>
              <Link 
                to="/auth" 
                className="inline-flex items-center space-x-3 px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all duration-300 shadow-xl"
              >
                <span>Get Started for Free</span>
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center text-white shadow-lg">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">NextStep</span>
          </div>
          
          <div className="flex gap-8 text-slate-500 font-medium">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
          </div>
          
          <div className="text-slate-400 text-sm">
            &copy; 2024 NextStep AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}