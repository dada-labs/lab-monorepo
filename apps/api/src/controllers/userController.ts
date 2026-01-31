import type { Request, Response } from "express";
import { UserService } from "../services/userService.js";
import { refreshTokenCookieOptions } from "../utils/cookieOptions.js";

const userService = new UserService();

// 사용자 목록
export const getUsers = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;

    const users = await userService.getUsers(currentUser);

    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 비밀번호 변경
export const changePassword = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;

    await userService.changePassword(currentUser.userId, req.body);

    res
      .status(200)
      .json({ success: true, message: "비밀번호가 변경되었습니다." });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 사용자 (계정)상태 변경
export const changeUserStatus = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const { id: targetId } = req.params;

    if (!targetId) {
      return res.status(400).json({ message: "변경할 계정 ID가 필요합니다." });
    }
    await userService.changeUserStatus(
      currentUser,
      targetId as string,
      req.body
    );

    res
      .status(200)
      .json({ success: true, message: "사용자의 계정 상태가 변경되었습니다." });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
