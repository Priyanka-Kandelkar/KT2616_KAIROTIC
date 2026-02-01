import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../api/supabaseService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        setUser(user);
        const profile = await authService.getCurrentProfile();
        setProfile(profile);
      }
    } catch {
      // no active session → do nothing
    } finally {
      setLoading(false);
    }
  };

  loadUser();
}, []);


  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
