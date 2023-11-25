import express from "express";
import authorsRouter from "./authorsRouter.js"

const apiRouter = express.Router();

apiRouter.use(express.json());

apiRouter.get('/test', (req, res) => {
    res.json({message: "Hello, world!"});
})

apiRouter.post("/body", (req, res)  => {
console.log(req.body);
res.status(200).send();
})

apiRouter.use("/authors", authorsRouter)


export default apiRouter