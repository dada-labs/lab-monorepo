import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Button } from "@shared";
import { useLnbStore } from "@/store/lnbStore";
import { useAuthStore } from "@/store/authStore";
import { ChevronsLeft, ChevronsRight, Settings } from "@shared/icons";
import { COMMON_NAV_ITEMS } from "@/constants/navigation";
import { MenuItem } from "./MenuItem";
import SignoutButton from "../ui/SignoutButton";
import { USER_ROLE } from "../../../../../packages/shared/src/constants/user";

export default function NavigationBar() {
  const { isSidebarExpanded, toggleSidebar } = useLnbStore();
  const { user } = useAuthStore();
  const location = useLocation();

  return (
    <aside
      className={clsx(
        "relative flex flex-col bg-gray-200 text-gray-600 transition-all border-r border-gray-300 duration-200 ease-in-out",
        isSidebarExpanded ? "w-64 min-w-70" : "w-18 min-w-20"
      )}
    >
      {/* 로고 영역 */}
      <div
        className={clsx(
          "flex h-16 items-center gap-4 justify-between px-4",
          !isSidebarExpanded &&
            "flex-col gap-0.5 h-auto py-3 border-b border-gray-300"
        )}
      >
        <Link to={"/"}>
          {isSidebarExpanded ? (
            <img
              src="/images/logo.svg"
              alt="DadaLab logo"
              width={140}
              height={32}
            />
          ) : (
            <img
              src="/images/logo_symbol.svg"
              alt="DadaLab logo"
              width={36}
              height={36}
            />
          )}
        </Link>
        <Button
          onClick={toggleSidebar}
          variant="none"
          size="md"
          className="!w-auto !px-1 bg-gray-200 rounded-lg !text-gray-400 hover:bg-gray-100"
        >
          {isSidebarExpanded ? <ChevronsLeft /> : <ChevronsRight />}
        </Button>
      </div>

      {/* 메뉴 영역 */}
      <nav className="flex-1 space-y-2 p-4">
        <ul className="flex flex-col gap-2">
          {COMMON_NAV_ITEMS.map((item) => (
            <MenuItem
              key={item.name}
              item={item}
              isActive={location.pathname.startsWith(item.href)}
              isSidebarExpanded={isSidebarExpanded}
            />
          ))}
        </ul>
      </nav>

      {/* 하단 유저/토글 영역 */}
      <div className="px-4 py-6 flex flex-col gap-6">
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              to="/settings/password"
              className={clsx(
                "flex items-center gap-2 rounded-lg text-sm h-8 transition-colors",
                isSidebarExpanded ? "px-4" : "px-1 justify-center"
              )}
            >
              <Settings className="h-5 w-5 text-black" />
              {isSidebarExpanded && (
                <span className="font-medium">비밀번호 초기화</span>
              )}
            </Link>
          </li>
          <li>
            <SignoutButton />
          </li>
        </ul>
        <div className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2">
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center border-primary-light text-white text-base font-bold">
            {user?.email?.[0].toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">
              {user?.email || "-"}
            </div>
            <div className="text-[11px] text-gray-500 uppercase">
              {user ? <span>{USER_ROLE[user.role].label}</span> : "-"}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
