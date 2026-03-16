import { AttachmentResponse } from "./project";

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

  attachments: { file: AttachmentResponse }[];
}

export interface ContactApiResponse {
  success: boolean;
  data: ContactResponse | null;
  message?: string;
}
