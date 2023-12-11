import express from 'express';
import apiRouter from "./apiRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import list from "express-list-endpoints";
import genericError from "./middlewares/genericError.js"

const app = express();
const port = process.env.PORT || 3030;


app.use(cors());
dotenv.config();


app.use("/api", apiRouter);
app.use(genericError);
app.get("/ok", (req, res) => {
    res.status(200).send()}
    );
    

mongoose
    .connect
        (process.env.MONGO_URL)
    .then(()=>{
        app.listen(port, () => {
            console.log("Server listening on port " + port);
            // console.log(list(app));
        });
    })
    .catch(() => {
        console.log("DB Connection error")
    });
