import { Request, Response } from "express";
// import { db } from '../index.js';
import { v4 as uuidv4 } from 'uuid';

export class MatchController {
  /*
  static async findMatchForUserGoal(req: Request, res: Response) {
        const { user_id, goal_id } = req.body;
    try {
      const userGoalMatchesRef = await db.collection('usergoalmatches');

      // Fetch documents with the same goal_id
      const querySnapshot = await userGoalMatchesRef
        .where('goal_id', '==', goal_id)
        .limit(10) // Fetch more documents to ensure a match
        .get();

      if (querySnapshot.empty) {
        console.log('No documents found with the given goal_id');
        return res.status(404).json({ message: 'No match found' });
      }

      // Find a document where matched_with is undefined or null
      const matchDoc = querySnapshot.docs.find(doc => {
        const data = doc.data();
        return data.user_id !== user_id && (data.matched_with === undefined || data.matched_with === null);
      });

      if (!matchDoc) {
        console.log('No document found with an undefined or null matched_with');
        return res.status(404).json({ message: 'No match found' });
      }

      const matchedUserId = matchDoc.data().user_id;
      const matchDocId = matchDoc.id; // Use the ID of the matched document

      // Update the original user's document
      const originalUserDoc = querySnapshot.docs.find(doc => doc.data().user_id === user_id && doc.data().goal_id === goal_id);

      if (!originalUserDoc) {
        return res.status(404).json({ message: 'Original user document not found' });
      }

      const originalUserDocId = originalUserDoc.id;

      await userGoalMatchesRef.doc(originalUserDocId).update({
        matched_with: matchedUserId,
      });

      // Update the found user's document
      await userGoalMatchesRef.doc(matchDocId).update({
        matched_with: user_id,
      });

      console.log(`User ${user_id} matched with user ${matchedUserId}`);
      return res.status(200).json({
        message: 'Match found and updated successfully',
        matched_with: matchedUserId,
      });

    } catch (error) {
      console.error('Error finding match:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getUserGoalMatches(req: Request, res: Response) {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }

    try {
      const userGoalMatchesRef = db.collection('usergoalmatches');

      console.log("USER GOAL MATCHES", userGoalMatchesRef);

      // Fetch matched goals (matched_with is present)
      const matchedSnapshot = await userGoalMatchesRef
        .where('user_id', '==', user_id)
        .where('matched_with', '!=', null) // Check for any non-null matched_with
        .get();

      console.log("")

      const matchedGoals = matchedSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("MATCHED GOALS", matchedGoals);
      // Fetch unmatched goals (matched_with is null or undefined)
      const unmatchedSnapshot = await userGoalMatchesRef
        .where('user_id', '==', user_id)
        .get();

      const unmatchedGoals = unmatchedSnapshot.docs
        .filter(doc => !doc.data().hasOwnProperty('matched_with') || doc.data().matched_with === null)
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
      console.log("UNMATCHED GOALS", unmatchedGoals);

      return res.status(200).json({
        matched: matchedGoals,
        unmatched: unmatchedGoals,
      });
    } catch (error) {
      console.error('Error finding user goal matches:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
    */
}
