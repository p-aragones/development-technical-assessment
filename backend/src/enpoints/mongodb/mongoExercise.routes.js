import { Router } from "express";
import { getUserSpendingController, getTransactionMismatchController, getRetriedTransactionsController } from "./mongoExercise.controller.js";

const router = Router();

router.get("/getUserSpending", getUserSpendingController);
router.get("/getTransactionMismatch", getTransactionMismatchController);
router.get("/getRetriedTransactions", getRetriedTransactionsController);
export default router;
