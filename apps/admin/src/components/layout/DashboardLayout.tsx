import { Outlet } from "react-router-dom";
import NavigationBar from "@/components/layout/NavigationBar";
import ContentHeader from "./ContentHeader";

export default function DashboardLayout() {
  return (
    <>
      <div className="flex h-screen w-full min-w-7xl overflow-hidden">
        {/* Lnb */}
        <NavigationBar />
        <div className="flex flex-col flex-1 bg-white">
          <ContentHeader />
          {/* 페이지 컨텐츠 영역 */}
          <main className="flex-1 overflow-y-auto relative px-6 py-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
