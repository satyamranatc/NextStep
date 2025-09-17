import mongoose from "mongoose";

const RoadmapStepSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  resources: [{ type: String }]
});

const GoodProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  githubExample: { type: String }
});

const TopCompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  roles: [{ type: String }],
  hiringTrends: { type: String }
});

const FutureSchema = new mongoose.Schema({
  relevance_score: { type: Number, default: 0 },
  demand_growth: { type: String },
  emerging_trends: [{ type: String }]
});

const AvgPackagesSchema = new mongoose.Schema({
  india: { type: String },
  usa: { type: String },
  europe: { type: String }
});

// Main Schema:
const CareerGuideSchema = new mongoose.Schema({
  greetings: { type: String, required: true },
  prior_knowledge: { type: String },
  roadmap: [RoadmapStepSchema],
  future: FutureSchema,
  prior_knowledge_alignment: { type: Number, default: 0 },
  bestBooks: [{ type: String }],
  bestCourses: [{ type: String }],
  bestYoutubeChannels: [{ type: String }],
  bestWebsites: [{ type: String }],
  goodProjects: [GoodProjectSchema],
  topCompanies: [TopCompanySchema],
  avgPackages: AvgPackagesSchema,

}, { timestamps: true });

export default mongoose.model("CareerGuide", CareerGuideSchema);
