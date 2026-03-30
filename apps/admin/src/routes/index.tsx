import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import ProjectListPage from "@/pages/project/ProjectListPage";
import ProjectDetailPage from "@/pages/project/ProjectDetailPage";
import ProjectWritePage from "@/pages/project/ProjectWritePage";
import ProjectEditPage from "@/pages/project/ProjectEditPage";
import ContactListPage from "@/pages/contact/ContactListPage";
import UserListPage from "@/pages/user/UserListPage";
import ContactdkDetailPage from "@/pages/contact/ContactDetailPage";

export const publicRoutes = [
  { path: "/auth/signin", element: <SignInPage /> },
  { path: "/auth/signup", element: <SignUpPage /> },
];

export const protectedRoutes = [
  { path: "/project", element: <ProjectListPage /> },
  { path: "/project/:id", element: <ProjectDetailPage /> },
  { path: "/project/write", element: <ProjectWritePage /> },
  { path: "/project/edit/:id", element: <ProjectEditPage /> },
  { path: "/contact", element: <ContactListPage /> },
  { path: "/contact/:id", element: <ContactdkDetailPage /> },
  { path: "/users", element: <UserListPage /> },
];
