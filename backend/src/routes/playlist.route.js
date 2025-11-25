import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { createPlaylist, getUserPlaylists, getPlaylistById, addVideoToPlaylist, removeVideoFromPlaylist, deletePlaylist, updatePlaylist} from "../controllers/playlist.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/create_playlist").post(verifyJWT,  upload.none(), createPlaylist); // { "name": "mern", "description": "js"}
router.route("/get_user_playlists").get(verifyJWT, getUserPlaylists);
router.route("/c/:get_playlist_by_id").get(verifyJWT, getPlaylistById);
// router.route("/add-video-to-playlist/:playlistId/video/:videoId").post(verifyJWT, addVideoToPlaylist);
router.route("/add_to_playlist/:playlistId/video/:videoId").post(verifyJWT, addVideoToPlaylist);
router.route("/remove_from_playlist/:playlistId/video/:videoId").delete(verifyJWT, removeVideoFromPlaylist);
router.route("/delete_playlist/:playlistId").delete(verifyJWT, deletePlaylist);
router.route("/update_playlist/:playlistId").patch(verifyJWT, updatePlaylist);


export default router;