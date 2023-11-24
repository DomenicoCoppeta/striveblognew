import express from 'express';
import mongoose from 'mongoose';
import list from 'express-list-endpoints';

const server = express();
const port = 3030;

server.listen(port, () => {
    console.log('Server listening on port: ', port);
});

