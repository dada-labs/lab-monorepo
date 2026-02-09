"use client";

import { getProjectById, updateProjectViewCount } from "@/lib/projects";
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
import { notFound, useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
    staleTime: 1000 * 60 * 5,
  });

  const project = data?.data;

  const { mutate: addViewCount } = useMutation({
    mutationFn: () => updateProjectViewCount(projectId as string),
    onSuccess: () => {
      queryClient.setQueryData(
        ["project", projectId],
        (prev: ProjectApiResponse) => {
          if (!prev || !prev.data) return prev;
          return {
            ...prev,
            data: {
              ...prev.data,
              viewCount: prev.data.viewCount + 1,
            },
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current && projectId) {
      addViewCount();
      isMounted.current = true;
    }

    return () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    };
  }, [projectId, addViewCount, queryClient]);

  if (isLoading) return <LoadingArea />;
  if (isError || !project) {
    notFound();
  }
  const statusConfig = ProjectStatusConfig[project.status];

  return (
    <>
      <div className="p-8 max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-4 pb-6 border-b border-gray-300">
          <div className="flex justify-between items-start">
            <TagItemList techs={project.techs} />
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
            <div className="pt-10 border-t border-gray-300 flex flex-col items-center gap-6">
              <div className="flex justify-center gap-4">
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
              <p className="text-gray-600 text-sm">
                프로젝트 관련 외부 링크를 통해, 더 자세한 내용을 확인하세요 :)
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
