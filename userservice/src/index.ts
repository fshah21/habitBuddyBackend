import * as functions from 'firebase-functions';
import express from "express";
import { userRoutes } from './routes/user.routes';
import { getFirestore } from "firebase-admin/firestore";
import { goalRoutes } from './routes/goal.routes';
import { matchesRoutes } from './routes/matches.routes';
import { server, io } from './socket';

const admin = require('firebase-admin');
const serviceAccount = require('./keys/habitbuddy.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://habitbuddy-d67d1.firebaseio.com"
});
export const db = getFirestore("habitbuddy");

const app = express();

app.use(express.json());

app.use('/healthCheck', (_, res) => {
    return res.status(200).send("Hello World!");
})

app.use(userRoutes);
app.use(goalRoutes);
app.use(matchesRoutes);

const httpServer = server.listen(3000, () => {
    console.log('HTTP Server is running on port 3000');
});

io.attach(httpServer);

export const userservice = functions.region('asia-south1').https.onRequest(app);