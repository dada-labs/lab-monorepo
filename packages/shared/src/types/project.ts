export type ProjectStatus =
  | "PLANNING"
  | "IN_PROGRESS"
  | "MAINTENANCE"
  | "COMPLETED"
  | "HOLD";
export type Visibility = "PUBLIC" | "PRIVATE" | "DRAFT";

export const ProjectStatusLabel: Record<ProjectStatus, string> = {
  PLANNING: "기획 중",
  IN_PROGRESS: "진행 중",
  MAINTENANCE: "유지보수",
  COMPLETED: "완료",
  HOLD: "중단",
};

export interface ProjectBase {
  slug: string;
  title: string;
  oneLine: string;
  description?: string;
  highlights?: string;
  liveUrl?: string;
  githubUrl?: string;
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
export interface ProjectApiResponse {
  success: boolean;
  data: ProjectResponse | null;
  message?: string;
}
