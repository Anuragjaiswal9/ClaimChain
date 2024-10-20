import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteItem,
  editItemDetails,
  uploadItem,
} from "../controllers/item.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//secured routes
router.route("/item/upload").post(
  verifyJWT,
  upload.fields([
    {
      name: "images",
      maxCount: 3,
    },
  ]),
  uploadItem
);

router.route("/item/edit-details").post(
  verifyJWT,
  upload.fields([
    {
      name: "images",
      maxCount: 3,
    },
  ]),
  editItemDetails
);

router.route("/item/delete-item").post(verifyJWT, deleteItem);

export default router;
