import React from "react";
import { ProjectItemResponse, TechTagResponse } from "../types";

interface ProjectCardProps {
  project: ProjectItemResponse;
  ImageComponent?: React.ElementType;
  LinkComponent?: React.ElementType;
}

export const ProjectCard = ({
  project,
  ImageComponent = "img", // 일반 img 태그
  LinkComponent = "a", // 일반 a 태그
}: ProjectCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white transition-hover hover:shadow-lg">
      <LinkComponent
        href={`/project/${project.id}`}
        to={`/project/${project.id}`}
        className="block aspect-video w-full relative"
      >
        <div className="flex flex-col gap-4 p-6">
          <div className="">
            <h3 className="mb-1 text-lg font-bold line-clamp-1">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {project.oneLine}
            </p>
          </div>
          {project.techs.length > 0 && (
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
          )}
        </div>

        {/* 이미지 영역 */}

        <div className="relative w-full aspect-video overflow-hidden">
          <ImageComponent
            src={project.thumbnail?.url || "/images/og-image.png"}
            alt={project.title}
            fill={ImageComponent !== "img"} // Next.js Image 고려해야함
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      </LinkComponent>
    </div>
  );
};
