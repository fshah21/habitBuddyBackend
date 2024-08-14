import { Router } from "express";
import { GoalController } from "../controllers/goal.controller";

export const goalRoutes = Router();

goalRoutes.post("/goals/addGoal", GoalController.addGoal);
goalRoutes.get("/goals/getAllGoals", GoalController.getAllGoals);
goalRoutes.post("/goals/addUserGoal", GoalController.addUserGoal);
