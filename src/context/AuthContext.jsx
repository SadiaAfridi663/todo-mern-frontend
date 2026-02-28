import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in (on page load)
  const fetchUser = async () => {
    try {
      const res = await API.get("/user/me");
      if (res.data.isSuccess) {
        setUser(res.data.user);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
  try {
    await API.post("/user/logout"); // backend clears cookie
  } catch (err) {
    console.error("Logout error", err);
  } finally {
    setUser(null); // clear client-side state
  }
};

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};