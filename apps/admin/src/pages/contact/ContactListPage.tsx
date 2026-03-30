import { ContactStatusConfig, LoadingArea, NodataArea } from "@shared";
import { getContactList } from "@/lib/contact";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Paperclip } from "@shared/icons";
export default function ContactListPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["items"],

    queryFn: () => getContactList(),
  });

  const contactList = data?.data?.items || [];
  const totalCount = data?.data?.total || 0;

  const isContactList = contactList && contactList?.length > 0;
  return (
    <>
      <div className="flex justify-between gap-1 pb-4">
        <h2 className="">
          문의 <span className="text-primary font-bold">{totalCount}</span>
        </h2>
      </div>
      <div className={""}>
        <div className="hidden md:flex items-center gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-100 text-sm font-semibold text-gray-600">
          <div className="w-28">상태</div>
          <div className="flex-1">문의 제목</div>
          <div className="w-48">작성자</div>
          <div className="w-36">작성일</div>
        </div>
        {isLoading ? (
          <LoadingArea />
        ) : isContactList ? (
          <div className="divide-y divide-gray-50">
            {contactList.map((contact) => {
              const status =
                ContactStatusConfig[
                  contact.status as keyof typeof ContactStatusConfig
                ] || ContactStatusConfig.UNREAD;

              return (
                <div
                  key={contact.id}
                  className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-4 px-6 py-5 hover:bg-gray-50/80 transition-colors"
                >
                  {/* 문의 상태 */}
                  <div className="w-full md:w-28">
                    <div
                      className="flex items-center gap-1.5 w-fit text-sm px-1 py-0.5 rounded-sm"
                      style={{
                        backgroundColor: status.bg,
                        color: status.color,
                      }}
                    >
                      {status.label}
                    </div>
                  </div>

                  {/* 문의 제목 */}
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    <Link
                      to={`/contact/${contact.id}`}
                      className="block truncate"
                    >
                      <span className="font-semibold text-gray-900">
                        {contact.title}
                      </span>
                    </Link>
                    {contact.attachments.length > 0 && (
                      <Paperclip
                        size={14}
                        className="text-gray-400 flex-shrink-0"
                      />
                    )}
                  </div>

                  {/* 작성자 */}
                  <div className="hidden md:block w-48 text-sm text-gray-600">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium">
                        {contact.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {contact.email}
                      </span>
                    </div>
                  </div>

                  {/* 작성일 */}
                  <div className="w-36 text-sm text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <NodataArea
            content={
              isError
                ? "데이터를 불러오는 중 오류가 발생했습니다."
                : "접수된 문의가 없습니다."
            }
          />
        )}
      </div>
    </>
  );
}
