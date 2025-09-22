import "dotenv/config"
import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";

let jwtSecret = process.env.JWT_SECRET;

export default async function authMiddleware(req, res, next) {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ "status": "error", "message": "Unauthorized" });
    }

    try {
        let decoded = jwt.verify(token, jwtSecret);
        let user = await UserModel.findOne({ _id: decoded.id });
        if (!user) {
            return res.status(401).json({ "status": "error", "message": "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ "status": "error", "message": "Unauthorized, Invalid token" });
    }
}