import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import { Playlist } from "../models/playlist.model.js";
import { Tweet } from "../models/tweets.model.js";
import { Like } from "../models/like.model.js";
import { Subscription} from "../models/subscription.model.js"
import { ApiError } from "./ApiError.js";

const validateObjectId = async (id, Model, modelName ) => {
  let validation;
  try {
    validation = await Model.findById(id);
  } catch (error) {
    throw new ApiError(400, error);
  }

  if (!validation) {
    throw new ApiError(400, `Invalid ${modelName} Id`);
  }
  return validation;
};

export {validateObjectId}