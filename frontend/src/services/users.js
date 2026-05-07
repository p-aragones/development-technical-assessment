import { apiRequest } from "./api";

export function getUsersBalance(minBalance) {
  const query = minBalance != null ? `?minBalance=${minBalance}` : "";

  return apiRequest(`/users/transactions${query}`, {
    method: "GET",
  });
}