import { Request, Response } from "express";
import { db } from '../index.js';
import { v4 as uuidv4 } from 'uuid';

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                return res.status(400).send('Email and password are required');
            }
            
            console.log("all required properties are present");
    
            const userId = uuidv4();

            console.log("user id is here: ", userId);

            await db.collection('users').doc(userId).set({
                email: email,
                password: password,
            });

            console.log("collection adding done");
    
            return res.status(201).send({
                message: 'User created successfully',
                userId: userId,
            });
        } catch (error) {
            console.log("ERROR : " + error);
            return res.status(500).send('Error creating user: ' + error.message);
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send('Email and password are required');
            }

            const userQuerySnapshot = await db.collection('users')
                                            .where('email', '==', email)
                                            .limit(1)
                                            .get();

            if (userQuerySnapshot.empty) {
                return res.status(401).send('Invalid email or password');
            }

            const userDoc = userQuerySnapshot.docs[0];
            const user = userDoc.data();

            const passwordMatch = password === user.password;

            if (!passwordMatch) {
                return res.status(401).send('Invalid email or password');
            }

            return res.status(200).send({
                message: 'Login successful',
                userId: userDoc.id,
            });
        } catch (error) {
            console.log("ERROR : " + error);
            return res.status(500).send('Error logging in: ' + error.message);
        }
    }

}