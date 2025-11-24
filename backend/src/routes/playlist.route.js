import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { createPlaylist, getUserPlaylists, getPlaylistById, addVideoToPlaylist } from "../controllers/playlist.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/create-playlist").post(verifyJWT,  upload.none(), createPlaylist); // { "name": "mern", "description": "js"}
router.route("/get-user-playlists").get(verifyJWT, getUserPlaylists);
router.route("/c/:get_playlist_by_id").get(verifyJWT, getPlaylistById);
// router.route("/add-video-to-playlist/:playlistId/video/:videoId").post(verifyJWT, addVideoToPlaylist);
router.route("/playlist/:playlistId/video/:videoId").post(verifyJWT, addVideoToPlaylist);

export default router;