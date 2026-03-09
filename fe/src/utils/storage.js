// Storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error("Error saving to localStorage");
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      console.error("Error removing from localStorage");
    }
  },
};

// Token helpers
export const getToken = () => storage.get("token");
export const setToken = (token) => storage.set("token", token);
export const removeToken = () => storage.remove("token");

// User helpers
export const getUser = () => storage.get("user");
export const setUser = (user) => storage.set("user", user);
export const removeUser = () => storage.remove("user");

// Clear all auth data
export const clearAuth = () => {
  removeToken();
  removeUser();
};
