import { ProjectCard, type ProjectResponse } from "@shared";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectListPage() {
  const [projectList, setProjectList] = useState<ProjectResponse[] | null>(
    null
  );

  useEffect(() => {}, [projectList]);
  return (
    <>
      <div className="flex flex-col gap-1 pb-6 border-b border-gray-300">
        <h2 className="text-xl font-bold">프로젝트 목록</h2>
        <p className="text-sm text-gray-600">
          포트폴리오 아카이빙을 위한, 프로젝트 정보를 입력해 주세요.
        </p>
      </div>
      <div className="flex flex-wrap">
        {projectList ? (
          projectList.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              LinkComponent={Link}
            />
          ))
        ) : (
          <p>프로젝트 목록이 없습니다</p>
        )}
      </div>
    </>
  );
}
