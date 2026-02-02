// src/api/auth.ts
import api, { isAxiosError } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import type { SignInResponse } from "@shared";

export const signIn = async (payload: { email: string; password: string }) => {
  try {
    console.log(api.defaults.baseURL);
    const response = await api.post<SignInResponse>(
      "/api/auth/signin",
      payload
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      console.error("서버 에러 발생:", serverMessage);

      return {
        success: false,
        data: null,
        message: serverMessage?.includes("prisma")
          ? "서버 데이터 처리 중 오류가 발생했습니다."
          : serverMessage || "로그인 정보가 일치하지 않습니다.",
      };
    }
    return {
      success: false,
      data: null,
      message: "시스템 오류가 발생했습니다.",
    };
  }
};

export const signOut = async () => {
  try {
    await api.post("/api/auth/signout");
  } catch (error) {
    console.warn("[Signout] 서버 로그아웃 실패", error);
  } finally {
    useAuthStore.getState().clearAuth();
  }
};
