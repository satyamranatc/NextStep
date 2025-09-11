import {Router} from "express";
import askAi from "../Utils/AskAi.js";

let router = Router();  


router.post("/askQuery", (req, res) => {
    let { name, topic, previousExperience } = req.body;

    askAi(topic, previousExperience, name).then((response) => {
        // Comvert To Json
        response = JSON.parse(response);
        res.json(response);
    }).catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    });
});


export default router;