import { Button, SearchBar } from "@shared";
import { Plus } from "@shared/icons";
import { Link, useSearchParams } from "react-router-dom";

export default function ContentHeader() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleProjectSearch = (keyword: string) => {
    console.log("프로젝트 검색:", keyword);
    if (keyword) {
      searchParams.set("keyword", keyword);
    } else {
      searchParams.delete("keyword");
    }
    setSearchParams(searchParams);
  };

  return (
    <header className="flex items-center justify-between px-6 h-16 bg-white">
      <div className="flex gap-2 w-72">
        <SearchBar
          onSearch={handleProjectSearch}
          initialValue={searchParams.get("keyword") || ""}
        />
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
