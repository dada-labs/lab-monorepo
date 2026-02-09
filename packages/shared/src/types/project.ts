export type ProjectStatus =
  | "PLANNING"
  | "IN_PROGRESS"
  | "MAINTENANCE"
  | "COMPLETED"
  | "HOLD";
export type Visibility = "PUBLIC" | "PRIVATE" | "DRAFT";

export const ProjectStatusConfig: Record<
  ProjectStatus,
  { label: string; color: string }
> = {
  PLANNING: {
    label: "기획 중",
    color: "#aaacae",
  },
  IN_PROGRESS: {
    label: "진행 중",
    color: "#ffbf38",
  },
  MAINTENANCE: {
    label: "유지보수",
    color: "#10b233",
  },
  COMPLETED: {
    label: "완료",
    color: "#4996ff",
  },
  HOLD: {
    label: "중단",
    color: "#e14141",
  },
};

export const VisibilityLabel: Record<Visibility, string> = {
  PUBLIC: "전체 공개",
  PRIVATE: "비공개",
  DRAFT: "임시저장",
};

export interface ProjectBase {
  slug: string;
  title: string;
  oneLine: string;
  description?: string;
  highlights?: string;
  liveUrl?: string;
  githubUrl?: string;
  relatedUrl?: string;
  status: ProjectStatus;
  visibility: Visibility;
  thumbnailId?: string;
  startedAt: Date | string;
  endedAt: Date | string;
}

export interface CreateProjectPayload extends ProjectBase {
  techs: string[]; // TechTag name 배열
  thumbnail?: File | null; // 실제 선택된 이미지 파일 객체
  docs?: File[];
}

export interface UpdateProjectPayload extends Partial<CreateProjectPayload> {
  id: string;
}

export type CreateProjectDto = Omit<CreateProjectPayload, "thumbnail" | "docs">;
export type UpdateProjectDto = Omit<UpdateProjectPayload, "thumbnail" | "docs">;

export interface ProjectResponse extends ProjectBase {
  id: string;
  viewCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TechTagResponse {
  id: string;
  name: string;
}

export interface FileBase {
  url: string;
  key: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}
export interface Attachment extends FileBase {
  id: string;
}
export interface AttachmentResponse {
  id: string;
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  bytes: number;
  [key: string]: any;
}

export interface ProjectResponse extends ProjectBase {
  id: string;
  viewCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;

  techs: TechTagResponse[];
  thumbnail?: AttachmentResponse | null;
  attachments: { file: AttachmentResponse }[];
  author: {
    id: string;
    name: string;
  };
}

export type ProjectItemResponse = Omit<ProjectResponse, "attachments">;
export interface ProjectApiResponse {
  success: boolean;
  data: ProjectResponse | null;
  message?: string;
}

export interface MetaData {
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
export interface ProjectListApiResponse {
  success: boolean;
  data: {
    projects: ProjectItemResponse[];
    meta: MetaData | null;
  };
  message?: string;
}

export interface GetProjectListParams {
  keyword?: string;
  status?: string;
  page?: number;
}

export interface ProjectViewCountApiResponse {
  success: boolean;
  data: {
    id: string;
  };
  message?: string;
}
