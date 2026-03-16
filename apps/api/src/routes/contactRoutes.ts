import { Router } from "express";
import { createContact } from "../controllers/contactController.js";
import { upload } from "src/middlewares/uploadMiddleware.js";

const router: Router = Router();

// 문의 등록
router.post("/", upload.fields([{ name: "docs", maxCount: 5 }]), createContact);

export default router;
