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

  // 관리 계정 목록 확인용
  async findAllUsers() {
    return prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  // 사용자 (계정)상태 변경
  async updateStatus(userId: string, status: UserStatus) {
    return prisma.user.update({
      where: { id: userId },
      data: { status },
    });
  }

  // 비밀번호 변경
  async updatePassword(userId: string, passwordHash: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
  }
}
