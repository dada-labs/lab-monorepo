import { projectRepository } from "../repositories/projectRepository.js";
import { ProjectStatus, UserRole, Visibility } from "@prisma/client";
import type { AuthUser } from "../types/express.js";

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

  async createProject(
    currentUser: AuthUser,
    projectData: {
      slug: string;
      title: string;
      oneLine: string;
      description?: string;
      liveUrl?: string;
      githubUrl?: string;
      status: string;
      visibility: string;
      thumbnailId?: string;
      startedAt: Date;
      endedAt: Date;
    },
    techs: string[],
    thumbnail?: any,
    attachments?: any[]
  ) {
    // 관리 권한 확인
    this.validateAuth(currentUser);

    // 태그는 최소 1개 이상, 최대 10개
    this.validateTechTags(techs);

    const result = await projectRepository.create(
      {
        ...projectData,
        status: projectData.status as ProjectStatus,
        visibility: projectData.visibility as Visibility,
        authorId: currentUser.userId,
      },
      techs
    );

    return result;
  }

  async updateProject(
    currentUser: AuthUser,
    id: string,
    projectData: any,
    techs?: string[]
  ) {
    // 관리 권한 확인
    this.validateAuth(currentUser);

    const project = await projectRepository.findById(id);
    if (!project) {
      throw new Error("일치하는 프로젝트 ID가 없습니다.");
    }

    // 태그가 있다면, 최소 1개 이상, 최대 10개
    this.validateTechTags(techs);

    return await projectRepository.update(id, projectData, techs);
  }

  async deleteProject(currentUser: AuthUser, id: string) {
    // 관리 권한 확인
    this.validateAuth(currentUser);

    return await projectRepository.delete(id);
  }
}
