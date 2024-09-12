import { Router } from "express";
import { GoalController } from "../controllers/goal.controller";

export const goalRoutes = Router();

goalRoutes.post("/goals/addGoal", GoalController.addGoal);
goalRoutes.get("/getAllGoals", GoalController.getAllGoals);
goalRoutes.get("/goals/:goal_id", GoalController.getGoalById);
goalRoutes.post("/goals/addUserGoal", GoalController.addUserGoal);