import React, { useState } from "react";
import axios from "axios";

export default function Guide() {
  let [guide, setGuide] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    let Data = {
      name: e.target[0].value,
      topic: e.target[1].value,
      previousExperience: e.target[2].value,
    };
    let response = await axios.post(
      "http://localhost:5500/api/ai/askQuery",
      Data
    );
    setGuide(response.data);
  }

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div id="MutiformSection" className="max-w-xl mx-auto mb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-black text-white rounded-2xl shadow-lg p-6 space-y-4"
        >
          <h1 className="text-2xl font-bold text-indigo-400 text-center">
            Study Guide Generator
          </h1>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 rounded-md text-black border border-indigo-300"
          />
          <input
            type="text"
            placeholder="What You Are Aiming to Study"
            className="w-full p-2 rounded-md text-black border border-indigo-300"
          />
          <input
            type="text"
            placeholder="Your Prior Experience"
            className="w-full p-2 rounded-md text-black border border-indigo-300"
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold transition"
          >
            Generate Guide
          </button>
        </form>
      </div>

      {guide && Object.keys(guide).length > 0 && (
        <div
          id="guideSection"
          className="max-w-3xl mx-auto bg-white text-black p-6 rounded-2xl shadow-md border border-indigo-200"
        >
          <h1 className="text-2xl font-bold text-indigo-600 mb-4">
            {guide.greetings}
          </h1>
          <p className="mb-2">{guide.prior_knowledge}</p>
          <p className="mb-2">{guide.roadmap}</p>
          <p className="mb-2"> Future Relevance: {guide.future}</p>
          <p className="mb-6"> Prior Knowledge Alignment: {guide.prior_knowledge_alignment}</p>

          <h2 className="text-xl font-semibold text-indigo-500 mb-2">Best Books</h2>
          <ol className="list-decimal list-inside mb-4">
            {guide.bestBooks?.map((book, idx) => (
              <li key={idx}>{book}</li>
            ))}
          </ol>

          <h2 className="text-xl font-semibold text-indigo-500 mb-2">
            Best YouTube Channels
          </h2>
          <ol className="list-decimal list-inside mb-4">
            {guide.bestYoutubeChannels?.map((channel, idx) => (
              <li key={idx}>{channel}</li>
            ))}
          </ol>

          <h2 className="text-xl font-semibold text-indigo-500 mb-2">
            Best Courses
          </h2>
          <ol className="list-decimal list-inside mb-4">
            {guide.bestCourses?.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ol>

          <h2 className="text-xl font-semibold text-indigo-500 mb-2">
            Best Websites
          </h2>
          <ol className="list-decimal list-inside">
            {guide.bestWebsites?.map((website, idx) => (
              <li key={idx}>{website}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}