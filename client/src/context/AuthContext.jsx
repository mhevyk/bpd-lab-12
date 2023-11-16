import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage("simple-auth-token", null);

  function authenticate(token) {
    setToken(token);
  }

  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("Must be called within provider");
  }

  return context;
};
