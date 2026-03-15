export interface CreateContactPayload {
  name: string;
  email: string;
  title: string;
  content: string;
  docs?: File[];
}

export type CreateContactDto = Omit<CreateContactPayload, "docs">;
