import { Router } from "express";
import {
  createProject,
  updateProject,
  getProjects,
  getPublicProjects,
  getRecentProjects,
  getProject,
  updateProjectViewCount,
} from "../controllers/projectController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { upload } from "src/middlewares/uploadMiddleware.js";

const router: Router = Router();

// 유저만
router.post(
  "/",
  authenticateToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "docs", maxCount: 5 },
  ]),
  createProject
);
router.patch(
  "/:id",
  authenticateToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "docs", maxCount: 5 },
  ]),
  updateProject
);

// 퍼블릭
router.get("/", getProjects);
router.get("/public", getPublicProjects);
router.get("/recent", getRecentProjects);
router.get("/:id", getProject);
router.patch("/:id/viewcount", updateProjectViewCount);

export default router;
