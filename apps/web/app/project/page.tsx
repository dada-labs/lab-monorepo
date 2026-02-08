"use client";

import { Suspense } from "react";
import { LoadingArea } from "@shared";
import ProjectListContent from "@/components/project/ProjectListContent";

export default function ProjectListPage() {
  return (
    <Suspense fallback={<LoadingArea />}>
      <ProjectListContent />
    </Suspense>
  );
}
