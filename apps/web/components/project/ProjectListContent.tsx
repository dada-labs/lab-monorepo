"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LoadingArea,
  NodataArea,
  Pagination,
  ProjectCard,
  ProjectStatus,
  SelectorProjectStatus,
  type MetaData,
  type ProjectItemResponse,
} from "@shared";
import Link from "next/link";
import Image from "next/image";
import { getPublicProjectList } from "@/lib/projects";
import clsx from "clsx";

export default function ProjectListContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [projectList, setProjectList] = useState<ProjectItemResponse[] | null>(
    null
  );
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentKeyword = searchParams.get("keyword") || "";
  const currentStatus = searchParams.get("status") || "all";
  const currentPage = Number(searchParams.get("page")) || 1;

  const updateParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    // 필터(키워드, 상태)가 바뀌면 항상 1페이지로 이동
    if (!updates.page) {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const response = await getPublicProjectList({
          keyword: currentKeyword,
          status: currentStatus === "all" ? "" : currentStatus,
          page: currentPage,
        });
        if (response.success && response.data) {
          setProjectList(response.data.projects);
          setMetaData(response.data.meta);
        }
      } catch (err) {
        console.error(err);
        alert("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [currentKeyword, currentStatus, currentPage]);

  if (isLoading) return <LoadingArea />;

  const isProjectList = projectList && projectList?.length > 0;

  return (
    <>
      <div className="flex justify-between gap-1 pb-4">
        <h2>
          프로젝트 목록{" "}
          <span className="text-primary font-bold">{metaData?.totalCount}</span>
        </h2>
        <SelectorProjectStatus
          size="md"
          value={currentStatus as ProjectStatus}
          onChange={(val) => updateParams({ status: val })}
          isFilter={true}
          className="w-30"
        />
      </div>
      <div
        className={clsx(
          "grid gap-6",
          isProjectList ? "grid-cols-4" : "grid-cols-1"
        )}
      >
        {isProjectList ? (
          projectList.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              LinkComponent={Link}
              ImageComponent={Image}
            />
          ))
        ) : (
          <NodataArea />
        )}
      </div>
      {metaData && metaData.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={metaData.totalPages}
          onPageChange={(page) => updateParams({ page })}
        />
      )}
    </>
  );
}
