import { Router } from "express";
import { submitExercise1 } from "./javascriptExercise.controller.js";

const router = Router();

router.post("/exercise1", submitExercise1);

export default router;
