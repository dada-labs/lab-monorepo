import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/userRepository.js";
import { RefreshTokenRepository } from "../repositories/refreshTokenRepository.js";
import { generateTokens } from "../utils/jwt.js";
import type { UserRole, UserStatus } from "@prisma/client";
import type { AuthUser } from "../types/express.js";
import { hashPassword, isPasswordMatch } from "../utils/password.js";

const userRepository = new UserRepository();
const refreshTokenRepository = new RefreshTokenRepository();

export class AuthService {
  // 이메일 유효성 및 비밀번호 암호화
  private async validateAndEncrypt(email: string, password: string) {
    // 1. 중복 이메일 확인
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) throw new Error("이미 존재하는 이메일입니다.");

    // 2. 비밀번호 암호화
    const hashedPassword = await hashPassword(password);
    return hashedPassword;
  }

  private async createAndStoreTokens(user: {
    id: string;
    role: UserRole;
    email: string;
  }) {
    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      role: user.role,
      email: user.email,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await refreshTokenRepository.createRefreshToken({
      refreshToken,
      userId: user.id,
      expiresAt,
    });

    return { accessToken, refreshToken };
  }

  // 회원가입
  async signup(data: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
    status?: UserStatus;
  }) {
    const hashedPassword = await this.validateAndEncrypt(
      data.email,
      data.password
    );

    // 3. 레포지토리를 통한 생성
    return userRepository.createUser({
      ...data,
      passwordHash: hashedPassword,
    });
  }

  async signin(data: { email: string; password: string }) {
    // 1. 유저 존재 확인
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }

    // 유저 상태에 따른 에러메세지
    if (user.status === "PENDING") {
      throw new Error(
        "사용 승인되지 않은 계정입니다. 관리자 승인 후 이용해주세요."
      );
    }

    if (user.status === "INACTIVED") {
      throw new Error("비활성화된 계정입니다. 관리자에게 문의하세요.");
    }

    // 2. 비밀번호 검증
    const isPwMatch = await isPasswordMatch(data.password, user.passwordHash);
    if (!isPwMatch) {
      throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }

    const tokens = await this.createAndStoreTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  // 리프레시 토큰 삭제
  async removeRefreshToken(refreshToken: string) {
    await refreshTokenRepository.removeRefreshToken(refreshToken);
  }

  // 리프레시, (액세스) 토큰 재발급
  async refreshTokens(currentRefreshToken: string) {
    // 1. DB에서 refreshToken 조회 및 사용자 조회
    const storedToken = await refreshTokenRepository.findByRefreshToken(
      currentRefreshToken
    );

    if (!storedToken) {
      throw new Error("해당 refresh token을 찾을 수 없습니다.");
    }

    // 2. 기존 토큰 삭제
    await refreshTokenRepository.removeRefreshToken(currentRefreshToken);

    // 3. 만료 체크
    if (storedToken.expiresAt < new Date()) {
      throw new Error("refresh token이 만료되었습니다.");
    }

    const user = await userRepository.findById(storedToken.userId);
    if (!user) {
      throw new Error("일치하는 계정을 찾을 수 없습니다.");
    }

    // 4. 새 토큰 생성 및 저장
    const tokens = await this.createAndStoreTokens(user);

    return {
      ...tokens,
    };
  }
}
