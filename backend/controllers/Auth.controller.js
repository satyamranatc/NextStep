import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

let jwtSecret = process.env.JWT_SECRET;

export async function loginController(req, res) {

    let { email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (!user) {
        return res.json({ "status": "error", "message": "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.json({ "status": "error", "message": "Invalid password" });
    }

    let token = jwt.sign({ id: user._id }, jwtSecret);

    return res.status(201).json({ 
            "_id": user._id,
            "fullName": user.fullName,
            "avatar": user.avatar,
            "email": user.email,
            "token": token
     });
};


export async function registerController(req, res) {

   
    console.log(req.body);
    let newUser = new UserModel(req.body);
    await newUser.save();

    let token = jwt.sign({ id: newUser._id }, jwtSecret);

    return res.status(201).json({ 
           "_id": newUser._id,
            "fullName": newUser.fullName,
            "avatar": newUser.avatar,
            "email": newUser.email,
            "token": token
     });



}