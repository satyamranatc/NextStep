import React, { useState } from "react";
// Uncomment the line below if you're using axios
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Guide({userData}) {
  const [guide, setGuide] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    let Data = {
      name: e.target[0].value,
      topic: e.target[1].value,
      previousExperience: e.target[2].value,
    };
    
    try {
      // Uncomment and use your actual API call
      let response = await axios.post(`http://localhost:5500/api/ai/askQuery/${userData._id}`, Data,{
        headers: {
          "Authorization": `${""}`
        },
      });
      console.log(response.data);
      setGuide(response.data);
      
      // For now, we'll just log the data
      console.log("Form data:", Data);
    } catch (error) {
      console.error("Error fetching guide:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0">
        <Sidebar userId={userData._id}/>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          
          {/* Form Section */}
          <div className="mb-10">
            <div className="max-w-2xl mx-auto">
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-indigo-200 rounded-xl shadow-lg p-8 space-y-6"
              >
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold text-indigo-700 mb-2">
                    Study Guide Generator
                  </h1>
                  <p className="text-indigo-600">Create personalized learning paths tailored to your experience</p>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-indigo-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full p-4 rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-indigo-700 mb-2">
                      Study Topic
                    </label>
                    <input
                      type="text"
                      placeholder="What would you like to learn?"
                      className="w-full p-4 rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-indigo-700 mb-2">
                      Previous Experience
                    </label>
                    <textarea
                      placeholder="Describe your current knowledge and experience in this area"
                      rows="4"
                      className="w-full p-4 rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none resize-none transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Your Guide...</span>
                    </div>
                  ) : (
                    "Generate Personalized Guide"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Guide Content */}
          {guide && Object.keys(guide).length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-indigo-200 overflow-hidden">
              
              {/* Header Section */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-8">
                <h1 className="text-3xl font-bold mb-4">
                  {guide.greetings}
                </h1>
                <p className="text-indigo-100 text-lg leading-relaxed mb-6">{guide.prior_knowledge}</p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <span className="font-semibold text-indigo-100">Prior Knowledge: </span>
                    <span className="text-white font-bold text-lg">{guide.prior_knowledge_alignment}/10</span>
                  </div>
                  {guide.future && (
                    <div className="bg-green-500 bg-opacity-90 px-6 py-3 rounded-lg">
                      <span className="font-semibold text-green-100">Future Relevance: </span>
                      <span className="text-white font-bold text-lg">{guide.future.relevance_score}/10</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 space-y-12">
                {/* Roadmap Section */}
                {guide.roadmap && guide.roadmap.length > 0 && (
                  <section>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-indigo-700 mb-2">🗺️ Learning Roadmap</h2>
                      <p className="text-indigo-600">Follow this structured path to master your chosen topic</p>
                    </div>
                    
                    <div className="space-y-6">
                      {guide.roadmap.map((step, idx) => (
                        <div key={idx} className="relative">
                          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl border-l-4 border-indigo-500 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-start space-x-6">
                              <div className="flex-shrink-0">
                                <span className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                                  {step.step}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-indigo-800 mb-3">{step.title}</h3>
                                <p className="text-gray-700 text-lg leading-relaxed mb-4">{step.description}</p>
                                
                                {step.resources && step.resources.length > 0 && (
                                  <div className="bg-white p-4 rounded-lg border border-indigo-100">
                                    <h4 className="font-semibold text-indigo-700 mb-3 flex items-center">
                                      <span className="mr-2">📚</span>
                                      Resources:
                                    </h4>
                                    <ul className="space-y-2">
                                      {step.resources.map((resource, resIdx) => (
                                        <li key={resIdx} className="flex items-start text-gray-700">
                                          <span className="text-indigo-500 mr-3 mt-1">•</span>
                                          <span>{resource}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Future Trends Section */}
                {guide.future && (
                  <section>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-indigo-700 mb-2">🔮 Future Outlook</h2>
                      <p className="text-indigo-600">Stay ahead with emerging trends and market insights</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border-l-4 border-green-500 shadow-sm">
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">{guide.future.demand_growth}</p>
                      
                      {guide.future.emerging_trends && guide.future.emerging_trends.length > 0 && (
                        <div>
                          <h3 className="font-bold text-green-800 mb-4 text-lg flex items-center">
                            <span className="mr-2">🚀</span>
                            Emerging Trends:
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {guide.future.emerging_trends.map((trend, idx) => (
                              <span key={idx} className="bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                                {trend}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Learning Resources Grid */}
                <section>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-indigo-700 mb-2">📖 Learning Resources</h2>
                    <p className="text-indigo-600">Curated resources to accelerate your learning journey</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Best Books */}
                    {guide.bestBooks && guide.bestBooks.length > 0 && (
                      <div className="bg-blue-50 p-8 rounded-xl border border-blue-200 shadow-sm">
                        <h3 className="text-xl font-bold text-blue-700 mb-6 flex items-center">
                          <span className="mr-3 text-2xl">📚</span>
                          Recommended Books
                        </h3>
                        <ul className="space-y-3">
                          {guide.bestBooks.map((book, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <span className="text-blue-500 mr-3 mt-2 font-bold">•</span>
                              <span className="leading-relaxed">{book}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Best Courses */}
                    {guide.bestCourses && guide.bestCourses.length > 0 && (
                      <div className="bg-purple-50 p-8 rounded-xl border border-purple-200 shadow-sm">
                        <h3 className="text-xl font-bold text-purple-700 mb-6 flex items-center">
                          <span className="mr-3 text-2xl">🎓</span>
                          Top Courses
                        </h3>
                        <ul className="space-y-3">
                          {guide.bestCourses.map((course, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <span className="text-purple-500 mr-3 mt-2 font-bold">•</span>
                              <span className="leading-relaxed">{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* YouTube Channels */}
                    {guide.bestYoutubeChannels && guide.bestYoutubeChannels.length > 0 && (
                      <div className="bg-red-50 p-8 rounded-xl border border-red-200 shadow-sm">
                        <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center">
                          <span className="mr-3 text-2xl">📺</span>
                          YouTube Channels
                        </h3>
                        <ul className="space-y-3">
                          {guide.bestYoutubeChannels.map((channel, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <span className="text-red-500 mr-3 mt-2 font-bold">•</span>
                              <span className="leading-relaxed">{channel}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Best Websites */}
                    {guide.bestWebsites && guide.bestWebsites.length > 0 && (
                      <div className="bg-orange-50 p-8 rounded-xl border border-orange-200 shadow-sm">
                        <h3 className="text-xl font-bold text-orange-700 mb-6 flex items-center">
                          <span className="mr-3 text-2xl">🌐</span>
                          Useful Websites
                        </h3>
                        <ul className="space-y-3">
                          {guide.bestWebsites.map((website, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <span className="text-orange-500 mr-3 mt-2 font-bold">•</span>
                              <span className="leading-relaxed">{website}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>

                {/* Projects Section */}
                {guide.goodProjects && guide.goodProjects.length > 0 && (
                  <section>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-indigo-700 mb-2">💻 Hands-on Projects</h2>
                      <p className="text-indigo-600">Build your portfolio with these practical projects</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {guide.goodProjects.map((project, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-gray-800 leading-tight">{project.name}</h3>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                              project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {project.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
                          {project.githubExample && (
                            <a 
                              href={project.githubExample} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
                            >
                              <span className="mr-2">View Example</span>
                              <span>→</span>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Companies Section */}
                {guide.topCompanies && guide.topCompanies.length > 0 && (
                  <section>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-indigo-700 mb-2">🏢 Top Hiring Companies</h2>
                      <p className="text-indigo-600">Companies actively seeking professionals in this field</p>
                    </div>
                    
                    <div className="space-y-6">
                      {guide.topCompanies.map((company, idx) => (
                        <div key={idx} className="bg-slate-50 p-8 rounded-xl border border-slate-200 shadow-sm">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                            <h3 className="text-xl font-bold text-slate-800 mb-3 lg:mb-0">{company.name}</h3>
                            <div className="flex flex-wrap gap-2">
                              {company.roles && company.roles.map((role, roleIdx) => (
                                <span key={roleIdx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{company.hiringTrends}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Salary Information */}
                {guide.avgPackages && (
                  <section>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-indigo-700 mb-2">💰 Salary Insights</h2>
                      <p className="text-indigo-600">Average compensation across different regions</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {guide.avgPackages.india && (
                        <div className="bg-green-50 p-8 rounded-xl text-center border-2 border-green-200 shadow-sm">
                          <div className="text-3xl mb-4">🇮🇳</div>
                          <h3 className="text-xl font-bold text-green-800 mb-3">India</h3>
                          <p className="text-2xl font-bold text-green-700">{guide.avgPackages.india}</p>
                        </div>
                      )}
                      {guide.avgPackages.usa && (
                        <div className="bg-blue-50 p-8 rounded-xl text-center border-2 border-blue-200 shadow-sm">
                          <div className="text-3xl mb-4">🇺🇸</div>
                          <h3 className="text-xl font-bold text-blue-800 mb-3">USA</h3>
                          <p className="text-2xl font-bold text-blue-700">{guide.avgPackages.usa}</p>
                        </div>
                      )}
                      {guide.avgPackages.europe && (
                        <div className="bg-purple-50 p-8 rounded-xl text-center border-2 border-purple-200 shadow-sm">
                          <div className="text-3xl mb-4">🇪🇺</div>
                          <h3 className="text-xl font-bold text-purple-800 mb-3">Europe</h3>
                          <p className="text-2xl font-bold text-purple-700">{guide.avgPackages.europe}</p>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}