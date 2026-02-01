import { UserRole } from "@/types/auth";
import { UserStatus } from "@/types/user";
import { LoaderCircle, CircleCheck, Ban } from "lucide-react";

export const USER_ROLE = {
  ADMIN: {
    label: "최고관리자",
  },
  AGENT: {
    label: "회사 담당자",
  },
  MANAGER: {
    label: "매니저",
  },
} as const satisfies Record<UserRole, { label: string }>;

export const USER_STATUS = {
  PENDING: {
    label: "대기",
    icon: LoaderCircle,
    color: "text-gray-400",
  },
  ACTIVE: {
    label: "활성화",
    icon: CircleCheck,
    color: "text-green-500",
  },
  INACTIVED: {
    label: "비활성",
    icon: Ban,
    color: "text-red-500",
  },
} as const satisfies Record<
  UserStatus,
  {
    label: string;
    icon: React.ElementType;
    color: string;
  }
>;
