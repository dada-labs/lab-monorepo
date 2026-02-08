import { TechTagResponse } from "../types";
import { TagItem } from "./TagItem";

interface TagItemListProps {
  techs: TechTagResponse[];
  onDelete?: () => void;
}

export function TagItemList({ techs, onDelete }: TagItemListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {techs.map((t: TechTagResponse, idx) => (
        <TagItem key={t.id || idx} tagName={t.name} onDelete={onDelete} />
      ))}
    </div>
  );
}
