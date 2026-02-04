import type { Request, Response } from "express";
import { ProjectService } from "../services/projectService.js";

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!;
    const files = req.files as {
      thumbnail?: Express.Multer.File[];
      docs?: Express.Multer.File[];
    };

    const result = await projectService.createProject(
      currentUser,
      req.body,
      files
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
    const files = req.files as {
      thumbnail?: Express.Multer.File[];
      docs?: Express.Multer.File[];
    };

    const { id } = req.params;
    const result = await projectService.updateProject(
      currentUser,
      id as string,
      req.body,
      files
    );
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    // 쿼리스트링 추출: ?page=1&keyword=다다&tag=React&status=COMPLETED
    const result = await projectService.getPaginatedProjects(req.query);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Project List Error:", error);
    return res.status(400).json({
      success: false,
      message: "프로젝트 목록을 불러오는 중 오류가 발생했습니다.",
    });
  }
};

// 최신 프로젝트 불러오기
export const getRecentProjects = async (req: Request, res: Response) => {
  try {
    const result = await projectService.getRecnetProjects();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Recent Project List Error:", error);
    return res.status(400).json({
      success: false,
      message: "최근 프로젝트 목록을 불러오는 중 오류가 발생했습니다.",
    });
  }
};

// 프로젝트 상세보기
export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "프로젝트 아이디가 필수입니다.",
      });
    }
    const result = await projectService.getProjectById(id as string);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Project view Error:", error);
    return res.status(400).json({
      success: false,
      message: "프로젝트 상세보기 중 오류가 발생했습니다.",
    });
  }
};
