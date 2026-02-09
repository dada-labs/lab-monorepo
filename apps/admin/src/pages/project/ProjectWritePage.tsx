import { createProject } from "@/lib/project";
import ProjectForm from "@/components/project/ProjectForm";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProjectWritePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: FormData) => createProject(data),
    onSuccess: (response, data) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["projects"] });

        const visibility = data.get("visibility");
        alert(
          visibility === "PUBLIC"
            ? "프로젝트가 등록되었습니다."
            : "임시저장 되었습니다."
        );

        navigate("/project");
      }
    },
    onError: (err) => {
      console.error("저장 실패:", err);
      alert("프로젝트 등록 중 오류가 발생했습니다.");
    },
  });

  // 제출 핸들러
  const handleSubmit = async (data: FormData) => {
    mutation.mutate(data);
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
          isSubmitting={mutation.isPending}
        />
      </div>
    </>
  );
}
