import { useParams } from "react-router-dom";
import {
  ArticleItem,
  ContactStatusConfig,
  FileItem,
  formatFullDate,
  LoadingArea,
} from "@shared";
import NotFoundPage from "../NotFoundPage";
import { useQuery } from "@tanstack/react-query";
import { getContactById } from "@/lib/contact";

export default function ContactdkDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getContactById(id!), // id가 있을 때만 실행됨
    enabled: !!id, // id가 없으면 쿼리를 실행하지 않음
  });

  const contact = data?.data;

  if (isLoading) return <LoadingArea />;
  if (isError || !contact) return <NotFoundPage />;

  const statusConfig = ContactStatusConfig[contact.status];

  return (
    <>
      <div className="p-8 max-w-3xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-8 border-t-2 border-gray-900 pt-6">
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="text-2xl font-bold">{contact.title}</h2>
            </div>
            <div className="flex justify-between">
              <dl className="flex gap-1 text-sm text-gray-600">
                <dt className="sr-only">문의 일시</dt>
                <dd className="font-medium">
                  {formatFullDate(contact.createdAt)}
                </dd>
              </dl>
              <dl className="flex gap-1 text-sm text-gray-600">
                <dt className="sr-only">진행 상태</dt>
                <dd className="font-bold flex gap-1 items-center">
                  <span style={{ color: statusConfig.color }}>●</span>
                  {ContactStatusConfig[contact.status].label}
                </dd>
              </dl>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {contact.content && (
              <ArticleItem label="상세 내용">
                <div
                  className="project-detail-content"
                  dangerouslySetInnerHTML={{ __html: contact.content }}
                />
              </ArticleItem>
            )}
            {contact.attachments && contact.attachments.length > 0 && (
              <ArticleItem label="첨부파일">
                <div className="flex flex-col gap-2">
                  {contact.attachments.map((item) => (
                    <FileItem
                      key={item.file.id}
                      fileName={item.file.fileName}
                      fileUrl={item.file.url}
                      isRead={true}
                    />
                  ))}
                </div>
              </ArticleItem>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 rounded-lg bg-gray-100">
          <div>
            <h3 className="text-lg font-bold">고객 정보</h3>
          </div>
          <div className="flex flex-col gap-2">
            <dl className="flex gap-1 text-sm text-gray-600">
              <dt className="w-16">이름</dt>
              <dd className="font-medium">{contact.name}</dd>
            </dl>
            <dl className="flex gap-1 text-sm text-gray-600">
              <dt className="w-16">이메일</dt>
              <dd className="font-bold flex gap-1 items-center">
                {contact.email}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
