import { X, Download, Link as LinkIcon } from "../icons";
import { Button } from "./Button";

interface FileItemProps {
  fileName: string;
  fileUrl?: string;
  isRead?: boolean;
  onDelete?: () => void;
}

export function FileItem({
  fileName,
  fileUrl,
  isRead = false,
  onDelete,
}: FileItemProps) {
  const handleDownload = async (e: React.MouseEvent) => {
    if (!fileUrl) return;
    e.preventDefault();

    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("다운로드 중 오류 발생:", error);
      window.open(fileUrl, "_blank");
    }
  };
  return (
    <div className="flex items-center justify-between p-3 bg-primary-lightest rounded-lg border border-primary-light">
      <div className="flex items-center gap-2 truncate flex-1">
        <LinkIcon size={16} className="text-primary shrink-0" />
        <span className="text-sm text-gray-700 truncate cursor-pointer hover:underline">
          {fileName}
        </span>
      </div>

      {isRead ? (
        <Button
          type="button"
          variant="none"
          size="sm"
          onClick={handleDownload}
          className="!w-auto !px-0 text-gray-400 hover:text-primary ml-2"
        >
          <Download size={18} />
        </Button>
      ) : (
        <Button
          type="button"
          variant="none"
          size="sm"
          onClick={onDelete}
          className="!w-auto !px-0 text-gray-400 hover:text-red-500 ml-2"
        >
          <X size={18} />
        </Button>
      )}
    </div>
  );
}
