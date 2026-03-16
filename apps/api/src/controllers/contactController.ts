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
