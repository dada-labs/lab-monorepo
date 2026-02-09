import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getProjectById, updateProjectViewCount } from "@/lib/project";
import {
  ArticleItem,
  FileItem,
  formatDateRange,
  LoadingArea,
  ProjectStatusConfig,
  TagItemList,
  UrlButton,
  type ProjectApiResponse,
} from "@shared";
import ManageDropdown from "@/components/ui/ManageDropdown";
import NotFoundPage from "../NotFoundPage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id!), // id가 있을 때만 실행됨
    enabled: !!id, // id가 없으면 쿼리를 실행하지 않음
  });

  const project = data?.data;

  const { mutate: addViewCount } = useMutation({
    mutationFn: () => updateProjectViewCount(id!),
    onSuccess: () => {
      queryClient.setQueryData(
        ["project", id],
        (prevData: ProjectApiResponse) => {
          if (!prevData || !prevData.data) return prevData;
          return {
            ...prevData,
            data: {
              ...prevData.data,
              viewCount: prevData.data.viewCount + 1,
            },
          };
        }
      );
    },
  });

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

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current && id) {
      addViewCount();
      isMounted.current = true;
    }

    return () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    };
  }, [id, addViewCount, queryClient]);

  if (isLoading) return <LoadingArea />;
  if (isError || !project) return <NotFoundPage />;

  const statusConfig = ProjectStatusConfig[project.status];

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
            <dl className="flex gap-1 text-sm text-gray-600">
              <dt className="sr-only">진행 상태</dt>
              <dd className="font-bold flex gap-1 items-center">
                <span style={{ color: statusConfig.color }}>●</span>
                {ProjectStatusConfig[project.status].label}
              </dd>
            </dl>
            <dl className="flex gap-1 text-sm text-gray-600">
              <dt className="sr-only">작업 기간</dt>
              <dd className="font-medium">
                {formatDateRange(project.startedAt, project.endedAt)}
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
              <ArticleItem label="상세 내용">
                <div
                  className="text-sm [&_p]:min-h-[1rem] [&_p]:mb-2 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-bold [&_h3]:mb-2 leading-7"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </ArticleItem>
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
