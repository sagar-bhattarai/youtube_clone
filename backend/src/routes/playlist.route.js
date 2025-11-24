import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { createPlaylist } from "../controllers/playlist.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-playlist").post(verifyJWT,  upload.none(), createPlaylist); // { "name": "mern", "description": "js"}

export default router;