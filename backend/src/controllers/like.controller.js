import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateObjectId } from "../utils/validateObjectId.js";
import { Video } from "../models/video.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  await validateObjectId(videoId, Video, "video");

  const existingLike = await Like.findOne({ video: videoId, likedBy: req.user._id });

  let result;

  if (existingLike) {
    await Like.deleteOne({ _id: existingLike._id });
    result = { liked: false };
  } else {
    await Like.create({
      video: videoId,
      likedBy: req.user._id,
    });
    result = { liked: true };
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Toggle like successful"));

});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
