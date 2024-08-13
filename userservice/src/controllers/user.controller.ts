import { Request, Response } from "express";
import { db } from '../index.js';
import { v4 as uuidv4 } from 'uuid';

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
    
            // Basic validation
            if (!email || !password) {
                return res.status(400).send('Email and password are required');
            }
    
            // Generate a unique ID for the user
            const userId = uuidv4();
    
            // Create a new user document in Firestore
            await db.collection('users').doc(userId).set({
                id: userId,
                email: email,
                password: password, // In a real application, never store plain text passwords. Use hashing (e.g., bcrypt).
            });
    
            return res.status(201).send({
                message: 'User created successfully',
                userId: userId,
            });
        } catch (error) {
            return res.status(500).send('Error creating user: ' + error.message);
        }
    }

    static async login(req: Request, res: Response) {
        
    }

}