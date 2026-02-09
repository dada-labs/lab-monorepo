// src/api/auth.ts
import api, { isAxiosError } from "@/lib/api";
import type {
  ProjectApiResponse,
  ProjectListApiResponse,
  GetProjectListParams,
} from "@shared";

export const getPublicProjectList = async ({
  keyword,
  status,
  page = 1,
}: GetProjectListParams) => {
  try {
    const response = await api.get<ProjectListApiResponse>(
      "/api/projects/public",
      {
        params: {
          keyword: keyword || undefined,
          status: status === "all" ? undefined : status,
          page,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      console.error("서버 에러 발생:", serverMessage);

      return {
        success: false,
        data: null,
        message:
          serverMessage || "프로젝트 목록을 불러오는 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      data: null,
      message: "시스템 오류가 발생했습니다.",
    };
  }
};

export const getRecentProjectList = async () => {
  try {
    const response = await api.get<ProjectListApiResponse>(
      "/api/projects/recent"
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      console.error("서버 에러 발생:", serverMessage);

      return {
        success: false,
        data: null,
        message:
          serverMessage ||
          "프로젝트 최신 목록을 불러오는 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      data: null,
      message: "시스템 오류가 발생했습니다.",
    };
  }
};

export const getProjectById = async (id: string) => {
  try {
    const response = await api.get<ProjectApiResponse>(`/api/projects/${id}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      console.error("서버 에러 발생:", serverMessage);

      return {
        success: false,
        data: null,
        message:
          serverMessage || "프로젝트 정보를 불러오는 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      data: null,
      message: "시스템 오류가 발생했습니다.",
    };
  }
};
