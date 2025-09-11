import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let jwtSecret = process.env.JWT_SECRET;

export async function loginController(req, res) {

    let { username, password } = req.body;

    let user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({ "status": "error", "message": "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.json({ "status": "error", "message": "Invalid password" });
    }

    let token = await jwt.sign({ id: user._id }, jwtSecret);

    return res.json({ 
        "status": "success",
        "user":{
            "fullname": user.fullname,
            "avatar": user.avatar,
            "username": user.username,
            "email": user.email,
            "token": token
        }
     });
};


export async function registerController(req, res) {

   

    let newUser = new UserModel(req.body);
    await newUser.save();

    let token = jwt.sign({ id: newUser._id }, jwtSecret);

    return res.json({ 
        "status": "success",
        "user":{
            "fullname": newUser.fullname,
            "avatar": newUser.avatar,
            "username": newUser.username,
            "email": newUser.email,
            "token": token
        }
     });



}