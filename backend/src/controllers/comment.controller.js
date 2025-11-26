import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateObjectId } from "../utils/validateObjectId.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video

  const { videoId, comment } = req.body;

  await validateObjectId(videoId, Video, "video");

  const commentAdded = await Comment.create({
    content: comment,
    video: videoId,
    owner: req.user._id,
  });

  if (!commentAdded) {
    throw new ApiError(400, "couldnt add a comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, commentAdded, "comment successfully added"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment

  const { commentId, content } = req.body;

  await validateObjectId(commentId, Comment, "comment");

  if (content === "") {
    throw new ApiError(400, "cannot update empty comment");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment

  const { commentId } = req.params;

  await validateObjectId(commentId, Comment, "comment");

  const commentDeleted = await Comment.findByIdAndDelete(commentId);

  if (!commentDeleted) {
    throw new ApiError(400, "unable to delete comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, commentDeleted, "succesfully deleted comment"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
