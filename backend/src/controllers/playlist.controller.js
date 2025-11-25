import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const playlistCreated = await Playlist.create({
    name: name,
    description: description,
    owner: req.user._id,
  });

  if (!playlistCreated) {
    throw new ApiError(400, "could not create playlist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, playlistCreated, "playlist created successfully")
    );
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  // const {userId} = req.params;
  //TODO: get user playlists

  const userId = req.user._id;
  const all_playlists = await Playlist.find(
    { owner: userId },
    { name: 1, _id: 1 }
  );

  if (!all_playlists) {
    throw new ApiError(404, "playlists not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, all_playlists, `All playlists fetched successfully`)
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id

  const playlist = await Playlist.findOne(playlistId);

  if (!playlist) {
    throw new ApiError(404, "playlist not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, `playlist fetched successfully`));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "playlist not found");
  }

  // Initialize videos if undefined
  if (!playlist.videos) playlist.videos = [];

  if (playlist.videos.includes(videoId)) {
    throw new ApiError(400, "Video already in playlist");
  }

  playlist.videos.push(videoId);
  const videoSaved = await playlist.save();

  if (!videoSaved) {
    throw new ApiError(400, "video could not be saved to playlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "video saved successfully "));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
  const deletedVideo = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $pull: {
        videos: videoId,
      },
    },
    { new: true }
  );

  if (!deletedVideo) {
    throw new ApiError(400, "Error while deleting video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedVideo, "video deleted successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist

  const playlistDeleted = await Playlist.findByIdAndDelete(playlistId);

  if (!playlistDeleted) {
    throw new ApiError(400, "playlist not found or already deleted");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, playlistDeleted, "playlist successfully deleted")
    );
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist

  // const updateFields = {};
  // if (name) updateFields.name = name;
  // if (description) updateFields.description = description;
  // console.log("updatedfields",updateFields);

   const updateFields = {
    ...(name && { name }),
    ...(description && { description })
  };

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    // { $set: updateFields },
    {$set: {...updateFields}},
    { new: true } 
  );

  if (!updatedPlaylist) {
    throw new ApiError(404, "Playlist not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPlaylist, "Playlist updated successfully")
    );
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
