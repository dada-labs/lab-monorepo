import { Selector } from "./Selector";
import { ProjectStatus, ProjectStatusLabel } from "../types";
import clsx from "clsx";

export const PROJECT_STATUS_OPTIONS = Object.entries(ProjectStatusLabel).map(
  ([value, config]) => ({
    value: value as ProjectStatus,
    label: config,
  })
);

export const PROJECT_FILTER_OPTIONS = [
  { value: "all", label: "전체" },
  ...PROJECT_STATUS_OPTIONS,
];

interface ProjectStatusSelectProps {
  size?: "sm" | "md" | "lg";
  value: ProjectStatus;
  selectName?: string;
  onChange: (value: ProjectStatus) => void;
  isFilter?: boolean;
  className?: string;
}

export function SelectorProjectStatus({
  size = "lg",
  value,
  selectName,
  onChange,
  isFilter = false,
  className,
}: ProjectStatusSelectProps) {
  const options = isFilter ? PROJECT_FILTER_OPTIONS : PROJECT_STATUS_OPTIONS;
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {selectName && (
        <label className="text-sm font-medium text-gray-700">
          {selectName}
        </label>
      )}
      <Selector
        size={size}
        value={value as ProjectStatus}
        onChange={onChange as (val: ProjectStatus) => void}
        options={options as { value: ProjectStatus; label: string }[]}
        dropdownOptions={options as { value: ProjectStatus; label: string }[]}
      />
    </div>
  );
}
