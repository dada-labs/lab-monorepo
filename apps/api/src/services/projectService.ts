import { projectRepository } from "../repositories/projectRepository.js";
import { ProjectStatus, UserRole, Visibility } from "@prisma/client";
import type { AuthUser } from "../types/express.js";
import type { CreateProjectPayload, UpdateProjectPayload } from "@shared";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "src/utils/cloudinary.js";

export class ProjectService {
  private validateAuth(currentUser: AuthUser) {
    if (
      currentUser.role !== UserRole.ADMIN &&
      currentUser.role !== UserRole.MANAGER
    ) {
      throw new Error("프로젝트 아카이빙에 대한 관리 권한이 없습니다.");
    }
  }

  // 2. 태그 개수 검증 공통 함수
  private validateTechTags(techs?: string[]) {
    if (!techs) return; // 수정 시 techs가 안 들어올 수 있으므로 패스

    if (techs.length < 1 && techs.length > 10) {
      throw new Error(
        "프로젝트 관련 태그는 최소 1개, 최대 10개까지만 설정할 수 있습니다."
      );
    }
  }

  // 문자열로 들어온 techs를 배열로 변환
  private parseTechs(techs: any): string[] {
    if (typeof techs === "string") {
      try {
        return JSON.parse(techs);
      } catch {
        return [];
      }
    }
    return Array.isArray(techs) ? techs : [];
  }

  async createProject(
    currentUser: AuthUser,
    dto: CreateProjectPayload,
    files: { thumbnail?: Express.Multer.File[]; docs?: Express.Multer.File[] }
  ) {
    // 관리 권한 확인
    this.validateAuth(currentUser);

    const techsArray = this.parseTechs(dto.techs);
    // 태그는 최소 1개 이상, 최대 10개
    this.validateTechTags(techsArray);

    // 썸네일 업로드
    let thumbnail = undefined;
    if (files.thumbnail?.[0]) {
      const res: any = await uploadToCloudinary(
        files.thumbnail[0],
        "thumbnails"
      );
      thumbnail = {
        url: res.secure_url,
        key: res.public_id,
        fileName: files.thumbnail[0].originalname,
        fileType: files.thumbnail[0].mimetype,
        fileSize: res.bytes,
      };
    }

    // 첨부파일 다중 업로드
    const attachments = [];
    if (files.docs) {
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

    const result = await projectRepository.create(
      {
        ...dto,
        status: dto.status as ProjectStatus,
        visibility: dto.visibility as Visibility,
      },
      currentUser.userId,
      techsArray,
      thumbnail,
      attachments
    );

    return result;
  }

  async updateProject(
    currentUser: AuthUser,
    id: string,
    dto: UpdateProjectPayload,
    files?: { thumbnail?: Express.Multer.File[]; docs?: Express.Multer.File[] }
  ) {
    // 관리 권한 확인
    this.validateAuth(currentUser);

    const existingProject = await projectRepository.findById(id);
    if (!existingProject) {
      throw new Error("일치하는 프로젝트 ID가 없습니다.");
    }

    const techsArray = this.parseTechs(dto.techs);
    // 태그는 최소 1개 이상, 최대 10개
    this.validateTechTags(techsArray);

    let thumbnailData = undefined;
    if (files?.thumbnail?.[0]) {
      // 기존 썸네일이 있다면 Cloudinary에서 삭제
      if (existingProject.thumbnail?.key) {
        await deleteFromCloudinary(existingProject.thumbnail.key);
      }

      // 새 썸네일 업로드
      const res: any = await uploadToCloudinary(
        files.thumbnail[0],
        "thumbnails"
      );
      thumbnailData = {
        url: res.secure_url,
        key: res.public_id,
        fileName: files.thumbnail[0].originalname,
        fileType: files.thumbnail[0].mimetype,
        fileSize: res.bytes,
      };
    }
    // 첨부파일 추가 로직
    const newAttachments = [];
    if (files?.docs) {
      for (const file of files.docs) {
        const res: any = await uploadToCloudinary(file, "attachments");
        newAttachments.push({
          url: res.secure_url,
          key: res.public_id,
          fileName: file.originalname,
          fileType: file.mimetype,
          fileSize: res.bytes,
        });
      }
    }

    return await projectRepository.update(
      id,
      dto,
      techsArray,
      thumbnailData,
      newAttachments
    );
  }

  async deleteProject(currentUser: AuthUser, id: string) {
    // 관리 권한 확인
    this.validateAuth(currentUser);

    return await projectRepository.delete(id);
  }

  async getPaginatedProjects(query: {
    page?: string;
    keyword?: string;
    tag?: string;
    status?: string;
  }) {
    const limit = 12;
    const page = Math.max(Number(query.page) || 1, 1);
    const skip = (page - 1) * limit;

    const { total, items } = await projectRepository.findProjectsWithFilters({
      skip,
      take: limit,
      ...(query.keyword && { keyword: query.keyword }),
      ...(query.tag && { tag: query.tag }),
      ...(query.status && { status: query.status as ProjectStatus }),
    });

    return {
      projects: items,
      meta: {
        totalCount: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getRecnetProjects() {
    const limit = 8;
    const result = await projectRepository.findRecentProjects(limit);

    return result;
  }

  async getProjectById(id: string) {
    const result = await projectRepository.getProjectDetail(id);

    return result;
  }
}
