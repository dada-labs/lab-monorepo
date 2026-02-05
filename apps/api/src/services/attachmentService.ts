import type { AuthUser } from "src/types/express.js";
import * as attachmentRepo from "../repositories/attachmentRepository.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

export class AttachmentService {
  async removeAttachment(id: string, currentUser: AuthUser) {
    // 관리 권한 확인
    if (currentUser.role !== "ADMIN" && currentUser.role !== "MANAGER") {
      throw new Error("파일을 삭제할 권한이 없습니다.");
    }

    // 파일 존재 확인
    const attachment = await attachmentRepo.findById(id);
    if (!attachment) {
      throw new Error("해당 파일을 찾을 수 없습니다.");
    }

    // Cloudinary에서 실제 파일 삭제
    if (attachment.key) {
      await deleteFromCloudinary(attachment.key);
    }

    // DB 레코드 삭제
    return await attachmentRepo.deleteById(id);
  }
}
