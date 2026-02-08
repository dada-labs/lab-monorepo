import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById } from "@/lib/project";
import {
  ArticleItem,
  FileItem,
  formatDate,
  formatFullDate,
  LoadingArea,
  ProjectStatusLabel,
  TagItemList,
  UrlButton,
  type ProjectResponse,
  type TechTagResponse,
} from "@shared";
import ManageDropdown from "@/components/ui/ManageDropdown";
import NotFoundPage from "../NotFoundPage";

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

  if (isLoading) return <LoadingArea />;
  if (!project) return <NotFoundPage />;

  return (
    <>
      <div className="p-8 max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-4 pb-6 border-b border-gray-300">
          <div className="flex justify-between items-start">
            <TagItemList techs={project.techs} />
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
                  {formatFullDate(project.startedAt) || "-"}
                  {project.endedAt && ` ~ ${formatFullDate(project.endedAt)}`}
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
              <ArticleItem label="기능 및 성과">
                {project.highlights}
              </ArticleItem>
            )}
            {project.description && (
              <ArticleItem label="상세 내용">{project.description}</ArticleItem>
            )}
            {project.attachments && project.attachments.length > 0 && (
              <ArticleItem label="첨부파일">
                <div className="flex flex-col gap-2">
                  {project.attachments.map((item) => (
                    <FileItem
                      key={item.file.id}
                      fileName={item.file.fileName}
                      fileUrl={item.file.url}
                      isRead={true}
                    />
                  ))}
                </div>
              </ArticleItem>
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
