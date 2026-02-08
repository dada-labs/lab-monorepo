import {
  Button,
  FileItem,
  formatDateForInput,
  FormInput,
  FormTextArea,
  SelectorProjectStatus,
  TagItem,
  type ProjectResponse,
  type ProjectStatus,
  type TechTagResponse,
  type Visibility,
} from "@shared";
import { useEffect, useState } from "react";
import { Image, UploadCloud, X } from "@shared/icons";

interface ProjectFormProps {
  initialData?: ProjectResponse;
  mode: "CREATE" | "EDIT";
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export default function ProjectForm({
  initialData,
  mode,
  onSubmit,
  isSubmitting,
}: ProjectFormProps) {
  const [isFormLoading, setIsFormLoading] = useState(false);

  // 1. 초기값 설정 (수정 시에는 initialData 사용, 등록 시에는 빈 값)
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    oneLine: initialData?.oneLine || "",
    description: initialData?.description || "",
    highlights: initialData?.highlights || "",
    liveUrl: initialData?.liveUrl || "",
    githubUrl: initialData?.githubUrl || "",
    relatedUrl: initialData?.relatedUrl || "",
    visibility: initialData?.visibility,
    startedAt: formatDateForInput(initialData?.startedAt) || "",
    endedAt: formatDateForInput(initialData?.endedAt) || "",
    techInput: "",
  });
  const [techs, setTechs] = useState<string[]>(
    initialData?.techs
      ? initialData.techs.map((t: TechTagResponse) => t.name)
      : []
  );
  const [status, setStatus] = useState<ProjectStatus>(
    initialData?.status || "COMPLETED"
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // 2. 파일 상태는 항상 새로 시작 (기존 파일은 UI에서 따로 표시)
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [docs, setDocs] = useState<File[]>([]);

  // 썸네일 선택 처리
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // 썸네일 지우기
  const removeThumbnail = () => {
    setThumbnail(null);
    setPreviewUrl(null);
  };

  // 첨부파일 다중 선택 처리
  const handleDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const totalCount = docs.length + selectedFiles.length;

      // 5개 초과 선택 시 차단
      if (totalCount > 5) {
        alert("첨부파일은 최대 5개까지만 등록할 수 있습니다.");
        e.target.value = "";
        return;
      }

      setDocs((prev) => [...prev, ...selectedFiles]);
      e.target.value = ""; // 추가 후 초기화
    }
  };

  // 파일 지우기
  const removeDoc = (index: number) => {
    setDocs((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && formData.techInput.trim()) {
      e.preventDefault();
      if (techs.length < 10 && !techs.includes(formData.techInput)) {
        setTechs([...techs, formData.techInput.trim()]);
        setFormData({ ...formData, techInput: "" });
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    const visibility = submitter.value as Visibility;

    if (!formData.title || !formData.slug || !formData.oneLine) {
      alert("제목, 슬러그, 한줄 소개는 필수 입력 항목입니다.");
      return;
    }

    if (techs.length === 0) {
      alert("최소 한 개 이상의 스킬을 입력해 주세요.");
      return;
    }

    setIsFormLoading(true);
    try {
      // FormData 생성
      const data = new FormData();
      data.append("title", formData.title);
      data.append("slug", formData.slug);
      data.append("oneLine", formData.oneLine);
      data.append("description", formData.description);
      data.append("highlights", formData.highlights);
      data.append("liveUrl", formData.liveUrl);
      data.append("githubUrl", formData.githubUrl);
      data.append("relatedUrl", formData.relatedUrl);
      data.append("startedAt", formData.startedAt);
      data.append("endedAt", formData.endedAt);
      data.append("visibility", visibility);
      data.append("status", status);

      // 태그 배열, 문자열 처리
      data.append("techs", JSON.stringify(techs));

      // 파일 추가
      if (thumbnail) data.append("thumbnail", thumbnail);
      if (docs) {
        Array.from(docs).forEach((file) => data.append("docs", file));
      }

      await onSubmit(data);
    } finally {
      setIsFormLoading(false);
    }
  };

  useEffect(() => {
    if (initialData?.thumbnail?.url) {
      setPreviewUrl(initialData.thumbnail.url);
    }
  }, [initialData]);

  const isDisabled = isSubmitting || isFormLoading;

  return (
    <form
      onSubmit={handleFormSubmit}
      className="p-8 max-w-2xl mx-auto space-y-12"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">대표 이미지</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6">
            <div className="relative w-40 h-28  border-2 border-dashed border-gray-200 rounded-xl overflow-hidden flex items-center justify-center hover:bg-gray-50 group">
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="none"
                    size="sm"
                    onClick={() => removeThumbnail()}
                    className="!absolute !top-2 !right-2 bg-white !px-0.5 !w-auto z-50 text-gray-400 hover:text-red-500"
                  >
                    <X size={18} />
                  </Button>
                </>
              ) : (
                <Image
                  className="text-gray-400 group-hover:scale-110 transition-transform"
                  size={32}
                />
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
            </div>
            <div className="text-sm text-gray-500">
              <p className="font-medium text-gray-700">
                이미지를 선택하거나 드래그 하세요.
              </p>
              <p>권장 사이즈: 1200 x 630 (px)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">기본 정보</h3>
        <div className="flex flex-col gap-4">
          <FormInput
            type="text"
            value={formData.slug}
            label="프로젝트 경로(slug)"
            placeholder="슬러그를 입력해 주세요."
            required
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <FormInput
            type="text"
            value={formData.title}
            label="제목"
            placeholder="제목을 입력해 주세요."
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <FormInput
            type="text"
            value={formData.oneLine}
            label="한줄 소개"
            placeholder="한줄 소개말을 입력해 주세요."
            required
            onChange={(e) =>
              setFormData({ ...formData, oneLine: e.target.value })
            }
          />
          <div className="flex gap-2">
            <FormInput
              label="시작일"
              type="date"
              placeholder="YYYY-MM-DD"
              value={formData.startedAt}
              onChange={(e) =>
                setFormData({ ...formData, startedAt: e.target.value })
              }
            />

            {/* 종료일 */}
            <FormInput
              label="종료일"
              type="date"
              placeholder="YYYY-MM-DD"
              value={formData.endedAt}
              onChange={(e) =>
                setFormData({ ...formData, endedAt: e.target.value })
              }
            />
          </div>
          <SelectorProjectStatus
            value={status}
            selectName="진행 상태"
            onChange={setStatus}
          />
          <FormTextArea
            label="주요 성과"
            placeholder="주요 성과나 핵심 기능을 적어주세요."
            value={formData.highlights}
            onChange={(e) =>
              setFormData({ ...formData, highlights: e.target.value })
            }
            rows={3}
          />
          <FormTextArea
            label="상세 설명"
            placeholder="프로젝트 전반에 대한 상세한 설명을 입력해 주세요."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={6}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">스킬</h3>
        <div className="flex flex-col gap-4">
          <FormInput
            type="text"
            placeholder="프로젝트 주요 스킬을 입력해 주세요."
            value={formData.techInput}
            disabled={techs.length >= 10 && true}
            onKeyDown={addTag}
            onChange={(e) =>
              setFormData({ ...formData, techInput: e.target.value })
            }
            helper="스킬 태그는 최소 1개, 최대 10개까지 설정할 수 있습니다."
          />
          <div className="flex flex-wrap gap-2">
            {techs.map((tag) => (
              <TagItem
                tagName={tag}
                onDelete={() => setTechs(techs.filter((t) => t !== tag))}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">참고 URL</h3>
        <div className="flex flex-col gap-4">
          <FormInput
            type="url"
            value={formData.liveUrl}
            label="Live Url"
            placeholder="http://을 포함해서, Live 주소(Url)를 입력해 주세요."
            onChange={(e) =>
              setFormData({ ...formData, liveUrl: e.target.value })
            }
          />
          <FormInput
            type="url"
            value={formData.githubUrl}
            label="Github Url"
            placeholder="http://을 포함해서, Github 주소(Url)를 입력해 주세요."
            onChange={(e) =>
              setFormData({ ...formData, githubUrl: e.target.value })
            }
          />
          <FormInput
            type="url"
            value={formData.relatedUrl}
            label="Related Url"
            placeholder="http://을 포함해서, 연관된 문서 주소(Url)를 입력해 주세요."
            onChange={(e) =>
              setFormData({ ...formData, relatedUrl: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">첨부파일</h3>
        {docs.length < 5 ? (
          <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors group">
            <input
              type="file"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleDocsChange}
            />
            <UploadCloud
              className="mx-auto text-gray-400 mb-2 group-hover:scale-110 transition-transform"
              size={32}
            />
            <p className="text-sm text-gray-600">
              파일을 선택하거나 여기로 드래그 하세요.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PDF, ZIP, DOCX (최대 10MB)
            </p>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center text-sm text-gray-500">
            <p>
              최대 개수인 5개의 파일이 모두 첨부되었습니다.
              <br />
              첨부파일 수정을 원하시면 기존 파일을 삭제해 주세요.
            </p>
          </div>
        )}
        {docs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {docs.map((file, idx) => (
              <FileItem
                key={idx}
                fileName={file.name}
                onDelete={() => removeDoc(idx)}
              />
            ))}
          </div>
        )}
        {mode === "EDIT" &&
          initialData?.attachments &&
          initialData.attachments.length > 0 && (
            <div className="flex flex-col gap-2 mb-4">
              <p className="text-sm text-gray-700">기존 첨부파일</p>
              {initialData.attachments.map((item) => (
                <FileItem
                  key={item.file.id}
                  fileName={item.file.fileName}
                  fileUrl={item.file.url}
                  onDelete={() => {
                    /** 삭제 로직 호출 */
                    console.log("삭제 로직 호출");
                  }}
                />
              ))}
            </div>
          )}
      </div>

      <div className="flex gap-2">
        {!(mode === "EDIT" && formData.visibility === "PUBLIC") && (
          <Button
            type="submit"
            variant="line"
            className="!w-[140px]"
            name="action"
            value="DRAFT"
            disabled={isSubmitting}
          >
            임시저장
          </Button>
        )}
        <Button
          type="submit"
          name="action"
          value="PUBLIC"
          disabled={isDisabled}
        >
          {isDisabled ? (
            <span>처리 중...</span>
          ) : mode === "EDIT" ? (
            "수정 완료"
          ) : (
            "등록 완료"
          )}
        </Button>
      </div>
    </form>
  );
}
