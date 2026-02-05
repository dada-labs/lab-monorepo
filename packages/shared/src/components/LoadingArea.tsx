import { LoaderCircle } from "../icons";

interface LoadingProps {
  text?: string;
}

export function LoadingArea({
  text = "요청하는 데이터를 불러오는 중...",
}: LoadingProps) {
  return (
    <div className="flex w-full h-full items-center justify-center py-24">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <LoaderCircle className="h-10 w-10 text-gray-400 animate-spin" />
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
}
