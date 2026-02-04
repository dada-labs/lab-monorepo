import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import ProjectListPage from "@/pages/project/ProjectListPage";
import ProjectWritePage from "@/pages/project/ProjectWritePage";
import ContactListPage from "@/pages/contact/ContactListPage";
import UserListPage from "@/pages/user/UserListPage";

export const publicRoutes = [
  { path: "/auth/signin", element: <SignInPage /> },
  { path: "/auth/signup", element: <SignUpPage /> },
];

export const protectedRoutes = [
  { path: "/project", element: <ProjectListPage /> },
  { path: "/project/write", element: <ProjectWritePage /> },
  { path: "/contact", element: <ContactListPage /> },
  { path: "/users", element: <UserListPage /> },
];
