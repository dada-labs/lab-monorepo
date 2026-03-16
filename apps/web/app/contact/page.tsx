"use client";

import { useMemo, useState } from "react";
import {
  Button,
  FileItem,
  FormInput,
  FormTextArea,
  validateEmail,
  VALIDATION_MESSAGES,
} from "@shared";
import { createContact } from "@/lib/contacts";
import { UploadCloud, CheckCircle } from "@shared/icons";
import Link from "next/link";

export default function ContactPage() {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    name: "",
    email: "",
  });

  const [docs, setDocs] = useState<File[]>([]);

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

  const isFormValid = useMemo(() => {
    const { email, name, content } = formData;

    const hasRequiredFields =
      email.trim() !== "" && name.trim() !== "" && content.trim() !== "";

    const isEmailValid = validateEmail(email);

    return hasRequiredFields && isEmailValid;
  }, [formData]);

  // 파일 지우기
  const removeDoc = (index: number) => {
    setDocs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsFormLoading(true);
    try {
      // FormData 생성
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("title", formData.title || "제목없음");
      data.append("content", formData.content);

      if (docs) {
        Array.from(docs).forEach((file) => data.append("docs", file));
      }

      const response = await createContact(data);

      if (response.success) {
        setIsSubmitted(true);
      } else {
        alert(response.message || "문의 전송 과정에서 오류가 발생했습니다.");
      }
    } catch (err) {
      alert("전송 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsFormLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-8">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">
          프로젝트 문의가
          <br />
          정상적으로 접수되었습니다 :)
        </h2>
        <p className="text-gray-600 mb-10 leading-relaxed">
          작성해주신 문의 내용은 담당자가 확인 후<br />
          최대 7일 이내에 이메일로 답변드리겠습니다.
          <br />
          답변은 {""}
          <span className="font-semibold text-gray-900">
            {formData.email || "-"}
          </span>
          으로 발송될 예정입니다.
        </p>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="linePrimary">홈으로 이동</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 pb-8 border-b border-gray-300">
        <h2 className="text-2xl font-bold">프로젝트 문의</h2>
        <p className="text-sm text-gray-600">
          개발 관련 프로젝트 문의 및 협업 제안을 남겨주세요.
        </p>
      </div>
      <div className="mt-12">
        <form onSubmit={handleSubmit} className="grid gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">작성자 기본 정보</h2>
            <div className="flex gap-4">
              <FormInput
                type="email"
                value={formData.email}
                label="이메일"
                required
                placeholder="이메일을 입력해주세요."
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={
                  formData.email && !validateEmail(formData.email)
                    ? VALIDATION_MESSAGES.EMAIL.INVALID
                    : undefined
                }
              />
              <FormInput
                type="text"
                value={formData.name}
                label="이름"
                required
                placeholder="이름을 입력해주세요."
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">문의 내용</h2>
            <FormInput
              type="text"
              value={formData.title}
              label="제목"
              placeholder="문의 내용을 한눈에 알 수 있는 제목을 입력해주세요."
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <FormTextArea
              label="내용"
              placeholder="프로젝트 의뢰, 협업 제안 등 상세하게 내용을 작성해주세요."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={8}
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                참고 파일첨부
              </label>
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
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="!w-3xs"
              disabled={isFormLoading || !isFormValid}
            >
              {isFormLoading ? <span>처리 중...</span> : "등록 완료"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
