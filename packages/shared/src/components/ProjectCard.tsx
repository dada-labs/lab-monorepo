import React from "react";
import {
  ProjectItemResponse,
  TechTagResponse,
  VisibilityLabel,
} from "../types";
import clsx from "clsx";
import { Eye } from "../icons";
import { formatYear } from "../utils";
import { TagItemList } from "./TagItemList";

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
    <div className="flex flex-col gap-1 h-full">
      <div className="flex justify-between text-sm">
        <div className="text-gray-600">
          <span className="font-bold">{formatYear(project.createdAt)}</span>
          {` · ${VisibilityLabel[project.visibility]}`}
        </div>
        <p className="flex gap-2 items-center text-gray-600">
          <Eye size={16} className="text-gray-400" />
          {project.viewCount}
        </p>
      </div>
      <div
        className={clsx(
          "flex-1 flex flex-col overflow-hidden rounded-lg border border-gray-300 transition-hover hover:shadow-xl",
          !project.thumbnail ? "bg-primary-lightest" : "bg-white"
        )}
      >
        <LinkComponent
          href={`/project/${project.id}`}
          to={`/project/${project.id}`}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6 p-6">
            <div className="">
              <h3 className="mb-1 text-lg font-bold line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {project.oneLine}
              </p>
            </div>
            {project.techs.length > 0 && <TagItemList techs={project.techs} />}
          </div>

          {/* 이미지 영역 */}

          {project.thumbnail && (
            <div className="relative w-full aspect-video overflow-hidden">
              <ImageComponent
                src={project.thumbnail?.url || "/images/og-image.png"}
                alt={project.title}
                fill={ImageComponent !== "img"} // Next.js Image 고려해야함
                className={clsx(
                  "object-cover w-full h-full transition-transform duration-300 hover:scale-105",
                  !project.thumbnail && "grayscale opacity-50"
                )}
              />
            </div>
          )}
        </LinkComponent>
      </div>
    </div>
  );
};
