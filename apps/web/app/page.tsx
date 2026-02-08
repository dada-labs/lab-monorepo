"use client";

import { useEffect, useState } from "react";
import {
  Button,
  LoadingArea,
  NodataArea,
  ProjectCard,
  type ProjectItemResponse,
} from "@shared";
import Image from "next/image";
import Link from "next/link";
import { getRecentProjectList } from "@/lib/projects";
import clsx from "clsx";

export default function HomePage() {
  const [projectList, setProjectList] = useState<ProjectItemResponse[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const response = await getRecentProjectList();
        if (response.success && response.data) {
          setProjectList(response.data.projects);
        } else {
          throw new Error(
            response.message || "프로젝트 정보를 찾을 수 없습니다."
          );
        }
      } catch (err) {
        console.error(err);
        alert("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, []);

  if (isLoading) return <LoadingArea />;
  const isProjectList = projectList && projectList?.length > 0;
  return (
    <>
      <section className=" bg-primary-light bg-[url('/images/bg_visual.png')] bg-no-repeat bg-cover bg-center rounded-2xl">
        <div className="h-80 flex flex-col items-center justify-center gap-6 py-20">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-4xl font-bold text-white">Dada Lab</h1>
            <p className="text-lg font-medium text-primary">
              개발 관련 학습 내용 및 프로젝트 기록까지
            </p>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="flex flex-col py-20">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-2xl font-bold">최신 아카이빙</h2>
            <p className="text-gray-700 text-sm">
              개발 및 프로젝트 관련한 최신 기록을 확인해 보세요.
            </p>
          </div>
          <div
            className={clsx(
              "grid gap-6",
              isProjectList ? "grid-cols-4" : "grid-cols-1"
            )}
          >
            {isProjectList ? (
              projectList.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  LinkComponent={Link}
                  ImageComponent={Image}
                />
              ))
            ) : (
              <NodataArea />
            )}
          </div>
        </div>
      </section>
      <section className="bg-primary-light bg-[url('/images/bg_banner.png')] bg-no-repeat bg-cover bg-center rounded-2xl">
        <div className="h-80 flex flex-col items-center justify-center gap-6 py-20">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-3xl font-bold">Dada Lab</h2>
            <p className="text-lg text-gray-600">
              개발 과정과 프로젝트들에 대해서 궁금하다면?
            </p>
          </div>
          <div className="flex">
            <Link href="/project">
              <Button type="button">프로젝트 문의하기</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
