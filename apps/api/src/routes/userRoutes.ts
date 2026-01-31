import { Router } from "express";
import {
  changePassword,
  changeUserStatus,
  getUsers,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router: Router = Router();

router.get("/", authenticateToken, getUsers);

// 유저 설정 관련
router.patch("/setting/password", authenticateToken, changePassword);
router.patch("/:id/status", authenticateToken, changeUserStatus);

export default router;
