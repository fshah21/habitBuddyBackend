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

    static async getGoalById(req: Request, res: Response) {
        const { goal_id } = req.params;

        try {
            // Retrieve the goal from Firestore
            const goalDoc = await db.collection('goals').doc(goal_id).get();

            if (!goalDoc.exists) {
                return res.status(404).send('Goal not found');
            }

            return res.status(200).send(goalDoc.data());
        } catch (error) {
            console.error("ERROR : " + error);
            return res.status(500).send('Error retrieving goal: ' + error.message);
        }
    }

    static async getAllGoals(req: Request, res: Response) {
        try {
            // Fetch all documents from the 'goals' collection
            const goalsSnapshot = await db.collection('goals').get();

            // Check if there are any documents
            if (goalsSnapshot.empty) {
                return res.status(404).send('No goals found');
            }

            // Map the documents to an array of goal objects
            const goals = goalsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return res.status(200).send(goals);
        } catch (error) {
            console.error("ERROR : " + error);
            return res.status(500).send('Error retrieving goals: ' + error.message);
        }
    }

    static async addUserGoal(req: Request, res: Response) {
        try {
            const { user_id, goal_id } = req.body;

            // Basic validation
            if (!user_id || !goal_id) {
                return res.status(400).send('User ID and Goal ID are required');
            }

            // Check if the goal exists
            const goalDoc = await db.collection('goals').doc(goal_id).get();
            if (!goalDoc.exists) {
                return res.status(404).send('Goal not found');
            }

            // Create a new entry in usergoalmatches for the user_id and goal_id pair
            const matchId = uuidv4();
            await db.collection('usergoalmatches').doc(matchId).set({
                user_id: user_id,
                goal_id: goal_id,
            });

            return res.status(201).send({
                message: 'User goal added successfully',
                matchId: matchId
            });
        } catch (error) {
            console.error("ERROR : " + error);
            return res.status(500).send('Error adding user goal: ' + error.message);
        }
    }
}