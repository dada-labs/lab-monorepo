import { UserRole } from "@/types/auth";
import {
  MessagesSquare,
  UserCheck,
  Users,
  AppWindowMac,
  Server,
  Mail,
  AtSign,
  Building,
  Building2,
} from "lucide-react";
export const NAVIGATION = {
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  SIGNOUT: "/auth/signout",
  HOME: "/",
  CHAT: "/chat",
  USERS: "/users",
  DOMAINS: "/domains",
  INVITATION: "/invitations",
  ORG: "/organizations",
} as const;

export interface NavItem {
  name: string;
  href: string;
  icon: any;
  roles?: UserRole[]; // 접근 권한
}

// 공통 메뉴, 모든 로그인 사용자
export const COMMON_NAV_ITEMS: NavItem[] = [
  { name: "채팅", href: NAVIGATION.CHAT, icon: MessagesSquare },
  { name: "도메인", href: NAVIGATION.DOMAINS, icon: AppWindowMac },
  { name: "구성원", href: NAVIGATION.USERS, icon: UserCheck },
  { name: "초대 현황", href: NAVIGATION.INVITATION, icon: AtSign },
  { name: "회사 정보", href: NAVIGATION.ORG, icon: Building },
];
