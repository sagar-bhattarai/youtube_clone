import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
// import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ApiError(400, "No data received");
  }

  const requiredFields = ["title", "description", "duration"];
  // Check missing keys OR empty values
  for (const field of requiredFields) {
    const value = req.body[field];

    if (!value || value.trim() === "") {
      throw new ApiError(400, `${field} is required`);
    }
  }

  const { title, description, duration, isPublished } = req.body;
  //   if (Number(duration) !== Number) {
  //     throw new ApiError(400, "video duration must be number");
  //   }

  // Video
  const videoLocalPath = req.files?.video?.[0]?.path;
  if (!videoLocalPath) {
    throw new ApiError(400, "video file is required");
  }
  const video = await uploadOnCloudinary(videoLocalPath);
  if (!video) {
    throw new ApiError(500, "Error while uploading video");
  }

  // Thumbnail
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail file is required");
  }
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnail) {
    throw new ApiError(500, "Error while uploading thumbnail");
  }

  // user
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken -watchHistory"
  );
  if (!user) {
    throw new ApiError(404, "Invalid Access, user not found");
  }

  const videoUploaded = await Video.create({
    title: title,
    description: description,
    videoFile: video.url,
    thumbnail: thumbnail.url,
    duration: duration,
    isPublished: isPublished,
    owner: user._id,
  });

  if (videoUploaded) {
    return res
      .status(201)
      .json(new ApiResponse(200, videoUploaded, "video uploaded successfully"));
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);

  /* 
    check if video is private or published 
    if not publised then show only to owner
  */
  // const videoOwner = User.findById(video.owner);
  // console.log("videoOwner",videoOwner);

  if (!video) {
    throw new ApiError(404, "video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  // const { videoId } = req.params;
  const { videoId, title, description, isPublished } = req.body;
  const thumbnailLocalPath = req.file?.path;

  let thumbnail;
  if (thumbnailLocalPath) {
    const upload = await uploadOnCloudinary(thumbnailLocalPath);
    thumbnail = upload.url;
    if (!thumbnail) {
      throw new ApiError(400, "Error while updating thumbnail");
    }
  }

  const updateFields = {
    ...(title && { title }),
    ...(description && { description }),
    ...(thumbnail && { thumbnail }),
    ...(isPublished && { isPublished }),
  };

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        ...updateFields,
      },
    },
    { new: true }
  );

  if (!updatedVideo) {
    throw new ApiError(400, "could not update video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params; // /videos/delete-video/69204622237c32d754015912
  //  const { videoId } = req.query;     // /videos/delete-video?videoId=69204622237c32d754015912

  console.log("videoId", videoId);

  const videoDeleted = await Video.findByIdAndDelete(videoId);
  if (!videoDeleted) {
    throw new ApiError(400, "Video not found or already deleted");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, videoDeleted, "Video successfully deleted"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    { $set: { isPublished: !video.isPublished } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video status toggled successfully"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
