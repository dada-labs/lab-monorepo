import { Visibility, type Prisma, type ProjectStatus } from "@prisma/client";
import prisma from "../config/prisma.js";
import type {
  CreateProjectDto,
  CreateProjectPayload,
  FileBase,
  ProjectBase,
  ProjectResponse,
  UpdateProjectDto,
  UpdateProjectPayload,
} from "@shared";

export const projectRepository = {
  // 생성
  async create(
    data: CreateProjectDto,
    userId: string,
    techs: string[],
    thumbnail?: any,
    attachments?: any[]
  ) {
    const {
      startedAt,
      endedAt,
      thumbnailId,
      techs: _techs,
      ...createData
    } = data;
    return prisma.project.create({
      data: {
        ...createData,
        startedAt: startedAt ? new Date(startedAt) : null,
        endedAt: endedAt ? new Date(endedAt) : null,
        author: { connect: { id: userId } },
        techs: {
          connectOrCreate: techs.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
        // 썸네일
        ...(thumbnail && {
          thumbnail: { create: thumbnail },
        }),
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
        techs: true,
        thumbnail: true,
        attachments: { include: { file: true } },
      },
    });
  },

  // 수정
  async update(
    id: string,
    data: UpdateProjectDto,
    techs?: string[],
    thumbnail?: FileBase,
    attachments?: FileBase[],
    tx?: Prisma.TransactionClient // 트랜잭션 클라이언트 주입 허용
  ) {
    const {
      id: _id,
      thumbnailId,
      techs: _techs,
      startedAt,
      endedAt,
      ...updateData
    } = data;
    const client = tx || prisma;

    return await client.project.update({
      where: { id },
      data: {
        ...updateData,
        ...(startedAt !== undefined && {
          startedAt: startedAt ? new Date(startedAt) : null,
        }),
        ...(endedAt !== undefined && {
          endedAt: endedAt ? new Date(endedAt) : null,
        }),
        ...(techs && {
          techs: {
            set: [], // 기존 관계 끊기
            connectOrCreate: techs.map((name) => ({
              where: { name },
              create: { name },
            })),
          },
        }),
        // 썸네일: 기존 것이 있다면 update, 없으면 create = upsert
        ...(thumbnail && {
          thumbnail: {
            upsert: {
              create: thumbnail,
              update: thumbnail,
            },
          },
        }),
        // 첨부파일 추가 (기존 파일 유지 + 새 파일 추가)
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
        techs: true,
        thumbnail: true,
        attachments: { include: { file: true } },
      },
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
      include: {
        thumbnail: true,
        attachments: { include: { file: true } },
      },
    });
  },

  // 프로젝트 상세보기
  async getProjectDetail(id: string) {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        thumbnail: true,
        techs: true,
        attachments: { include: { file: true } },
      },
    });
  },

  // 조회수 증가
  async updateViewCount(id: string) {
    return await prisma.project.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      select: { id: true },
    });
  },

  async findProjectsWithFilters(
    params: {
      skip: number;
      take: number;
      keyword?: string;
      tag?: string;
      status?: ProjectStatus;
    },
    visibility?: Visibility
  ) {
    const { skip, take, keyword, tag, status } = params;

    const where: Prisma.ProjectWhereInput = {
      AND: [
        keyword ? { title: { contains: keyword, mode: "insensitive" } } : {},
        tag ? { techs: { some: { name: tag } } } : {},
        status ? { status } : {},
        visibility ? { visibility } : {},
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
      where: {
        visibility: Visibility.PUBLIC,
      },
      include: {
        thumbnail: true,
        techs: true,
        attachments: { include: { file: true } },
      },
    });
  },
};
