import { Navigate } from "react-router-dom";
import { create } from "zustand";




export const useAuthStore = create((set)=>({
  user: null,
  isAuthenticated: false,
  checkAuth: "",
  login: (user) => set({ user: user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))



export const UseRedirectAuth = ({ children }) => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const UseProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

