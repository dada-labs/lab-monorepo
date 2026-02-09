import { Metadata } from "next";
import { getProjectById } from "@/lib/projects";
import ProjectDetailView from "./ProjectDetailView"; // 2번에서 만들 파일
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

// [SEO] 동적 메타데이터
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const response = await getProjectById(resolvedParams.id);
  const project = response?.data;

  if (!project) return { title: "프로젝트를 찾을 수 없습니다 | Dada Lab" };

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  return {
    metadataBase: new URL("https://lab-monorepo-web.vercel.app"),
    title: project.title,
    description: project.oneLine,
    openGraph: {
      title: `${project.title} | Dada Lab`,
      description: project.oneLine,
      images: [project.thumbnail?.url || "/images/og-image.png"],
      url: `/project/${resolvedParams.id}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const response = await getProjectById(resolvedParams.id);
  if (!response?.data) notFound();

  return <ProjectDetailView />;
}
