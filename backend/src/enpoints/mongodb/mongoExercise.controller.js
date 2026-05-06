import { getUserSpending, getTransactionMismatch } from "./mongoExercise.service.js";

export async function getUserSpendingController(_req, res, next) {
  try {
    const result = await getUserSpending();

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getTransactionMismatchController(_req, res, next) {
  try {
    const result = await getTransactionMismatch();

    res.json(result);
  } catch (error) {
    next(error);
  }
}
