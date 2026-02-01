import { UserRole } from "./user";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser | null;
}

export interface signInRequest {
  email: string;
  password: string;
}
