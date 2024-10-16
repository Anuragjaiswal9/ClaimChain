import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateUserDetails,
  verifyUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/user/verify/:id/:token").get(verifyUser);
router.route("/login").post(loginUser);

//secured routes
router.route("/user/logout").post(verifyJWT, logoutUser);
router.route("/user/update-profile").post(
  verifyJWT,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  updateUserDetails
);
router.route("/user/update-profile/password").post(verifyJWT, updatePassword);

export default router;
