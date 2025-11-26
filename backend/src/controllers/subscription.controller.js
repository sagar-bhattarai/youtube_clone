import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateObjectId } from "../utils/validateObjectId.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription

  await validateObjectId(channelId, User, "user");

  const existingSubscripiton = await Subscription.findOne({
    channel: channelId,
  });

  let result = "something went wrong";
  if (existingSubscripiton) {
    const del = await Subscription.deleteOne({ _id: existingSubscripiton._id });
    if (del.deletedCount) {
      result = { subscribed: false };
    }
  } else {
    const created = await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });
    if (created) {
      result = { subscribed: true };
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Toggle subscription successful"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  await validateObjectId(channelId, User, "user");

  const subscribed_channel = await Subscription.find({
    channel: channelId,
  }).populate("subscriber");

  if (!subscribed_channel) {
    throw new ApiError(400, "couldnot find subscribed channel");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribed_channel,
        "All subscribed channel fetched successfully"
      )
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  await validateObjectId(subscriberId, User, "user");

  const subscribers = await Subscription.find({
    subscriber: subscriberId,
  }).populate("channel");

  if (!subscribers) {
    throw new ApiError(400, "couldnot find subscribers");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, subscribers, "All subscribers fetched successfully")
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
