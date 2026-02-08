import type { UserRole } from "../types";

export const USER_ROLE = {
  ADMIN: {
    label: "관리자",
  },
  MANAGER: {
    label: "매니저",
  },
  USER: {
    label: "일반 사용자",
  },
} as const satisfies Record<UserRole, { label: string }>;
