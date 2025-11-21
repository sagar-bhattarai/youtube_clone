import mongoose, { Schema } from "monogoose";

const likeSchema = new SchemaTypes(
    {
        video:{
            type: Schema.Type.ObjectId,
            ref: "Video"
        },
        comment:{
            type: Schema.Type.ObjectId,
            ref: "Comment"
        },        
        tweet:{
            type: Schema.Type.ObjectId,
            ref: "Tweet"
        },
        likedBy:{
            type: Schema.Type.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true
    }
)

export const Like = mongoose.model("Like",likeSchema);