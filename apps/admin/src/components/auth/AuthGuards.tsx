import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export const ProtectedRoute = () => {
  const { accessToken, hasHydrated } = useAuthStore();

  if (!hasHydrated) return null;
  return accessToken ? <Outlet /> : <Navigate to="/auth/signin" replace />;
};

export const PublicRoute = () => {
  const { accessToken, hasHydrated } = useAuthStore();

  if (!hasHydrated) return null;
  return accessToken ? <Navigate to="/project" replace /> : <Outlet />;
};
