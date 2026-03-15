import {
  ContactStatus,
  Visibility,
  type Prisma,
  type ProjectStatus,
} from "@prisma/client";
import prisma from "../config/prisma.js";
import type { CreateContactDto } from "@shared";

export const contactRepository = {
  // 생성
  async create(data: CreateContactDto) {
    return await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        title: data.title,
        content: data.content,
        status: ContactStatus.UNREAD,
      },
    });
  },
};
