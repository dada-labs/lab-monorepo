import type { Request, Response } from "express";
import { AuthService } from "../services/authService.js";
import { refreshTokenCookieOptions } from "../utils/cookieOptions.js";

const authService = new AuthService();

// 회원가입
export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await authService.signup(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 로그인
export const signIn = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken, user } = await authService.signin(
      req.body
    );

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    res.status(200).json({
      success: true,
      data: {
        accessToken,
        user,
      },
      message: "로그인 성공",
    });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

// 로그아웃
export const signOut = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "삭제할 리프레시 토큰을 찾을 수 없습니다.",
      });
    }

    // 리프레시 토큰 삭제
    await authService.removeRefreshToken(refreshToken);

    // 쿠키 삭제
    res.clearCookie("refreshToken", {
      path: refreshTokenCookieOptions.path,
      httpOnly: true,
    });

    return res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 리프레시토큰 재발급
export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await authService.refreshTokens(refreshToken);

    // 새 RefreshToken 쿠키 설정
    res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    return res.sendStatus(401);
  }
};
