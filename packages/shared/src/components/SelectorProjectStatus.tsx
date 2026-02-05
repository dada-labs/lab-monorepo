import { Selector } from "./Selector";
import { ProjectStatus, ProjectStatusLabel } from "../types";

export const USER_ROLE_OPTIONS = Object.entries(ProjectStatusLabel).map(
  ([value, config]) => ({
    value: value as ProjectStatus,
    label: config,
  })
);

interface ProjectStatusSelectProps {
  value: ProjectStatus;
  selectName?: string;
  onChange: (value: ProjectStatus) => void;
}

export function SelectorProjectStatus({
  value,
  selectName,
  onChange,
}: ProjectStatusSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {selectName && (
        <label className="text-sm font-medium text-gray-700">
          {selectName}
        </label>
      )}
      <Selector
        value={value}
        onChange={onChange}
        options={USER_ROLE_OPTIONS}
        dropdownOptions={USER_ROLE_OPTIONS}
      />
    </div>
  );
}
