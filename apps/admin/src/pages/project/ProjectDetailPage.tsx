import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById } from "@/lib/project";
import {
  formatDate,
  ProjectStatusLabel,
  UrlButton,
  type ProjectResponse,
  type TechTagResponse,
} from "@shared";
import ManageDropdown from "@/components/ui/ManageDropdown";
import { Link as LinkIcon } from "@shared/icons";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<ProjectResponse | null>(null);

  const handleEdit = () => {
    if (!project) return;

    console.log(`${project.id} 수정 페이지로 이동`);
    navigate(`/project/edit/${project.id}`);
  };
  const handleDelete = () => {
    if (!project) return;

    console.log(`$${project.id} 프로젝트 삭제 API 호출`);
    // 예: axios.delete(`/api/posts/${post.id}`)
  };

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

  useEffect(() => {
    fetchProject();
  }, [id, navigate]);

  if (isLoading) return <div>로딩 중</div>;
  if (!project) return <div>해당 페이지를 찾을 수 없습니다.</div>;

  return (
    <>
      <div className="p-8 max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-4 pb-6 border-b border-gray-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap gap-2">
              {project.techs.map((t: TechTagResponse) => (
                <div
                  key={t.id}
                  className="flex gap-1 items-center text-sm text-primary font-bold bg-primary-lightest border border-primary-light px-2 py-0.5 rounded"
                >
                  #{t.name}
                </div>
              ))}
            </div>
            <ManageDropdown onEdit={handleEdit} onDelete={handleDelete} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p className="text-sm text-gray-600">{project.oneLine}</p>
          </div>
          <div className="flex justify-between">
            {project.startedAt && (
              <dl className="flex gap-1 text-sm text-gray-600">
                <dt className="">작업 기간</dt>
                <dd className="font-medium">
                  {formatDate(project.startedAt) || "-"}
                  {project.endedAt && ` ~ ${formatDate(project.endedAt)}`}
                </dd>
              </dl>
            )}
            <dl className="flex gap-1 text-sm text-gray-600">
              <dt className="">프로젝트 상태</dt>
              <dd className="font-bold">
                {ProjectStatusLabel[project.status]}
              </dd>
            </dl>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {project.thumbnail && (
            <div className="">
              <img src={project.thumbnail.url} alt={project.title} />
            </div>
          )}
          <div className="flex flex-col gap-8">
            {project.highlights && (
              <dl className="flex flex-col gap-1">
                <dt className="font-bold text-lg">주요 기능</dt>
                <dd className="font-medium text-gray-600">
                  {project.highlights}
                </dd>
              </dl>
            )}
            {project.description && (
              <dl className="flex flex-col gap-1">
                <dt className="font-bold text-lg">상세 내용</dt>
                <dd className="font-medium text-gray-600">
                  {project.description}
                </dd>
              </dl>
            )}
            {project.attachments && project.attachments.length > 0 && (
              <dl className="flex flex-col gap-1">
                <dt className="font-bold text-lg">첨부파일</dt>
                <dd className="font-medium text-gray-600">
                  <div className="flex flex-col gap-2">
                    {project.attachments.map((item) => (
                      <div
                        key={item.file.id}
                        className="flex items-center justify-between p-3 bg-primary-lightest rounded-lg border border-primary-light"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <LinkIcon size={16} className="text-primary" />
                          <span className="text-sm text-gray-700 truncate">
                            {item.file.fileName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </dd>
              </dl>
            )}
          </div>
          {(project.liveUrl || project.githubUrl || project.relatedUrl) && (
            <div className="pt-10 border-t border-gray-300 flex justify-center gap-4">
              {project.liveUrl && (
                <UrlButton
                  url={project.liveUrl}
                  urlType="LIVE"
                  theme="gray"
                  LinkComponent={Link}
                />
              )}
              {project.githubUrl && (
                <UrlButton
                  url={project.githubUrl}
                  urlType="GITHUB"
                  LinkComponent={Link}
                />
              )}
              {project.relatedUrl && (
                <UrlButton
                  url={project.relatedUrl}
                  urlType="RELATED"
                  theme="gray"
                  LinkComponent={Link}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
