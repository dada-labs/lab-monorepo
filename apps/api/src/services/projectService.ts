import { projectRepository } from "../repositories/projectRepository.js";
import { ProjectStatus, UserRole, Visibility } from "@prisma/client";
import type { AuthUser } from "../types/express.js";
import type {
  CloudinaryUploadResponse,
  CreateProjectDto,
  CreateProjectPayload,
  FileBase,
  UpdateProjectDto,
  UpdateProjectPayload,
} from "@shared";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "src/utils/cloudinary.js";
import prisma from "src/config/prisma.js";

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
    dto: CreateProjectDto,
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
    dto: UpdateProjectDto,
    files?: { thumbnail?: Express.Multer.File[]; docs?: Express.Multer.File[] }
  ) {
    this.validateAuth(currentUser);
    const existingProject = await projectRepository.findById(id);
    if (!existingProject) throw new Error("프로젝트를 찾을 수 없습니다.");

    const techsArray = this.parseTechs(dto.techs);
    const uploadedFiles: string[] = []; // 롤백을 위한 public_id 추적

    try {
      // 1. 이미지/파일 업로드 (Cloudinary)
      let thumbnailData: FileBase | undefined = undefined;
      if (files?.thumbnail?.[0]) {
        const res = (await uploadToCloudinary(
          files.thumbnail[0],
          "thumbnails"
        )) as CloudinaryUploadResponse;

        uploadedFiles.push(res.public_id);
        thumbnailData = {
          url: res.secure_url,
          key: res.public_id,
          fileName: files.thumbnail[0].originalname,
          fileType: files.thumbnail[0].mimetype,
          fileSize: res.bytes,
        };
      }

      const newAttachments: FileBase[] = [];
      if (files?.docs) {
        for (const file of files.docs) {
          const res = (await uploadToCloudinary(
            file,
            "attachments"
          )) as CloudinaryUploadResponse;

          uploadedFiles.push(res.public_id);
          newAttachments.push({
            url: res.secure_url,
            key: res.public_id,
            fileName: file.originalname,
            fileType: file.mimetype,
            fileSize: res.bytes,
          });
        }
      }

      // 2. DB 트랜잭션 실행
      const result = await prisma.$transaction(async (tx) => {
        // 기존 썸네일 삭제 (DB 성공 확신 시점에 Cloudinary에서 삭제)
        if (thumbnailData && existingProject.thumbnail?.key) {
          await deleteFromCloudinary(existingProject.thumbnail.key);
        }

        return await projectRepository.update(
          id,
          dto,
          techsArray,
          thumbnailData,
          newAttachments,
          tx
        );
      });

      return result;
    } catch (error) {
      // 3. 에러 발생 시 롤백: 방금 업로드한 파일들 Cloudinary에서 삭제
      for (const publicId of uploadedFiles) {
        await deleteFromCloudinary(publicId);
      }
      throw new Error("파일 업로드 중 에러가 발생했습니다.");
    }
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
    const limit = 6;
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
