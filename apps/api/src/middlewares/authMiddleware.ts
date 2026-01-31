import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthUser } from "../types/express.js";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. 헤더에서 토큰 추출
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "접근 권한이 없습니다. 로그인 후 이용해주세요." });
  }

  // 2. 토큰 검증
  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!, (err, decoded) => {
    if (err) {
      console.error("JWT VERIFY ERROR:", err.name);

      // 토큰이 만료된 경우 (Expired)
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "액세스 토큰이 만료되었습니다.",
        });
      }

      // 그 외 잘못된 토큰인 경우 (Invalid)
      return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }

    // 3. 검증된 정보를 req.user에 저장
    req.user = decoded as AuthUser;
    next();
  });
};
