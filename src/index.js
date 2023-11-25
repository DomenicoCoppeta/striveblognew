import express from 'express';
import apiRouter from "./apiRouter.js";
import mongoose from "mongoose";

const server = express();

const port = 3030;

server.use("/api", apiRouter);

// mongodb+srv://domenicocoppeta:vsc7PQWQXHNbgMWx@epicode-m6.vcya6og.mongodb.net/

mongoose
    .connect (
        "mongodb+srv://domenicocoppeta:vsc7PQWQXHNbgMWx@epicode-m6.vcya6og.mongodb.net/striveblog"
    )
    .then(()=>{
        server.listen(port, () => {
            console.log("Server listening on port " + port);
        });
    })
    .catch(() => {
        console.log("DB Connection error")
    });
