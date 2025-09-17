import React, { useState } from "react";
// Uncomment the line below if you're using axios
import axios from "axios";

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
      let response = await axios.post(`http://localhost:5500/api/ai/askQuery/${userData._id}`, Data);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-black p-8">
      <div id="MutiformSection" className="max-w-xl mx-auto mb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-indigo-200 rounded-lg shadow-lg p-6 space-y-4"
        >
          <h1 className="text-lg font-bold text-indigo-600 text-center">
            Study Guide Generator
          </h1>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="What You Are Aiming to Study"
            className="w-full p-3 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:outline-none"
            required
          />
          <textarea
            placeholder="Your Prior Experience"
            rows="3"
            className="w-full p-3 rounded-lg border border-indigo-300 focus:border-indigo-500 focus:outline-none resize-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
          >
            {loading ? "Generating..." : "Generate Guide"}
          </button>
        </form>
      </div>

      {guide && Object.keys(guide).length > 0 && (
        <div
          id="guideSection"
          className="w-full mx-auto bg-white text-black p-8 rounded-lg shadow-lg border border-indigo-200"
        >
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-indigo-700 mb-4">
              {guide.greetings}
            </h1>
            <p className="text-gray-700 mb-4 text-lg">{guide.prior_knowledge}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="bg-indigo-100 px-4 py-2 rounded-lg">
                <span className="font-semibold text-indigo-700">Prior Knowledge Alignment: </span>
                <span className="text-indigo-600">{guide.prior_knowledge_alignment}/10</span>
              </div>
              {guide.future && (
                <div className="bg-green-100 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-green-700">Future Relevance: </span>
                  <span className="text-green-600">{guide.future.relevance_score}/10</span>
                </div>
              )}
            </div>
          </div>

          {/* Roadmap Section */}
          {guide.roadmap && guide.roadmap.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-indigo-600 mb-6">Learning Roadmap</h2>
              <div className="space-y-4">
                {guide.roadmap.map((step, idx) => (
                  <div key={idx} className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                    <div className="flex items-center mb-3">
                      <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                        {step.step}
                      </span>
                      <h3 className="text-xl font-semibold text-indigo-700">{step.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-3">{step.description}</p>
                    {step.resources && step.resources.length > 0 && (
                      <div>
                        <strong className="text-indigo-600">Resources:</strong>
                        <ul className="list-disc list-inside ml-4 text-gray-600">
                          {step.resources.map((resource, resIdx) => (
                            <li key={resIdx} className="text-gray-600">{resource}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Future Trends Section */}
          {guide.future && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-indigo-600 mb-4">Future Outlook</h2>
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-700 mb-4">{guide.future.demand_growth}</p>
                {guide.future.emerging_trends && guide.future.emerging_trends.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-green-700 mb-2">Emerging Trends:</h3>
                    <div className="flex flex-wrap gap-2">
                      {guide.future.emerging_trends.map((trend, idx) => (
                        <span key={idx} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                          {trend}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Learning Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Best Books */}
            {guide.bestBooks && guide.bestBooks.length > 0 && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-blue-700 mb-4">📚 Best Books</h2>
                <ul className="space-y-2">
                  {guide.bestBooks.map((book, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {book}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Best Courses */}
            {guide.bestCourses && guide.bestCourses.length > 0 && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-purple-700 mb-4">🎓 Best Courses</h2>
                <ul className="space-y-2">
                  {guide.bestCourses.map((course, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* YouTube Channels */}
            {guide.bestYoutubeChannels && guide.bestYoutubeChannels.length > 0 && (
              <div className="bg-red-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-red-700 mb-4">📺 YouTube Channels</h2>
                <ul className="space-y-2">
                  {guide.bestYoutubeChannels.map((channel, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {channel}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Best Websites */}
            {guide.bestWebsites && guide.bestWebsites.length > 0 && (
              <div className="bg-orange-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-orange-700 mb-4">🌐 Best Websites</h2>
                <ul className="space-y-2">
                  {guide.bestWebsites.map((website, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      {website}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Projects Section */}
          {guide.goodProjects && guide.goodProjects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-indigo-600 mb-6">💻 Project Ideas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guide.goodProjects.map((project, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.githubExample && (
                      <a 
                        href={project.githubExample} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        View Example →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Companies Section */}
          {guide.topCompanies && guide.topCompanies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-indigo-600 mb-6">🏢 Top Hiring Companies</h2>
              <div className="space-y-4">
                {guide.topCompanies.map((company, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-slate-800">{company.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        {company.roles && company.roles.map((role, roleIdx) => (
                          <span key={roleIdx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{company.hiringTrends}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Salary Information */}
          {guide.avgPackages && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-indigo-600 mb-6">💰 Average Salary Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guide.avgPackages.india && (
                  <div className="bg-green-50 p-6 rounded-lg text-center border-2 border-green-200">
                    <div className="text-lg mb-2">🇮🇳</div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">India</h3>
                    <p className="text-md font-bold text-green-700">{guide.avgPackages.india}</p>
                  </div>
                )}
                {guide.avgPackages.usa && (
                  <div className="bg-blue-50 p-6 rounded-lg text-center border-2 border-blue-200">
                    <div className="text-lg mb-2">🇺🇸</div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">USA</h3>
                    <p className="text-md font-bold text-blue-700">{guide.avgPackages.usa}</p>
                  </div>
                )}
                {guide.avgPackages.europe && (
                  <div className="bg-purple-50 p-6 rounded-lg text-center border-2 border-purple-200">
                    <div className="text-lg mb-2">🇪🇺</div>
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Europe</h3>
                    <p className="text-md font-bold text-purple-700">{guide.avgPackages.europe}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}