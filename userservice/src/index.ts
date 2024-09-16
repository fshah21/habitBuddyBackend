import * as functions from 'firebase-functions';
import express from "express";
import { userRoutes } from './routes/user.routes';
import { getFirestore } from "firebase-admin/firestore";
import { goalRoutes } from './routes/goal.routes';
import { matchesRoutes } from './routes/matches.routes';
import { server, io } from './socket';

const admin = require('firebase-admin');
const serviceAccount = {
    "type": "service_account",
    "project_id": "habitbuddy-d67d1",
    "private_key_id": "91e1be12001484cc312c1a5968a46d880ca926d9",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCzWZyjvKgW49Pu\n34YdRBIdKtT7XZRMMndWVnUhc1I1low+IxLvnszlZKxM1iYvz/mtJfSTFoJss7pf\nTVUNSywC8wMdzGQdlSh6SFsz0DWh07Q7/jfvLoGEBdkf5j+mn3K8QgKFtwgaG49b\niV2pRSOlQcg8nMUGJ9R3ez+Vnhh3kfhXu0gtCEM/msRV28jizdQRWMlAsk4LFkqp\nMTUjUeD2sRsWNqDIOXvCcnAtGCB7ZtQjCk0RorJia1sXj9WCy35VQYarU2I8V0LO\nMEV5iqx8LkOx9me264ln6PH2v0hj47in8vVF5nj72/yCvBmm8eyvT5NK7DdpGCFA\n19kdmEgPAgMBAAECggEAB/Mr71IYfVNB/K+pyThQOTzBzhaa0TnXcltIu9/ZwAhZ\nVRPG7hoy6OQqgwlnDe2BGry496AizeC1nS3XXEx9ue+9rp91vJ30+l6ktEpBZlf1\nAEfHgPGlyg1cT36sSZ19v3yJkhXH5ShdlWgkX7Fx4AxnbNBiJ2CymU08R0yHtx0N\nLYCb/Iciw+b8fMUhfRT5PaYVfPcyjLsYFZqHJdaX31rRjfzxkbkv65Zw5JGCNHkn\n7i3ZyX4BYTaH+1ZR7+N6ZerHuT4o3RTh8UTKih+UXyakyzAL8c/kkoZXg03xaF0w\nMRL2LtFz+q2OK0cURsXRJgPDKy+SgTULs8DJndwOwQKBgQDw9Idzf0KmHRF5GgjC\n8e/BpTfINkV9pgihRPCfK8glYimqhtE7p1Ynh8tRK7Qli3PuOwP+wx65MGZ2ooaw\nr34SEt9pxo53gK8Wo9qRmf7nbvI1BNkhJp5GLFR28Xxv4MfYbIZfsRI1tsdpo512\nRejAbqg8LZTSqvaHA6WvN7+goQKBgQC+jGAGogppqsw71V6tRPwukTNSX+7W7Bcy\nAqUoOGuIHtKeDJOF2g7ONmQaxk/obtDCL8bcEWA01gaMsoUFnHPoZB53IWikTP7i\nZG6SCoo6Xk6oBtatPZFZOhbmkBqvxZcGML9l7PwzZV/u4z1YOO5j36MYHE6FMRWg\nKTyeKhU6rwKBgDrnPDmS0aM0FfJp19x4Mmk/T2ylP8WgkhmCdeQjWtEwtwjV3k5b\n8ObG/oAAVBCdj6CcUrSz1E3nNBUqVAzbSdF3RaBhBrDWB3dcZPEVGUhQSeuGHOJK\nw4RaD+fnzsi2xYP1u7+m1NHGtebwNW0VV/m602uqpOf/HTcSQC2eTj0hAoGAaVRp\nZGFARkbenJiGvFrs18T1zKww92cML13c8820S0tWe31SMuRl2MGiNla3JzHSffUx\nBMcqGirQ9gdclsx0Gdr2KD40fNX+8yA3Ks1euYMWEbWuB5eH9/2vWQYBanZb1FUw\nB+SnSLXaANBmQZU+2cBuhE5pbSDD5oPE+V0j3QsCgYATqNXqGrMTBcAQsRtB7s+z\n4aJapEHb5dKD+rR6Gn43aoHcXRq6bz4Yp5o9d0pjpi93P2IDzTpnxEzi5pe9sbFY\nwmeekca7tsmAsr92F/TUHUXfNxcM1VJgbVjqrceE+9puqd3jkpDqsKFxoWCIQhPq\noMCLzAE9fWJrtI7P69h4Yg==\n-----END PRIVATE KEY-----\n",
    "client_email": "habitbuddy-d67d1@appspot.gserviceaccount.com",
    "client_id": "117410131588431597247",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/habitbuddy-d67d1%40appspot.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}
  
console.log('SERVICE_ACCOUNT:', serviceAccount);

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