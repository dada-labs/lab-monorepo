import type { Request, Response } from "express";
import { ProjectService } from "../services/projectService.js";

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const { techs, ...projectData } = req.body;

    const result = await projectService.createProject(
      currentUser,
      projectData,
      techs
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Project Create Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "프로젝트 등록 중 오류가 발생했습니다.",
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;

    const { id } = req.params;
    const { techs, ...projectData } = req.body;
    const result = await projectService.updateProject(
      currentUser,
      id as string,
      projectData,
      techs
    );
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
