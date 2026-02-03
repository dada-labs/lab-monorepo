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

  // 프로젝트 상세보기, 조회수 증가
  async getProjectDetail(id: string) {
    return await prisma.project.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
      include: {
        thumbnail: true,
        techs: true,
        attachments: { include: { file: true } },
      },
    });
  },

  async findProjectsWithFilters(params: {
    skip: number;
    take: number;
    keyword?: string;
    tag?: string;
    status?: ProjectStatus;
  }) {
    const { skip, take, keyword, tag, status } = params;

    const where: Prisma.ProjectWhereInput = {
      AND: [
        keyword ? { title: { contains: keyword, mode: "insensitive" } } : {},
        tag ? { techs: { some: { name: tag } } } : {},
        status ? { status } : {},
      ],
    };

    const [total, items] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
        include: {
          thumbnail: true,
          techs: true,
        },
      }),
    ]);

    return { total, items };
  },

  async findRecentProjects(limit: number) {
    return prisma.project.findMany({
      take: limit,
      include: {
        thumbnail: true,
        techs: true,
        attachments: { include: { file: true } },
      },
    });
  },
};
