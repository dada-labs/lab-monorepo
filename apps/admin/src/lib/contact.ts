// src/api/auth.ts
import api, { isAxiosError } from "@/lib/api";
import type { ContactListApiResponse, ContactApiResponse } from "@shared";

export const getContactList = async () => {
  try {
    const response = await api.get<ContactListApiResponse>("/api/contacts");

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
          "프로젝트 관련 문의 목록을 불러오는 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      data: null,
      message: "시스템 오류가 발생했습니다.",
    };
  }
};

export const getContactById = async (id: string) => {
  try {
    const response = await api.get<ContactApiResponse>(`/api/contacts/${id}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      console.error("서버 에러 발생:", serverMessage);

      return {
        success: false,
        data: null,
        message:
          serverMessage || "문의 정보를 불러오는 중 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      data: null,
      message: "시스템 오류가 발생했습니다.",
    };
  }
};
