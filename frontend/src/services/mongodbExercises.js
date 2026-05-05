import { apiRequest } from "./api";

export function getUserSpending() {
  return apiRequest("/mongo/getUserSpending");
}
