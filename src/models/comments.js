import mongoose, { Model, Schema } from "mongoose";

const CommentSchema = new Schema ({
    author: {
        type: Schema.Types.ObjectId,
        ref: "authors",
    },
    text: {
        type: String,   
        required: true,
    }
});

export const Comment = mongoose.model("comments", CommentSchema);



       