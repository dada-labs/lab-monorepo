import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById, updateProject } from "@/lib/project";
import ProjectForm from "@/components/project/ProjectForm";
import { LoadingArea, type ProjectResponse } from "@shared";

export default function ProjectEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        const response = await getProjectById(id);
        if (response.success && response.data) {
          setProject(response.data);
        } else {
          throw new Error(
            response.message || "프로젝트 정보를 찾을 수 없습니다."
          );
        }
      } catch (err) {
        console.error(err);
        alert("데이터를 불러오는데 실패했습니다.");
        navigate("/project");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate]);

  // 3. 수정 핸들러 (updateProject API 호출)
  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log("수정 요청 시작..."); // 디버깅용
      const response = await updateProject(id!, data);

      console.log("API 응답 결과:", response);
      if (response.success && response.data) {
        alert(response.message);
        navigate(`/project/${response.data.id}`);
      }
    } catch (err: any) {
      console.error("수정 실패 상세:", err.response?.data || err.message);
      alert(`수정 중 오류가 발생했습니다: ${err.message}`);
      console.error("수정 실패:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingArea />;

  return (
    <>
      <div className="flex flex-col gap-1 pb-6 border-b border-gray-300">
        <h2 className="text-xl font-bold">프로젝트 수정</h2>
        <p className="text-sm text-gray-600">
          포트폴리오 아카이빙을 위한, 프로젝트 정보를 입력해 주세요.
        </p>
      </div>
      <div>
        {project && (
          <ProjectForm
            mode="EDIT"
            initialData={project}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </>
  );
}
