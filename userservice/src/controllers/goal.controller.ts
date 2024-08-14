import { Request, Response } from "express";
import { db } from '../index.js';
import { v4 as uuidv4 } from 'uuid';

export class GoalController {
    static async addGoal(req: Request, res: Response) {
        try {
            const { name, description } = req.body;

            // Basic validation
            if (!name || !description) {
                return res.status(400).send('Name and description are required');
            }

            // Generate a unique ID for the goal
            const goalId = uuidv4();

            // Add the goal to Firestore
            await db.collection('goals').doc(goalId).set({
                name: name,
                description: description,
            });

            return res.status(201).send({
                message: 'Goal added successfully',
                goalId: goalId,
            });
        } catch (error) {
            console.error("ERROR : " + error);
            return res.status(500).send('Error adding goal: ' + error.message);
        }
    }
}