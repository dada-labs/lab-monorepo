import {
  FolderCode,
  Users,
  MessageSquareLock,
  type LucideIcon,
} from "@shared/icons";
export const NAVIGATION = {
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  SIGNOUT: "/auth/signout",
  HOME: "/",
  PROJECT: "/project",
  USERS: "/users",
  CONTACT: "/contact",
} as const;

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

// 공통 메뉴, 모든 로그인 사용자
export const COMMON_NAV_ITEMS: NavItem[] = [
  { name: "프로젝트", href: NAVIGATION.PROJECT, icon: FolderCode },
  { name: "고객 문의", href: NAVIGATION.CONTACT, icon: MessageSquareLock },
  { name: "사용자", href: NAVIGATION.USERS, icon: Users },
];
