import {Router} from "express";
import askAi from "../Utils/AskAi.js";
import GuideModel from "../models/Guide.model.js";
import UserModel from "../models/User.model.js";

let router = Router();  


router.post("/askQuery/:id", async (req, res) => {
    let userId = req.params.id;
    let { name, topic, previousExperience } = req.body;

    askAi(topic, previousExperience, name).then(async (response) => {
        // Comvert To Json
        response = JSON.parse(response);
        res.json(response);

        // Save to DB
        GuideModel.create(response).then((response) => {
            res.json(response);
        }).catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Something went wrong. Please try again.' });
        });

        let user = await UserModel.findOne({ _id: userId });
        user.guideId.push(response._id);
        await user.save();

    }).catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    });


});


export default router;