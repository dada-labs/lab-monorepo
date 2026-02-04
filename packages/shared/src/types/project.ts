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
  thumbnailId?: string; // 선택적 썸네일 ID
  attachmentIds?: string[]; // 선택적 첨부파일 ID들
}

export interface UpdateProjectPayload extends Partial<CreateProjectPayload> {}

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

export interface Attachment {
  id: string;
  url: string;
  key: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export interface AttachmentResponse {
  id: string;
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export interface ProjectDetailResponse extends ProjectBase {
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
