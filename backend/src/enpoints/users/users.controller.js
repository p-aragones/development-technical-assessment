import { getUsersBalance } from "./users.service.js";

export async function getUsersBalanceController(req, res, next) {
  try {
    const minBalance = req.query.minBalance ? Number(req.query.minBalance) : null;
    const result = await getUsersBalance(minBalance);

    res.json(result);
  } catch (error) {
    next(error);
  }
}
