import { Router } from "express";
import { getUserSpendingController, getTransactionMismatchController } from "./mongoExercise.controller.js";

const router = Router();

router.get("/getUserSpending", getUserSpendingController);
router.get("/getTransactionMismatch", getTransactionMismatchController);

export default router;
