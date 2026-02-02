import type { NavItem } from "@/constants/navigation";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface MenuItemProps {
  item: NavItem;
  isActive: boolean;
  isSidebarExpanded: boolean;
}

export function MenuItem({ item, isActive, isSidebarExpanded }: MenuItemProps) {
  return (
    <li>
      <Link
        to={item.href}
        className={clsx(
          "flex items-center gap-2 rounded-lg h-11 transition-colors",
          isSidebarExpanded ? "px-4" : "px-1 justify-center",
          isActive
            ? "bg-white text-gray-900 font-bold"
            : "hover:bg-gray-100 hover:text-gray-700 hover:font-medium"
        )}
      >
        <item.icon className={clsx("h-5 w-5", isActive && "text-black")} />
        {isSidebarExpanded && <span>{item.name}</span>}
      </Link>
    </li>
  );
}
