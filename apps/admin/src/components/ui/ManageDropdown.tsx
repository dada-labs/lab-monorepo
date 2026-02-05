import { useState, useEffect, useRef } from "react";
import { Button } from "@shared";
import { EllipsisVertical, Trash2, Eraser } from "@shared/icons";

interface ManageDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ManageDropdown({
  onEdit,
  onDelete,
}: ManageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 토글 이벤트
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // 외부 클릭 시 닫기 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // 수정/삭제 클릭 핸들러
  const handleAction = (actionFn: () => void) => {
    actionFn();
    setIsOpen(false); // 실행 후 메뉴 닫기
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        type="button"
        size="md"
        variant="none"
        onClick={toggleMenu}
        className="!px-2.5 hover:!bg-gray-100"
      >
        <EllipsisVertical size={20} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-28 rounded-md border border-gray-300 bg-white shadow-lg">
          <ul className="text-sm text-gray-700">
            <li>
              <Button
                size="md"
                variant="none"
                className="hover:bg-gray-100"
                onClick={() => handleAction(onEdit)}
              >
                <Eraser size={16} /> 수정
              </Button>
            </li>
            <li>
              <Button
                size="md"
                variant="none"
                className=" text-red-600 hover:bg-red-50"
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    handleAction(onDelete);
                  }
                }}
              >
                <Trash2 size={16} /> 삭제
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
