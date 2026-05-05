import { apiRequest } from "./api";

export function runJavaScriptExercise1(code) {
  return apiRequest("/javascript/exercise1", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export function runJavaScriptExercise2(code, users, transactions) {
  return apiRequest("/javascript/exercise2", {
    method: "POST",
    body: JSON.stringify({ code, users, transactions }),
  });
}
