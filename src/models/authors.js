import mongoose, { Model, Schema } from "mongoose";

const AuthorSchema = new Schema ({
    nome: {
        type: String,   
        required: true,
    },
    cognome: {
        type: String,  
        required: true,
    },
    email: {
        type: String,   
        required: true,
    },
    dataDiNascita: {
        type: String,   
        required: true,
    },
    avatar: {
        type: String,
    }
});

export const Author = mongoose.model("authors", AuthorSchema);