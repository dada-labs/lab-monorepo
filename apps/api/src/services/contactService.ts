import { uploadToCloudinary } from "src/utils/cloudinary.js";
import { contactRepository } from "../repositories/contactRepository.js";
import type { CreateContactDto } from "@shared";

export class ContactService {
  async createContact(
    data: CreateContactDto,
    files?: { docs?: Express.Multer.File[] }
  ) {
    if (!data.content) {
      throw new Error("문의 내용은 필수 항목입니다.");
    }

    // 파일 업로드 로직 필요
    const attachments = [];
    if (files?.docs) {
      for (const file of files.docs) {
        const res: any = await uploadToCloudinary(file, "attachments");
        attachments.push({
          url: res.secure_url,
          key: res.public_id,
          fileName: file.originalname,
          fileType: file.mimetype,
          fileSize: res.bytes,
        });
      }
    }

    return await contactRepository.create(data, attachments);
  }
}
