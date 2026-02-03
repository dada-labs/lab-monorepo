import { Router } from "express";
import {
  createProject,
  updateProject,
  getProjects,
  getProject,
  getRecentProjects,
} from "../controllers/projectController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router: Router = Router();

// 유저만
router.post("/", authenticateToken, createProject);
router.patch("/:id", authenticateToken, updateProject);

// 퍼블릭
router.get("/", getProjects);
router.get("/recent", getRecentProjects);
router.get("/:id", getProject);

export default router;
