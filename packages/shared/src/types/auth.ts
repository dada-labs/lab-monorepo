import type { User, UserRole } from "./user";

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

export interface SignInResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: User | null;
  } | null;
  message?: string;
}
