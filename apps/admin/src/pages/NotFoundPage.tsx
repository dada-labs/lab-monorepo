import { useNavigate } from "react-router-dom";
import { Button } from "@shared";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col items-center justify-center flex-1 gap-8">
        <div className="flex justify-center">
          <img src="/images/img_404.png" alt="404 이미지" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            페이지를 찾을 수 없습니다.
          </h2>
          <p className="text-gray-600 text-center">
            요청하신 페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
            <br />
            입력하신 주소를 다시 확인해주세요.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="md"
            onClick={() => navigate("/")}
            className="!w-[148px]"
          >
            홈으로 가기
          </Button>
        </div>
      </div>
      <div className="py-4">
        <span className="text-sm text-gray-400">&copy;2026 Dada Lab</span>
      </div>
    </div>
  );
}
