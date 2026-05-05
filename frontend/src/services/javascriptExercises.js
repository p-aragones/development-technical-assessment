import { apiRequest } from "./api";

export function runJavaScriptExercise1(code) {
  return apiRequest("/javascript/exercise1", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}
