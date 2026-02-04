import { Router } from "express";
import { deleteAttachment } from "../controllers/attachmentController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router: Router = Router();

// 유저의 파일 삭제
router.delete("/:id", authenticateToken, deleteAttachment);

export default router;
