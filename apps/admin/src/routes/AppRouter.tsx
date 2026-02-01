import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "@/components/auth/AuthGuards";
import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import { protectedRoutes, publicRoutes } from ".";
import NotFoundPage from "@/pages/NotFoundPage";
import { useAuthStore } from "@/store/authStore";

export const AppRouter = () => {
  const { accessToken, hasHydrated } = useAuthStore();
  console.log("Router State:", { accessToken, hasHydrated });
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/project" replace />} />
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
