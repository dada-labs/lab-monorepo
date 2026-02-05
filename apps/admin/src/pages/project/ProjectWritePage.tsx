import { createProject } from "@/lib/project";
import ProjectForm from "@/components/project/ProjectForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { flushSync } from "react-dom";

export default function ProjectWritePage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await createProject(data);
      if (response.success) {
        console.log(`${data} 상태로 서버 전송 완료!`, data);
        alert(
          data.get("visibility") === "PUBLIC"
            ? "프로젝트가 등록되었습니다."
            : "임시저장 되었습니다."
        );
        navigate("/project");
      }
    } catch (err) {
      console.error("저장 실패:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-1 pb-6 border-b border-gray-300">
        <h2 className="text-xl font-bold">프로젝트 등록</h2>
        <p className="text-sm text-gray-600">
          포트폴리오 아카이빙을 위한, 프로젝트 정보를 입력해 주세요.
        </p>
      </div>
      <div>
        <ProjectForm
          mode="CREATE"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
}
