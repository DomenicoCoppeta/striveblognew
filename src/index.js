import express from 'express';
import apiRouter from "./apiRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import list from "express-list-endpoints";
import genericError from "./middlewares/genericError.js"

const server = express();

const port = 3030;

dotenv.config();

server.use("/api", apiRouter);

server.use(genericError);

mongoose
    .connect
        (process.env.MONGO_URL)
    .then(()=>{
        server.listen(port, () => {
            console.log("Server listening on port " + port);
            // console.log(list(server));
        });
    })
    .catch(() => {
        console.log("DB Connection error")
    });
