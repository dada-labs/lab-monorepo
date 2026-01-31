import { UserRepository } from "../repositories/userRepository.js";
import { RefreshTokenRepository } from "../repositories/refreshTokenRepository.js";
import type { UserStatus } from "@prisma/client";
import { hashPassword, isPasswordMatch } from "../utils/password.js";
import type { AuthUser } from "../types/express.js";

const userRepository = new UserRepository();
const refreshTokenRepository = new RefreshTokenRepository();

export class UserService {
  // 유저 목록 조회
  async getUsers(user: AuthUser) {
    return await userRepository.findAllUsers();
  }

  // 비밀번호 변경
  async changePassword(
    userId: string,
    data: { password: string; newPassword: string }
  ) {
    // 1. 사용자 조회
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("사용자를 찾을 수 없습니다.");

    // 2. 기존 비밀번호 검증
    const isPwMatch = await isPasswordMatch(data.password, user.passwordHash);
    if (!isPwMatch) throw new Error("현재 비밀번호가 일치하지 않습니다.");

    // 3. 새 비밀번호 암호화
    const hashedNewPassword = await hashPassword(data.newPassword);

    // 4. 비번 변경 시 모든 세션 로그아웃
    await refreshTokenRepository.deleteRefreshTokenByUserId(userId);

    // 5. DB 업데이트
    return await userRepository.updatePassword(userId, hashedNewPassword);
  }

  // 사용자 계정 상태 변경
  async changeUserStatus(
    currentUser: AuthUser,
    targetId: string,
    data: {
      status: UserStatus;
    }
  ) {
    // 1. 관리자 권한 확인
    if (currentUser.role !== "ADMIN") {
      throw new Error("계정 상태에 대한 변경 권한이 없습니다.");
    }
    // 2. 사용자 조회
    const user = await userRepository.findById(targetId);
    if (!user) throw new Error("사용자를 찾을 수 없습니다.");

    // 3. 상태 업데이트
    const updatedUser = await userRepository.updateStatus(
      targetId,
      data.status
    );

    // 본인 계정 변경 시, 세션 로그아웃
    if (currentUser.userId === targetId && data.status !== "ACTIVE") {
      await refreshTokenRepository.deleteRefreshTokenByUserId(targetId);
    }

    return updatedUser;
  }
}
