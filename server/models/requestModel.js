import { Schema, model, models, Types } from "mongoose";

const rqstSchema = new Schema({
    status: {
        type: String,
        enum: [ "pending", "accepted", "rejected" ],
        default: "pending",
    },
    sender: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    {
        timestamps: true,
    }
);

export const Request = models.Request || model("Request", rqstSchema);