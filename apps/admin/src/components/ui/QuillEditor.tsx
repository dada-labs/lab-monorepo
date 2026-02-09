import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder: string;
  label?: string;
}

export default function QuillEditor({
  value,
  onChange,
  placeholder,
  label = "내용",
}: QuillEditorProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // 엔터 줄바꿈 위주의 간단한 도구 모음
  const modules = {
    toolbar: [
      [{ header: [3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "code-block"],
      ["clean"], // 포맷 초기화 버튼
    ],
  };

  if (!isClient) {
    return (
      <div className="h-[300px] bg-gray-50 border border-gray-200 rounded-md animate-pulse" />
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="editor-container" style={{ backgroundColor: "white" }}>
        <style>{`
      .quill {
        border: 1px solid #d1d5dc !important;
        border-radius:6px;
        overflow:hidden;
      }
      .ql-toolbar.ql-snow {
        border: none !important;
        background-color: #f7f7f7; /* bg-gray-50 */
        border-bottom: 1px solid #d1d5dc !important;
      }
      .ql-container.ql-snow {
        border: none !important;
        font-family: inherit;
      }
      .ql-editor.ql-blank::before {
        font-style: normal !important; 
        color: #757c8b !important; 
      }
      .ql-editor {
        min-height: 250px;
        font-size: 1rem;
        line-height: 1.6;
        font-style: normal;
      }
    `}</style>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
