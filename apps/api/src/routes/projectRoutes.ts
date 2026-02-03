import { Router } from "express";
import {
  createProject,
  updateProject,
} from "../controllers/projectController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router: Router = Router();

// 유저만
router.post("/", authenticateToken, createProject);
router.patch("/:id", authenticateToken, updateProject);

export default router;
