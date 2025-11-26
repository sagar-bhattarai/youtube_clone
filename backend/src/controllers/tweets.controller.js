import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweets.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateObjectId } from "../utils/validateObjectId.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet

  const { tweet } = req.body;

  const tweetCreated = await Tweet.create({
    tweet,
    owner: req.user._id,
  });

  if (!tweetCreated) {
    throw new ApiError(400, "tweet could not be created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweetCreated, "tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets

  const userTweets = await Tweet.find({ owner: req.user._id }).populate(
    "tweet"
  );

  if (!userTweets) {
    throw new ApiError(400, "tweet could not be found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userTweets, "all tweet fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet

  const { tweetId, tweet } = req.body;

  await validateObjectId(tweetId, Tweet, "tweet");

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        tweet,
      },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));

});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet

  const { tweetId } = req.params;

  await validateObjectId(tweetId, Tweet, "tweet");

  const tweetDeleted = await Tweet.findByIdAndDelete(tweetId);

  if(!tweetDeleted){
    throw new ApiError(400, "could not delete a tweet");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, tweetDeleted, "tweet deleted successfully"));

});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
