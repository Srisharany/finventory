import { type QueryClient } from "@tanstack/react-query";

const TOKEN_KEY = "finventory_admin_token";

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getAuthHeaders() {
  const token = getAdminToken();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`
  };
}

export function logout(queryClient?: QueryClient) {
  removeAdminToken();
  if (queryClient) {
    queryClient.clear();
  }
  window.location.href = "/admin/login";
}
