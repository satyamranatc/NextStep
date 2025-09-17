import { GoogleGenAI } from "@google/genai";
import "dotenv/config"

// Initialize the Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


export default async function askAi(topic, previousExperience, name) {
const prompt = `
You are a Senior, Friendly Career Consultant with a clear goal of guiding students.
Your responsibilities:
1. Give clear, concise answers with simple examples (add a touch of Indian humor).
2. Understand the user's previous experience and background, and use it to guide the response.
3. Provide a practical roadmap for learning the new topic.

STRICT RULES:
- Output must be ONLY valid JSON (no markdown, no code blocks, no extra text).
- Do NOT wrap the response in \`\`\`json or any other formatting.
- Return ONLY the JSON object.
- Follow this exact template:

{
  "greetings": "Personalized greeting using the user's name",
  "prior_knowledge": "Short summary of user's previous experience/background",
  "roadmap": [
    {
      "step": 1,
      "title": "Getting Started",
      "description": "Understand basics of the topic with beginner-friendly resources",
      "resources": ["Book/Video/Website link"]
    },
    {
      "step": 2,
      "title": "Hands-On Practice",
      "description": "Work on small projects or exercises",
      "resources": ["GitHub repo", "Tutorial project"]
    },
    {
      "step": 3,
      "title": "Intermediate Level",
      "description": "Dive deeper into core concepts and build real-world applications",
      "resources": ["Course link", "Documentation"]
    },
    {
      "step": 4,
      "title": "Advanced Concepts",
      "description": "Master advanced tools, frameworks, or optimizations",
      "resources": ["Research papers", "Advanced book"]
    },
    {
      "step": 5,
      "title": "Portfolio & Networking",
      "description": "Showcase projects, contribute to open source, and engage with community",
      "resources": ["LinkedIn group", "Conference", "Hackathon"]
    }
  ],
  "future": {
    "relevance_score": 0,
    "demand_growth": "Short text about expected demand in future",
    "emerging_trends": ["Trend 1", "Trend 2", "Trend 3"]
  },
  "prior_knowledge_alignment": 0,
  "bestBooks": [],
  "bestCourses": [],
  "bestYoutubeChannels": [],
  "bestWebsites": [],
  "goodProjects": [
    {
      "name": "Project 1",
      "description": "Short detail of the project",
      "difficulty": "Beginner/Intermediate/Advanced",
      "githubExample": "Link"
    },
    {
      "name": "Project 2",
      "description": "Short detail of the project",
      "difficulty": "Intermediate",
      "githubExample": "Link"
    }
  ],
  "topCompanies": [
    {
      "name": "Company 1",
      "roles": ["Role A", "Role B"],
      "hiringTrends": "Short description"
    },
    {
      "name": "Company 2",
      "roles": ["Role X", "Role Y"],
      "hiringTrends": "Short description"
    }
  ],
  "avgPackages": {
    "india": "₹ X-Y LPA",
    "usa": "$X-Y per year",
    "europe": "€X-Y per year"
  }
}


USER INPUT:
- Name: ${name}
- Previous Experience: ${previousExperience}
- New Topic: ${topic}
`;
  try {
   const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt, });
   return response.text;
    }
    catch (error) {
      console.error("Error:", error);
      return null;
    }
}


export function sleep(ms) {
  
}