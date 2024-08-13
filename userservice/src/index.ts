import * as functions from 'firebase-functions';
import express from "express";
import { userRoutes } from './routes/user.routes';
const admin = require('firebase-admin');
const serviceAccount = require('./keys/habitbuddy.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
export const db = admin.firestore();

const app = express();

app.use(express.json());

app.use('/healthCheck', (_, res) => {
    return res.status(200).send("Hello World!");
})

app.use(userRoutes);

export const userservice = functions.region('asia-south1').https.onRequest(app);
