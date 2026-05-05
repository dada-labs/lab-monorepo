import type { Request, Response } from "express";
import { ContactService } from "../services/contactService.js";

const contactService = new ContactService();

export const createContact = async (req: Request, res: Response) => {
  try {
    const files = req.files as {
      docs?: Express.Multer.File[];
    };
    const result = await contactService.createContact(req.body, files);

    return res.status(200).json({
      success: true,
      data: result,
      message: "문의가 성공적으로 접수되었습니다.",
    });
  } catch (error: any) {
    console.error("Contact Create Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "문의 접수 중 오류가 발생했습니다.",
    });
  }
};

// 문의 목록 불러오기
export const getContactList = async (req: Request, res: Response) => {
  try {
    const result = await contactService.getContactList();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Recent Project List Error:", error);
    return res.status(400).json({
      success: false,
      message: "문의 목록을 불러오는 중 오류가 발생했습니다.",
    });
  }
};

// 문의 상세보기
export const getContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "관련 문의 아이디가 필수입니다.",
      });
    }
    const result = await contactService.getContactById(id as string);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Project view Error:", error);
    return res.status(400).json({
      success: false,
      message: "문의 상세보기 중 오류가 발생했습니다.",
    });
  }
};
