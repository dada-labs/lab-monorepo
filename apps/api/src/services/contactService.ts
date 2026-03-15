import { contactRepository } from "../repositories/contactRepository.js";
import type { CreateContactDto } from "@shared";

export class ContactService {
  async createContact(data: CreateContactDto) {
    if (!data.content) {
      throw new Error("문의 내용은 필수 항목입니다.");
    }

    // 파일 업로드 로직 필요

    return await contactRepository.create(data);
  }
}
