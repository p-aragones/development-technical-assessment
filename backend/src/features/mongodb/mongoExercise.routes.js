import { Router } from "express";
import { getUserSpendingController } from "./mongoExercise.controller.js";

const router = Router();

router.get("/getUserSpending", getUserSpendingController);

export default router;
