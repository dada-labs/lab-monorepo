import { useState, useEffect } from "react";
import { Button } from "./Button";
import { Search } from "../icons";
import { FormInput } from "./FormInput";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

export function SearchBar({
  initialValue = "",
  onSearch,
  placeholder,
}: SearchBarProps) {
  const [keyword, setKeyword] = useState(initialValue);

  useEffect(() => {
    setKeyword(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full max-w-sm items-center"
    >
      <FormInput
        size="md"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder || "프로젝트 제목을 검색해 보세요 :)"}
        isIcon={true}
      />
      <Button
        size="md"
        variant="none"
        type="submit"
        className="!absolute !w-10 !px-0 !left-0 !top-0 text-gray-600 hover:text-primary"
      >
        <Search size={20} />
      </Button>
    </form>
  );
}
