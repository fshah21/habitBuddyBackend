import { Router } from "express";
import { MatchController } from "../controllers/match.controller";

export const matchesRoutes = Router();

matchesRoutes.post("/matches/matchUserGoal", MatchController.matchUserGoal);
