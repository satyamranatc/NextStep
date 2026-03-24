import {Router} from "express";
import askAi from "../Utils/AskAi.js";
import GuideModel from "../models/Guide.model.js";
import UserModel from "../models/User.model.js";

let router = Router();  


router.post("/askQuery/:id", async (req, res) => {
    let userId = req.params.id;

    let { name, topic, previousExperience } = req.body;

    try {
        console.log("Generating guide for topic:", topic, "user:", userId);
        const aiRes = await askAi(topic, previousExperience, name);
        
        if (!aiRes) {
            console.error("AI returned null/empty response. Check your API key.");
            return res.status(500).json({ 
                status: "error", 
                message: "AI service failed. Please check your GEMINI_API_KEY in the backend .env file." 
            });
        }

        console.log("Raw AI Response received. Attempting to parse...");
        
        let aiResJSON;
        try {
            const jsonMatch = aiRes.match(/\{[\s\S]*\}/);
            const jsonString = jsonMatch ? jsonMatch[0] : aiRes;
            aiResJSON = JSON.parse(jsonString);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            console.log("Problematic AI Response:", aiRes);
            return res.status(500).json({ 
                status: "error", 
                message: "AI returned invalid JSON. Please try again." 
            });
        }

        console.log("Saving guide to database...");
        let guideModel = new GuideModel(aiResJSON);
        await guideModel.save();

        let userModel = await UserModel.findById(userId);
        if (userModel) {
            userModel.chats.push(guideModel._id);
            await userModel.save();
        }

        console.log("Guide generated and saved successfully!");
        return res.json(aiResJSON);
    } catch (error) {
        console.error("Detailed AI Route Error:", error);
        return res.status(500).json({ 
            status: "error", 
            message: error.message || "An unexpected error occurred during guide generation." 
        });
    }
});


export default router;