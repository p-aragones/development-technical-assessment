import { getUserSpending } from "./mongoExercise.service.js";

export async function getUserSpendingController(_req, res, next) {
  try {
    const result = await getUserSpending();

    res.json(result);
  } catch (error) {
    next(error);
  }
}
