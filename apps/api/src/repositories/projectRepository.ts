import type { Prisma, ProjectStatus, Visibility } from "@prisma/client";
import prisma from "../config/prisma.js";

export const projectRepository = {
  // 생성
  async create(data: Prisma.ProjectUncheckedCreateInput, techs: string[]) {
    return prisma.project.create({
      data: {
        ...data,
        techs: {
          connectOrCreate: techs.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: {
        techs: true,
        thumbnail: true,
      },
    });
  },

  // 수정
  async update(id: string, data: any, techs?: string[]) {
    return await prisma.project.update({
      where: { id },
      data: {
        ...data,
        ...(techs && {
          techs: {
            set: [],
            connectOrCreate: techs.map((name) => ({
              where: { name },
              create: { name },
            })),
          },
        }),
      },
      include: { techs: true },
    });
  },

  // 삭제
  async delete(id: string) {
    return await prisma.project.delete({
      where: { id },
    });
  },

  // 프로젝트가 있는지 확인
  async findById(id: string) {
    return prisma.project.findUnique({
      where: { id },
    });
  },
};
