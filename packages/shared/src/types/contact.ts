import type { AttachmentResponse } from "./project";

export type ContactStatus = "UNREAD" | "IN_REVIEW" | "ANSWERED" | "CANCELED";
export const ContactStatusConfig: Record<
  ContactStatus,
  { label: string; color: string; bg: string }
> = {
  UNREAD: {
    label: "읽지 않음",
    color: "#888888",
    bg: "#f1f3f5",
  },
  IN_REVIEW: {
    label: "검토 중",
    color: "#ffbf38",
    bg: "#fff8e1",
  },
  ANSWERED: {
    label: "답변 완료",
    color: "#4996ff",
    bg: "#eef4ff",
  },
  CANCELED: {
    label: "문의 취소",
    color: "#e14141",
    bg: "#ffebee",
  },
};

export interface ContactBase {
  name: string;
  email: string;
  title: string;
  content: string;
}
export interface CreateContactPayload extends ContactBase {
  docs?: File[];
}

export type CreateContactDto = Omit<CreateContactPayload, "docs">;

export interface ContactResponse extends ContactBase {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: ContactStatus;

  attachments: { file: AttachmentResponse }[];
}

export interface ContactApiResponse {
  success: boolean;
  data: ContactResponse | null;
  message?: string;
}

export interface ContactListApiResponse {
  success: boolean;
  data: {
    items: ContactResponse[];
    total: number;
  };
  message?: string;
}
