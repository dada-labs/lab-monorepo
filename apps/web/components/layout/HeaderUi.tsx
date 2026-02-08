"use client";

import { Button, SearchBar } from "@shared";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function LayoutHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleProjectSearch = (keyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log("프로젝트 검색:", keyword);
    if (keyword) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }
    router.push(`/project?${params.toString()}`);
  };

  return (
    <header className=" h-16 bg-white">
      <div className="mx-auto max-w-7xl flex items-center justify-between  px-6">
        <div className="flex items-center justify-between gap-6">
          <Link href={"/"}>
            <Image
              src="/images/logo.svg"
              alt="DadaLab logo"
              width={140}
              height={32}
            />
          </Link>
          <div>
            <ul className="flex gap-1 ">
              <li>
                <Link
                  href={"/"}
                  className="flex h-16 items-center font-bold px-6"
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  href={"/project"}
                  className="flex h-16 items-center font-bold px-6"
                >
                  프로젝트
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2 w-72">
            <SearchBar
              onSearch={handleProjectSearch}
              initialValue={searchParams.get("keyword") || ""}
            />
          </div>
          <Link href={"/contact"}>
            <Button size="md">프로젝트 문의</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
