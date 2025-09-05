const TOKEN_KEY = "admin_jwt_token";

// Save token in sessionStorage (removed when tab/browser is closed)
export const setToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

// Get token from sessionStorage
export const getToken = (): string | null => {
  return sessionStorage.getItem(TOKEN_KEY);
};

// Remove token (manual clear if needed)
export const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

// Check if token is valid and not expired
export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    return !!payload.exp && payload.exp > now;
  } catch {
    return false;
  }
};
