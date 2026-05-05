import { Router } from "express";
import { submitExercise1 } from "./javascriptExercise.controller.js";
import { submitExercise2 } from "./javascriptExercise.controller.js";

const router = Router();

router.post("/exercise1", submitExercise1);
router.post("/exercise2", submitExercise2);

export default router;
