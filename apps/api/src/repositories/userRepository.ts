import prisma from "../config/prisma.js";
import { UserRole, UserStatus } from "@prisma/client";
// import type { CreateUserDto, UpdateUserDto } from "../types/user.js";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(userId: string) {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  // 회원가입
  async createUser(data: {
    email: string;
    passwordHash: string;
    name: string;
    role?: UserRole;
    status?: UserStatus;
  }) {
    const {
      email,
      passwordHash,
      name,
      role = UserRole.MANAGER,
      status = UserStatus.PENDING,
    } = data;
    return prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role,
        status,
      },
    });
  }
}
