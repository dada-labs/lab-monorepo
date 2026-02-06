import { getProjectList } from "@/lib/project";
import {
  LoadingArea,
  NodataArea,
  Pagination,
  ProjectCard,
  SelectorProjectStatus,
  type MetaData,
  type ProjectItemResponse,
  type ProjectStatus,
} from "@shared";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function ProjectListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projectList, setProjectList] = useState<ProjectItemResponse[] | null>(
    null
  );
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentKeyword = searchParams.get("keyword") || "";
  const currentStatus = searchParams.get("status") || "all";
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page));
    setSearchParams(next);
  };

  const updateParams = (updates: Record<string, string | number>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    // 필터(키워드, 상태)가 바뀌면 항상 1페이지로 이동
    if (!updates.page) {
      next.set("page", "1");
    }

    setSearchParams(next);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectList({
          keyword: currentKeyword,
          status: currentStatus === "all" ? "" : currentStatus,
          page: currentPage,
        });
        if (response.success && response.data) {
          setProjectList(response.data.projects);
          setMetaData(response.data.meta);
        } else {
          throw new Error(
            response.message || "프로젝트 정보를 찾을 수 없습니다."
          );
        }
      } catch (err) {
        console.error(err);
        alert("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [searchParams]);

  if (isLoading) return <LoadingArea />;

  const isProjectList = projectList && projectList?.length > 0;
  return (
    <>
      <div className="flex justify-between gap-1 pb-4">
        <h2 className="">
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
            />
          ))
        ) : (
          <NodataArea />
        )}
      </div>
      {/* 페이지네이션 버튼 영역 */}
      {metaData && metaData.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={metaData?.totalPages || 0}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
