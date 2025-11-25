import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos} from  "../controllers/like.controller.js";


const router = Router();

router.route("/toggle_video_like/:videoId").patch(verifyJWT, toggleVideoLike);
router.route("/toggle_comment_like/:commentId").patch(verifyJWT, toggleCommentLike);
router.route("/toggle_tweet_like/:tweetId").patch(verifyJWT, toggleTweetLike);
router.route("/get_liked_videos").get(verifyJWT, getLikedVideos);



export default router;