import express from 'express';
import apiRouter from "./apiRouter.js";

const server = express();

const port = 3030;


server.use("/api", apiRouter);

server.listen(port, () => {
    console.log('Server listening on port: ', port);
});

