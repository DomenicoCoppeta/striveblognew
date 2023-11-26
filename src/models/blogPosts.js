import mongoose, { Model, Schema } from "mongoose";

const BlogPostSchema = new Schema({
    category: { 
        type: String,
        required: true,
    },
    title: { 
        type: String,
        required: true,
    },
    cover: { 
        type: String,
        required: true,
    },
    readTime: { 
        value: {
            type: Number,
            required: true,
        },
        unit: {
            type: Number,
            required: true,
        }
    },
    author: { 
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: Number,
            required: true,
        }
    },
    content: {
        type: String,
        required: true,
    },
});

export const BlogPost = mongoose.model('BlogPost', BlogPostSchema);