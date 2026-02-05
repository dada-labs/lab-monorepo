// src/api/auth.ts
import api, { isAxiosError } from "@/lib/api";
import type { ProjectApiResponse, CreateProjectPayload } from "@shared";

export const createProject = async (formData: FormData) => {
  try {
    const response = await api.post<ProjectApiResponse>(
      "/api/projects",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 전송 시, 필수
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
        message: serverMessage || "프로젝트 생성 중 오류가 발생했습니다.",
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

export const updateProject = async (id: string, formData: FormData) => {
  try {
    const response = await api.patch<ProjectApiResponse>(
      `/api/projects/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 전송 시, 필수
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
        message: serverMessage || "프로젝트 생성 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      data: null,
      message: "시스템 오류가 발생했습니다.",
    };
  }
};
