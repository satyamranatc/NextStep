import UserModel from "../models/User.model.js";
import Router from "express"

let router = Router();

router.put("/update", (req, res) => {

    let { email, fullName, avatar } = req.body;

    UserModel.findOneAndUpdate({ email }, { fullName, avatar }).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    });    
})

router.delete("/delete", (req, res) => {

    let { email } = req.body;

    UserModel.findOneAndDelete({ email }).then((response) => {
        res.json(response);
    }).catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    });    
})



export default router;