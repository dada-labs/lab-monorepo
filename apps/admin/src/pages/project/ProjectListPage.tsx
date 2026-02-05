import { getProjectList } from "@/lib/project";
import {
  LoadingArea,
  ProjectCard,
  type MetaData,
  type ProjectItemResponse,
  type ProjectResponse,
} from "@shared";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectListPage() {
  const [projectList, setProjectList] = useState<ProjectItemResponse[] | null>(
    null
  );
  const [mataData, setMataData] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectList();
        if (response.success && response.data) {
          setProjectList(response.data.projects);
          setMataData(response.data.meta);
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
  }, [projectList]);

  if (isLoading) return <LoadingArea />;

  return (
    <>
      <div className="flex flex-col gap-1 pb-4">
        <h2 className="">
          프로젝트 목록{" "}
          <span className="text-primary font-bold">{mataData?.totalCount}</span>
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
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
