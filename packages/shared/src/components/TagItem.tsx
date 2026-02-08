import { X, Download, Link as LinkIcon } from "../icons";
import { Button } from "./Button";

interface TagItemProps {
  tagName: string;
  onDelete?: () => void;
}

export function TagItem({ tagName, onDelete }: TagItemProps) {
  return (
    <div className="flex gap-1 items-center text-sm text-primary font-bold bg-primary-lightest border border-primary-light px-2 py-0.5 rounded whitespace-nowrap">
      #{tagName}
      {onDelete && (
        <Button size="sm" variant="none" className="!px-0" onClick={onDelete}>
          <X size={16} />
        </Button>
      )}
    </div>
  );
}
