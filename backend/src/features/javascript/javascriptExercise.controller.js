import { submitExercise1Code } from "./javascriptExercise.service.js";

export function submitExercise1(req, res, next) {
  try {
    const result = submitExercise1Code(req.body.code);

    res.json(result);
  } catch (error) {
    next(error);
  }
}
