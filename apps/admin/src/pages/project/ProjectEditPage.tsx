import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProject } from "@/lib/project";
import ProjectForm from "@/components/project/ProjectForm";
import { LoadingArea } from "@shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ProjectEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id!),
    enabled: !!id,
    meta: {
      onError: () => {
        alert("데이터를 불러오는데 실패했습니다.");
        navigate("/project");
      },
    },
  });

  const project = data?.data;

  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateProject(id!, formData),
    onSuccess: (response) => {
      if (response.success && response.data) {
        alert(response.message || "수정되었습니다.");

        queryClient.invalidateQueries({ queryKey: ["project", id] });
        queryClient.invalidateQueries({ queryKey: ["projects"] });

        navigate(`/project/${response.data.id}`);
      }
    },
    onError: (err: any) => {
      alert(`수정 중 오류가 발생했습니다: ${err.message}`);
      console.error("수정 실패:", err);
    },
  });

  // 수정 핸들러
  const handleSubmit = async (formData: FormData) => {
    mutation.mutate(formData);
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
            isSubmitting={mutation.isPending}
          />
        )}
      </div>
    </>
  );
}
