import { Router } from "express";
import { getUsersBalanceController } from "./users.controller.js";

const router = Router();

router.get("/transactions", getUsersBalanceController)

export default router;
