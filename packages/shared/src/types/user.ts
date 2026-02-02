export type UserRole = "USER" | "MANAGER" | "ADMIN";
export type UserStatus = "PENDING" | "ACTIVE" | "INACTIVED";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date | string;
}
