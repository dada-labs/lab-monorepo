import { Router } from "express";
import { createContact } from "../controllers/contactController.js";

const router: Router = Router();

// 문의 등록
router.post("/", createContact);

export default router;
