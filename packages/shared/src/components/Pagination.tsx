import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "../icons";
import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const groupSize = 5;
  const currentGroup = Math.ceil(currentPage / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        variant="none"
        size="md"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="!w-10 !px-1 disabled:opacity-30 disabled:!bg-transparent"
      >
        <span className="sr-only">이전</span>
        <ChevronLeft size={20} />
      </Button>

      {pages.map((num) => (
        <Button
          key={num}
          variant="line"
          size="md"
          onClick={() => onPageChange(num)}
          className={clsx(
            "!w-10 transition-colors",
            currentPage === num
              ? "!bg-black text-white font-bold"
              : "hover:!bg-gray-100"
          )}
        >
          {num}
        </Button>
      ))}

      <Button
        variant="none"
        size="md"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="!w-10 !px-1 disabled:opacity-30  disabled:!bg-transparent"
      >
        <span className="sr-only">다음</span>
        <ChevronRight size={20} />
      </Button>
    </div>
  );
}
