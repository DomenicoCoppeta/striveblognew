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
        value: Number,
        unit: String,
    },
    author: { 
            type: Schema.Types.ObjectId,
            ref: 'authors',
            required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comments: [
        {
            author: { 
                type: Schema.Types.ObjectId,
                ref: 'authors',
                required: true,
            },
            text: { type: String,
                    required: true,
            },
            // replyTo: { type: Schema.Types.ObjectId,
            //             ref: 'blogPost.comments'}
        }
    ]
});

export const BlogPost = mongoose.model('blogposts', BlogPostSchema);