import type { Request, Response } from "express";
import { AttachmentService } from "../services/attachmentService.js";

const attachmentService = new AttachmentService();

export const deleteAttachment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "첨부파일 ID값이 필수입니다.",
      });
    }
    await attachmentService.removeAttachment(id as string, req.user!);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
