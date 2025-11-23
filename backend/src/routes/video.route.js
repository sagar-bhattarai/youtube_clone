import { Router } from "express";
import { getVideoById, updateVideo, publishAVideo, deleteVideo } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/publish-a-video").post(
  verifyJWT,
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);
router.route("/c/:videoId").post(verifyJWT,getVideoById);
router.route("/edit-video-details").patch(verifyJWT, upload.single("thumbnail"), updateVideo);
// router.route("/delete-video/:videoId").delete(verifyJWT, deleteVideo);  // req.params /videos/delete-video/69204622237c32d754015912
router.route("/delete-video/").delete(verifyJWT, deleteVideo); // req.query /videos/delete-video?videoId=69204622237c32d754015912


export default router;
