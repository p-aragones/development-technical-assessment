import { apiRequest } from "./api";

export function getUserSpending() {
  return apiRequest("/mongo/getUserSpending");
}

export function getTransactionMismatch() {
  return apiRequest("/mongo/getTransactionMismatch");
}
