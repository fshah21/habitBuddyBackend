import * as functions from 'firebase-functions';
import express from "express";

const app = express();

app.use(express.json());

app.use('/healthCheck', (_, res) => {
    return res.status(200).send("Hello World!");
})

export const userservice = functions.region('asia-south1').https.onRequest(app);
