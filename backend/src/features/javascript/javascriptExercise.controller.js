import { submitExercise1Code } from "./javascriptExercise.service.js";
import { exercise2OldCode } from "./javascriptExercise.service.js";
import { exercise2NewCode } from "./javascriptExercise.service.js";

export function submitExercise1(req, res, next) {
  try {
    const result = submitExercise1Code(req.body.code);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export function submitExercise2(req, res, next) {
  try {
    if (req.body.users > req.body.transactions) {
      const error = new Error("There must be more transactions than users");
      error.statusCode = 400;
      throw error;
    }
    let result;

    if (req.body.code == 1) {
      result = exercise2OldCode(req.body.users, req.body.transactions);
    } else {
      result = exercise2NewCode(req.body.users, req.body.transactions);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}
