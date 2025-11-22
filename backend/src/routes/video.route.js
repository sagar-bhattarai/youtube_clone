import { Router } from "express";
import { getVideoById, updateVideo, publishAVideo } from "../controllers/video.controller.js";
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

export default router;
