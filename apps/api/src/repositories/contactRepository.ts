import { ContactStatus } from "@prisma/client";
import prisma from "../config/prisma.js";
import type { CreateContactDto, FileBase } from "@shared";

export const contactRepository = {
  // 생성
  async create(data: CreateContactDto, attachments?: FileBase[]) {
    return await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        title: data.title,
        content: data.content,
        status: ContactStatus.UNREAD,
        // 첨부파일
        ...(attachments &&
          attachments.length > 0 && {
            attachments: {
              create: attachments.map((attr) => ({
                file: { create: attr },
              })),
            },
          }),
      },
      include: {
        attachments: { include: { file: true } },
      },
    });
  },

  // 목록 조회 : 필터링 및 페이지네이션 제외
  async findContactList() {
    const [total, items] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          attachments: { include: { file: true } },
        },
      }),
    ]);
    return { total, items };
  },

  async findById(id: string) {
    return prisma.contact.findUnique({
      where: { id },
      include: {
        attachments: { include: { file: true } },
      },
    });
  },
};
