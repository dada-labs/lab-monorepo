import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import SignInPage from "@/pages/auth/SignInPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProjectListPage from "@/pages/project/ProjectListPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/auth/signin" element={<SignInPage />} />
          <Route path="/auth/signup" element={<SignInPage />} />
        </Route>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/project" element={<ProjectListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
