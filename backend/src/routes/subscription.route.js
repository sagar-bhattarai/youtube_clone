import { Router } from "express";
import {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/do_subscription/:channelId").get(verifyJWT, toggleSubscription);
router.route("/get_subscribers/:channelId").get(verifyJWT, getUserChannelSubscribers);
router.route("/get_subscribed_channel/:subscriberId").get(verifyJWT, getSubscribedChannels);

export default router;
