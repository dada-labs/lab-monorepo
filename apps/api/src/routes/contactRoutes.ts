import { Router } from "express";
import {
  createContact,
  getContact,
  getContactList,
} from "../controllers/contactController.js";
import { upload } from "src/middlewares/uploadMiddleware.js";
import { authenticateToken } from "src/middlewares/authMiddleware.js";

const router: Router = Router();

// 문의 등록
router.post("/", upload.fields([{ name: "docs", maxCount: 5 }]), createContact);

// 문의 조회
router.get("/", authenticateToken, getContactList);
router.get("/:id", getContact);

export default router;
