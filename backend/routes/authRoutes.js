import { Router } from "express";
import { loginController, registerController } from "../controllers/Auth.controller.js";

const router = Router();

router.get("/login",loginController);
router.get("/register",registerController);



export default router;