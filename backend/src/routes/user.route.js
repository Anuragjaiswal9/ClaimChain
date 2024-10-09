import { Router } from "express";
import { registerUser, verifyUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/user/verify/:id/:token").get(verifyUser);

export default router;