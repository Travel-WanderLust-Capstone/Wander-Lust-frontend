import { createContext, useContext, useState } from "react";

import { loginUser, registerUser } from "../api/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  async function login(email, password) {
    const newToken = await loginUser(email, password);

    localStorage.setItem("token", newToken);

    setToken(newToken);

    return newToken;
  }

  async function register(name, email, password) {
    const newToken = await registerUser(name, email, password);

    localStorage.setItem("token", newToken);

    setToken(newToken);

    return newToken;
  }

  function logout() {
    localStorage.removeItem("token");

    setToken(null);
  }

  const value = {
    token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
