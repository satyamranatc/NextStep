import {Router} from "express";
import askAi from "../Utils/AskAi.js";
import GuideModel from "../models/Guide.model.js";
import UserModel from "../models/User.model.js";

let router = Router();  


router.post("/askQuery/:id", async (req, res) => {
    let userId = req.params.id;

    let { name, topic, previousExperience } = req.body;

    let aiRes = await askAi(topic, previousExperience, name);
    let aiResJSON = JSON.parse(aiRes);



    let guideModel = new GuideModel(aiResJSON);
    await guideModel.save();

    let userModel = await UserModel.findOne({ _id: userId });
    userModel.chats.push(guideModel._id);
    await userModel.save();


    res.json(aiResJSON);
    


});


export default router;