import { FormInput, Button } from "@shared";
import { useState } from "react";
import { Plus } from "@shared/icons";
import { Link } from "react-router-dom";

export default function ContentHeader() {
  const [keyword, setKeyword] = useState("");

  return (
    <header className="flex items-center justify-between px-6 h-16 bg-white">
      <div className="flex gap-2 w-72">
        <form className="flex-1">
          <FormInput
            type="text"
            size="md"
            value={keyword}
            placeholder="프로젝트 제목을 검색해보세요."
          />
        </form>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/project/write">
          <Button size="md">
            <Plus className="w-4 h-4" />
            <span className="font-medium">프로젝트 추가</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
